import { useState, useRef, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const IMAGES = [
  { src: '/images/AtoB/atob-01.jpg', alt: 'AtoB — order card flow' },
  { src: '/images/AtoB/atob-02.jpg', alt: 'AtoB — brand identity' },
  { src: '/images/AtoB/atob-03.jpg', alt: 'AtoB — design system' },
  { src: '/images/AtoB/color-switcher.mp4', alt: 'AtoB — color switcher', video: true },
  { src: '/images/AtoB/atob-05.jpg', alt: 'AtoB — product experience' },
  { src: '/images/AtoB/atob-06.jpg', alt: 'AtoB — product experience' },
  { src: '/images/AtoB/atob-07.jpg', alt: 'AtoB — product experience' },
  { src: '/images/AtoB/email.mp4', alt: 'AtoB — email animation', video: true, emailVideo: true },
];

// Clone first slide at end for seamless looping
const SLIDES = [...IMAGES, IMAGES[0]];

const ACCORDIONS = [
  {
    title: 'Solutions',
    content:
      'I built and scaled a design system that was congruent across Figma and Webflow and defined the rules for our visual system. I worked hand-in-hand with product to ensure that our systems aligned and there was a seamless visual experience from initial website landing through product onboarding.',
    defaultOpen: false,
  },
  {
    title: 'Impact',
    content:
      'We were able to scale the system across multi-channels including web and product which meant there was more cohesion between brand and product than ever before. Having a more efficient design system also allowed us to utilize self-serve templates and launch marketing partnerships at a much faster pace, cutting the time to launch from several weeks to several hours.',
    defaultOpen: false,
  },
];

function Accordion({ title, content, open, onToggle }) {
  const [slideActive, setSlideActive] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (!open) setSlideActive(false); // opening — clear slide so it doesn't snap back
          onToggle();
        }}
        onMouseEnter={() => setSlideActive(!open)}
        onMouseLeave={() => setSlideActive(false)}
        className="flex items-center justify-between w-full py-[1px] cursor-pointer"
      >
        <span
          className="type-body font-medium text-text-primary"
          style={{
            transform: slideActive ? 'translateX(12px)' : 'translateX(0)',
            transition: 'transform 500ms ease-in-out',
          }}
        >
          {title}
        </span>
        <span className="bg-neutral-100 rounded-sm w-8 h-8 flex items-center justify-center shrink-0">
          <Plus
            size={16}
            weight="bold"
            style={{
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 500ms ease-in-out',
            }}
          />
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '200px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 500ms ease-in-out, opacity 500ms ease-in-out',
        }}
      >
        <p
          className="type-body-sm text-neutral-600 mt-3 pr-2 pb-1"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'transform 500ms ease-in-out',
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}

