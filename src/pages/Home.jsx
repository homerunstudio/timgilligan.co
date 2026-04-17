import { useState, useRef, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';
import {
  Rainbow,
  PaintBucket,
  PaintBrushBroad,
  Laptop,
  Shapes,
  CodeBlock,
  Browsers,
  BoundingBox,
  PenNib,
  ArrowDown,
  ArrowUpRight,
} from '@phosphor-icons/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

// ─── Button ──────────────────────────────────────────────────────────────────

function Button({ href, onClick, children, variant = 'primary', className = '' }) {
  const [hovered, setHovered] = useState(false);

  const baseStyles = 'inline-flex items-center gap-4 px-4 py-2 rounded-full type-body';
  const variants = {
    primary: 'bg-bg-dark text-white shadow-sm',
    secondary: 'bg-primary-500 text-neutral-950',
  };

  const childArray = Children.toArray(children);
  const icon = childArray[childArray.length - 1];
  const label = childArray.slice(0, -1);

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
        transition: 'transform 500ms ease-in-out',
      }}
    >
      {label}
      <span style={{ display: 'inline-flex' }}>{icon}</span>
    </a>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

function Tag({ icon: Icon, label, variant = 'default' }) {
  const variants = {
    highlight: 'bg-primary-100',
    default: 'bg-bg-secondary',
  };
  const textVariants = {
    highlight: 'type-tag text-primary-700',
    default: 'type-body-sm text-text-primary',
  };

  return (
    <span className={`${variants[variant]} inline-flex items-center gap-2 px-2 py-1 rounded-full shrink-0`}>
      {Icon && <Icon size={16} />}
      <span className={textVariants[variant]}>{label}</span>
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const { themeIndex, cycleColorTheme, resetTheme, showTooltip } = useTheme();
  const colorActive = themeIndex >= 0;

  return (
    <div className="w-full flex flex-col items-center px-2.5">
      <div className="flex items-center justify-between w-full max-w-container-sm lg:max-w-container-lg xl:max-w-[1920px] pt-4 lg:pt-6">

        <div className="flex items-center gap-3">
          <Logo />

          <div className="bg-bg-secondary border border-border-primary relative flex gap-0.5 h-[34px] items-center px-1 rounded-full w-[70px]">
            <div
              className="absolute h-[26px] w-[30px] rounded-full bg-control-active shadow-sm pointer-events-none"
              style={{
                left: 4,
                transform: colorActive ? 'translateX(32px)' : 'translateX(0)',
                transition: 'transform 300ms ease-in-out, background-color 400ms ease',
              }}
            />
            <button
              onClick={resetTheme}
              className="h-[26px] rounded-full w-[30px] flex items-center justify-center cursor-pointer relative z-10 hover:opacity-70 transition-opacity"
            >
              <Rainbow size={16} />
            </button>
            <button
              onClick={cycleColorTheme}
              className="flex-1 h-[26px] rounded-full flex items-center justify-center cursor-pointer relative z-10 hover:opacity-70 transition-opacity"
            >
              <PaintBucket size={16} />
            </button>
          </div>

          <div
            className={`flex items-center transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div style={{
              width: 0, height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '7px solid var(--color-bg-dark)',
            }} />
            <div className="bg-bg-dark text-white type-tooltip px-3 py-2 rounded-sm whitespace-nowrap">
              Keep pressing me
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href="/info"
            className="type-body text-text-primary hover:opacity-70 transition-opacity"
          >
            about me
          </a>
          <span className="type-body text-text-primary">•</span>
          <a
            href="mailto:tim@homerun.studio"
            className="type-body text-text-primary hover:opacity-70 transition-opacity"
          >
            contact
          </a>
        </div>

      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function scrollTo(targetId, duration = 500) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const scrollMargin = parseInt(getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY - scrollMargin;
  const startTime = performance.now();
  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const animate = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + (end - start) * ease(progress));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function Hero() {
  const { themeIndex } = useTheme();
  const colorMode = themeIndex >= 0;

  useEffect(() => {
    const init = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.init();
        return true;
      }
      return false;
    };

    if (!init()) {
      const interval = setInterval(() => {
        if (init()) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-full transition-[padding] duration-500 ease-in-out xl:px-20">

      {/* Nav outside the card — xl+ only */}
      <div className="hidden xl:block">
        <Nav />
      </div>

      <section className="relative flex flex-col gap-12 lg:gap-30 w-full items-center h-[100dvh] lg:h-[700px] overflow-hidden lg:pb-[200px] transition-[border-radius,margin-top] duration-500 ease-in-out xl:rounded-xl xl:mt-6 xl:pt-44 xl:max-w-[1920px] xl:mx-auto">

        <div className={`absolute inset-0 -z-10 transition-opacity duration-500 ${colorMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div data-us-project="OYl2BFBa21s4JauYFvIE" style={{ width: '100%', height: '100%' }}></div>
        </div>

        {/* Nav inside the card — below xl only */}
        <div className="xl:hidden w-full">
          <Nav />
        </div>

        <div className="flex-1 lg:flex-none w-full flex flex-col items-start justify-center lg:justify-start px-3 xl:px-[152px] pb-12 lg:pb-0">
          <div className="w-full max-w-container-sm lg:max-w-container-lg xl:max-w-none mx-auto flex flex-col gap-8 xl:items-center">
            <h1 className="type-display text-[40px] lg:text-4xl lg:leading-[72px] text-text-primary xl:text-center xl:max-w-[1136px]">
              tim gilligan is a web and product designer located in california.
            </h1>
            <div>
              <Button href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className="px-8 py-3">
                View projects
                <ArrowDown size={16} weight="bold" />
              </Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: 'AtoB',
    href: '/projects/atob',
    image: '/images/atob-mosaic.jpg',
    caseStudy: true,
    tags: [
      { icon: PaintBrushBroad, label: 'Brand' },
      { icon: Laptop,          label: 'Product' },
      { icon: Shapes,          label: 'Design Systems' },
    ],
  },
  {
    title: 'Alchemy',
    href: '/projects/alchemy',
    image: '/images/alchemy-mosaic.jpg',
    caseStudy: true,
    tags: [
      { icon: PaintBrushBroad, label: 'Brand' },
      { icon: Browsers,        label: 'Web Design' },
      { icon: Shapes,          label: 'Design Systems' },
    ],
  },
  {
    title: 'Web Design',
    href: '/projects/web-design',
    image: '/images/web-design.jpg',
    video: '/images/main-compressed.mp4',
    caseStudy: false,
    tags: [
      { icon: Browsers,   label: 'Web Design' },
      { icon: Shapes,     label: 'Design Systems' },
      { icon: CodeBlock,  label: 'Web Development' },
    ],
  },
  {
    title: 'Brand Design',
    href: '/projects/brand-design',
    image: '/images/brand-design.jpg',
    caseStudy: false,
    tags: [
      { icon: BoundingBox, label: 'Brand Design' },
      { icon: PenNib,      label: 'Illustration' },
    ],
  },
];

function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('right');
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const hasNavigated = useRef(false);
  const touchStartX = useRef(null);
  const swipedRef = useRef(false);
  const project = PROJECTS[current];

  const prev = () => {
    hasNavigated.current = true;
    setDirection('left');
    setCurrent(i => (i - 1 + PROJECTS.length) % PROJECTS.length);
  };
  const next = () => {
    hasNavigated.current = true;
    setDirection('right');
    setCurrent(i => (i + 1) % PROJECTS.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    swipedRef.current = false;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      swipedRef.current = true;
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="w-full flex flex-col items-center px-2.5 xl:px-20 scroll-mt-8 lg:scroll-mt-16">
      <div className="flex flex-col gap-4 items-end w-full max-w-container-sm lg:max-w-container-lg xl:max-w-[1920px] mx-auto">

        {/* Header: title + tags */}
        <div className="border-b border-border-primary pb-4 w-full">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
            <span className="type-section-title text-text-primary">
              {project.title}
            </span>
            <div className="flex items-center gap-3 flex-nowrap overflow-x-auto scrollbar-hide lg:flex-wrap lg:justify-end">
              {project.caseStudy && (
                <span className="bg-primary-100 inline-flex items-center justify-center pl-3 py-1 rounded-full shrink-0" style={{ paddingRight: 'calc(0.75rem + 0.5px)' }}>
                  <span className="type-tag text-primary-700">Case Study</span>
                </span>
              )}
              {project.tags.map((tag, i) => (
                <Tag key={i} icon={tag.icon} label={tag.label} />
              ))}
            </div>
          </div>
        </div>

        {/* Project media */}
        <Link
          key={current}
          to={project.href}
          className="w-full aspect-video overflow-hidden block relative"
          style={hasNavigated.current ? {
            animation: `slide-in-${direction} 750ms ease-in-out forwards`,
          } : undefined}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => { if (swipedRef.current) e.preventDefault(); }}
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
              style={{ backgroundColor: '#000000' }}
            />
          ) : (
            <img
              src={project.image}
              alt={`${project.title} — project overview`}
              className="w-full h-full object-cover"
            />
          )}
        </Link>

        {/* Navigation arrows */}
        <div className="flex items-center gap-1">
          <span
            className={`font-display text-2xl tracking-[-1px] leading-[28px] select-none cursor-pointer ${leftHovered ? 'text-primary-700' : 'text-primary-500'}`}
            onMouseEnter={() => setLeftHovered(true)}
            onMouseLeave={() => setLeftHovered(false)}
            onClick={prev}
            style={{
              display: 'inline-block',
              transform: leftHovered ? 'translateX(-2px) scaleX(-1)' : 'scaleX(-1)',
              transition: 'transform 250ms ease-in-out',
            }}
          >→</span>
          <span
            className={`font-display text-2xl tracking-[-1px] leading-[28px] select-none cursor-pointer ${rightHovered ? 'text-primary-700' : 'text-primary-500'}`}
            onMouseEnter={() => setRightHovered(true)}
            onMouseLeave={() => setRightHovered(false)}
            onClick={next}
            style={{
              display: 'inline-block',
              transform: rightHovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 250ms ease-in-out',
            }}
          >→</span>
        </div>

      </div>
    </section>
  );
}