export default function AtoB() {
  const [activeImage, setActiveImage] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const touchStartX = useRef(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveImage(i => Math.min(i + 1, IMAGES.length));
    }, 7000);
  };

  // Auto-advance on scroll into view
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          intervalRef.current = setInterval(() => {
            setActiveImage(i => Math.min(i + 1, IMAGES.length));
          }, 7000);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(carousel);
    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, []);

  // When the clone (last slide) finishes animating, silently snap back to real first slide
  useEffect(() => {
    if (activeImage !== IMAGES.length) return;
    const timer = setTimeout(() => {
      setNoTransition(true);
      setActiveImage(0);
    }, 750);
    return () => clearTimeout(timer);
  }, [activeImage]);

  // Re-enable transition after the silent snap
  useEffect(() => {
    if (!noTransition) return;
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoTransition(false))
    );
    return () => cancelAnimationFrame(frame);
  }, [noTransition]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setActiveImage((i) => Math.min(i + 1, IMAGES.length));
      else setActiveImage((i) => Math.max(i - 1, 0));
      resetInterval();
    }
    touchStartX.current = null;
  };

  const dragStartX = useRef(null);
  const dragMoved = useRef(false);

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current = false;
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) dragMoved.current = true;
  };

  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (dragMoved.current && Math.abs(dx) > 40) {
      if (dx < 0) setActiveImage((i) => Math.min(i + 1, IMAGES.length));
      else setActiveImage((i) => Math.max(i - 1, 0));
      resetInterval();
    } else if (!dragMoved.current) {
      setActiveImage((i) => Math.min(i + 1, IMAGES.length));
      resetInterval();
    }
    dragStartX.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-tertiary">

      {/* Main content — starts at top, no nav offset */}
      <div className="flex-1 w-full flex flex-col items-center px-2.5 xl:px-20 pb-16">
        <div className="w-full max-w-container-sm lg:max-w-container-lg xl:max-w-none">

          {/* Nav row — sticky, aligned with content container */}
          <Nav variant="project" />

          {/* Two-column layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-[328px_680px] xl:grid-cols-[357px_1fr] lg:gap-x-6 xl:gap-x-12">

            {/* Left: project info — sticky below nav row */}
            <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:flex lg:flex-col lg:py-6">

              {/* Header */}
              <div className="pt-6 lg:pt-[104px]">
                <p className="type-label text-neutral-400" style={{ animationDelay: '200ms' }}>
                  Case Study
                </p>
                <h1 className="type-page-heading text-text-primary" style={{ animationDelay: '350ms' }}>
                  AtoB
                </h1>
                <p className="type-body text-text-primary mt-4" style={{ animationDelay: '500ms' }}>
                  I was the Lead Designer and a Fintech Startup serving the trucking industry
                  overlapping with Brand and Product. Before I started brand was a hodgepodge of
                  assets, Figma files, workflows with a lack of unity between our marketing site
                  and core product.
                </p>
              </div>

              {/* Mobile carousel (between header and accordions on mobile) */}
              <div className="lg:hidden mt-6">
                <div
                  ref={carouselRef}
                  className="overflow-hidden w-full rounded select-none"
                  style={{ cursor: dragMoved.current ? 'grabbing' : 'grab' }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => { dragStartX.current = null; }}
                >
                  <div
                    className="flex gap-2"
                    style={{ transform: `translateX(calc(-${activeImage * 100}% - ${activeImage * 8}px))`, transition: noTransition ? 'none' : 'transform 750ms ease-in-out' }}
                  >
                    {SLIDES.map((img, i) => (
                      <div key={i} className="min-w-full">
                        {img.emailVideo ? (
                          <div style={{ backgroundColor: '#010002', aspectRatio: '2400/1977', padding: '32px 40px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' }}>
                            <video src={img.src} autoPlay loop muted playsInline style={{ width: '55%', height: 'auto', display: 'block' }} />
                          </div>
                        ) : img.video ? (
                          <div style={{ backgroundColor: '#F9F9F9', aspectRatio: '2400/1977', padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
                            <video src={img.src} autoPlay loop muted playsInline className="w-full h-auto block" />
                          </div>
                        ) : (
                          <img src={img.src} alt={img.alt} className="w-full h-auto block" draggable={false} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 mt-3 items-center justify-center">
                  {IMAGES.map((_, i) => {
                    const currentIndex = activeImage % IMAGES.length;
                    const isActive = i === currentIndex;
                    const isPast = i < currentIndex;
                    return (
                      <div
                        key={i}
                        onClick={() => { setActiveImage(i); resetInterval(); }}
                        className={`relative overflow-hidden rounded-full flex-shrink-0 cursor-pointer ${isPast ? 'bg-primary-500' : 'bg-neutral-200'}`}
                        style={{
                          width: isActive ? '32px' : '6px',
                          height: '6px',
                          transition: 'width 300ms ease-in-out',
                        }}
                      >
                        {isActive && (
                          <div
                            key={activeImage}
                            className="absolute inset-0 bg-primary-500 origin-left"
                            style={{ animation: 'story-fill 7s linear forwards' }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accordions — 64px below intro paragraph */}
              <div className="page-fade mt-6 lg:mt-16 flex flex-col">
                <Accordion {...ACCORDIONS[0]} open={openAccordion === 0} onToggle={() => setOpenAccordion(openAccordion === 0 ? null : 0)} />
                <div className="border-t border-neutral-200 my-4" />
                <Accordion {...ACCORDIONS[1]} open={openAccordion === 1} onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)} />
              </div>
            </div>

            {/* Right: stacked images, start at top so they show behind transparent logo row */}
            <div className="hidden lg:flex flex-col gap-6 pt-[64px]">
              {IMAGES.map((img, i) => (
                img.emailVideo ? (
                  <div key={i} className="w-full rounded-xl overflow-hidden" style={{ backgroundColor: '#010002', aspectRatio: '2400/1977', padding: '128px 120px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <video src={img.src} autoPlay loop muted playsInline style={{ width: '50%', height: 'auto', display: 'block', animationDelay: `${i * 150}ms` }} />
                  </div>
                ) : img.video ? (
                  <div key={i} className="w-full rounded-xl overflow-hidden" style={{ backgroundColor: '#F9F9F9', padding: '64px 120px' }}>
                    <video src={img.src} autoPlay loop muted playsInline className="w-full h-auto block" style={{ animationDelay: `${i * 150}ms` }} />
                  </div>
                ) : (
                  <img key={i} src={img.src} alt={img.alt} className="w-full h-auto block rounded-xl" style={{ animationDelay: `${i * 150}ms` }} />
                )
              ))}
            </div>

          </div>
        </div>
      </div>

      <Footer wide />
    </div>
  );
}