// ─── Details ──────────────────────────────────────────────────────────────────

function Details() {
  const { themeIndex } = useTheme();
  return (
    <section className="w-full flex flex-col items-center px-2.5 xl:px-20 relative">
      <div className="w-full max-w-container-sm lg:max-w-container-lg xl:max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:gap-6 items-start xl:justify-center">

        <div className="flex items-center pt-6 lg:pt-6 lg:w-[152px] shrink-0">
          <span className="type-body text-text-primary">details</span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-1 xl:flex-none xl:max-w-[1136px] mt-6 lg:mt-0">
          <p className="type-display text-[40px] lg:text-4xl lg:leading-[72px] text-text-primary">
            I like the sweet spot between brand and product, focusing on scalable design systems.&nbsp;
          </p>
          <p className="type-display text-[40px] lg:text-4xl lg:leading-[72px] text-text-primary">
            <span className={themeIndex >= 0 ? 'text-text-primary' : 'text-primary-700'}>I'm currently taking on new projects</span> and/or looking for my next full-time gig.
          </p>
          <div>
            <Button href="/info" className="px-8 py-3">
              More about me
              <ArrowUpRight size={16} weight="bold" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <ThemeProvider>
      <div id="app" className="flex flex-col items-center gap-16 lg:gap-30">
        <Hero />
        <Projects />
        <Details />
        <Footer wide />
      </div>
    </ThemeProvider>
  );
}
