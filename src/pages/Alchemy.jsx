import { useState, useRef, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const PRODUCT_ITEMS = [
  { icon: '/images/Alchemy/product-icons/amplify.svg',      name: 'Amplify',       description: 'Magnify your product launch' },
  { icon: '/images/Alchemy/product-icons/supernode.svg',    name: 'Supernode',     description: 'Supercharged Ethereum API' },
  { icon: '/images/Alchemy/product-icons/nft-api.svg',      name: 'NFT API',       description: 'Build your NFT app with ease' },
  { icon: '/images/Alchemy/product-icons/sdk.svg',          name: 'SDK',           description: 'Plug Alchemy into your app' },
  { icon: '/images/Alchemy/product-icons/notify.svg',       name: 'Notify',        description: 'Add notifications to your app' },
  { icon: '/images/Alchemy/product-icons/enhanced-api.svg', name: 'Enhanced APIs', description: 'New functionality for your app' },
  { icon: '/images/Alchemy/product-icons/monitor.svg',      name: 'Monitor',       description: 'Crucial dashboards and alerts' },
  { icon: '/images/Alchemy/product-icons/build.svg',        name: 'Build',         description: 'Tools for prototyping & debugging' },
];

const IMAGES = [
  { src: '/images/Alchemy/alchemy_01.jpg', alt: 'Alchemy — 01' },
  { src: '/images/Alchemy/alchemy_02.jpg', alt: 'Alchemy — 02' },
  { src: '/images/Alchemy/alchemy_03.jpg', alt: 'Alchemy — 03' },
  { src: '/images/Alchemy/alchemy_04.jpg', alt: 'Alchemy — 04' },
  { src: '/images/Alchemy/alchemy_05.jpg', alt: 'Alchemy — 05' },
  { src: '/images/Alchemy/alchemy_06.jpg', alt: 'Alchemy — 06' },
  { src: '/images/Alchemy/alchemy_07.jpg', alt: 'Alchemy — 07' },
  { src: '/images/Alchemy/alchemy_08.jpg', alt: 'Alchemy — 08' },
  { src: '/images/Alchemy/alchemy_09.jpg', alt: 'Alchemy — 09' },
  { productIcons: true },
];

// Clone first slide at end for seamless looping
const SLIDES = [...IMAGES, IMAGES[0]];

const ACCORDIONS = [
  {
    title: 'Solutions',
    content:
      'I designed and implemented a tokenized design system to create structure with spacing, layout,  and interaction patterns. I also created and extended a component library of icons, illustrations and color themes built for reuse, with clearly defined variants and states. Design tokens mapped directly to development which reduced ambiguity in handoff.',
    defaultOpen: false,
  },
  {
    title: 'Impact',
    content:
      'This sped up iteration, improved consistency, and allowed us to ship faster and scale the website. It established a foundation where marketing and product experiences could feel cohesive, rather than disconnected, and greatly improved collaboration with developers.',
    defaultOpen: false,
  },
];

function Accordion({ title, content, open, onToggle }) {
  const [slideActive, setSlideActive] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (!open) setSlideActive(false);
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

export default function Alchemy() {
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

  useEffect(() => {
    if (activeImage !== IMAGES.length) return;
    const timer = setTimeout(() => {
      setNoTransition(true);
      setActiveImage(0);
    }, 750);
    return () => clearTimeout(timer);
  }, [activeImage]);

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

      <div className="flex-1 w-full flex flex-col items-center px-2.5 xl:px-20 pb-16">
        <div className="w-full max-w-container-sm lg:max-w-container-lg xl:max-w-none">

          <Nav variant="project" />

          <div className="flex flex-col lg:grid lg:grid-cols-[328px_680px] xl:grid-cols-[357px_1fr] lg:gap-x-6 xl:gap-x-12">

            <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:flex lg:flex-col lg:py-6">

              <div className="pt-6 lg:pt-[104px]">
                <p className="type-label text-neutral-400" style={{ animationDelay: '200ms' }}>
                  Case Study
                </p>
                <h1 className="type-page-heading text-text-primary" style={{ animationDelay: '350ms' }}>
                  Alchemy
                </h1>
                <p className="type-body text-text-primary mt-4" style={{ animationDelay: '500ms' }}>
                  When I joined Alchemy I inherited a lightweight brand system that needed to scale across a marketing site of 150+ pages. The existing system defined core visual elements like color, typography, and gradients, but lacked the structural foundation needed to support rapid iteration and consistency at scale. I reframed the problem as a systems challenge to create a flexible, reusable UI system that could support both marketing and product needs while staying aligned with engineering.
                </p>
              </div>

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
                        {img.productIcons ? (
                          <div className="page-img w-full rounded overflow-hidden" style={{ aspectRatio: '2400/1977', backgroundColor: '#E7ECFC', padding: '3em', containerType: 'inline-size', fontSize: '2.4cqw' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em', animation: 'marquee-up 24s linear infinite' }}>
                              {[0, 1].map(copy => (
                                <div key={copy} style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
                                  {PRODUCT_ITEMS.map((item, j) => (
                                    <div key={j} className="shadow" style={{ display: 'flex', alignItems: 'center', gap: '1em', backgroundColor: 'white', borderRadius: '999px', padding: '1em' }}>
                                      <img src={item.icon} alt={item.name} style={{ width: '3em', height: '3em', flexShrink: 0, animation: 'none' }} />
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#0D0D0D', fontSize: '1.25em', lineHeight: 1.2 }}>{item.name}</p>
                                        <p style={{ fontFamily: 'sans-serif', fontWeight: 400, color: '#999999', fontSize: '.875em', lineHeight: 1.3 }}>{item.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : img.video ? (
                          <div style={{ backgroundColor: '#F9F9F9', aspectRatio: '2400/1977', padding: '64px 120px', display: 'flex', alignItems: 'center' }}>
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

              <div className="page-fade mt-6 lg:mt-16 flex flex-col">
                <Accordion {...ACCORDIONS[0]} open={openAccordion === 0} onToggle={() => setOpenAccordion(openAccordion === 0 ? null : 0)} />
                <div className="border-t border-neutral-200 my-4" />
                <Accordion {...ACCORDIONS[1]} open={openAccordion === 1} onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)} />
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-6 pt-[64px]">
              {IMAGES.map((img, i) => (
                img.productIcons ? (
                  <div key={i} className="page-img w-full rounded-xl overflow-hidden" style={{ aspectRatio: '2400/1977', backgroundColor: '#E7ECFC', padding: '1em', containerType: 'inline-size', fontSize: '2.4cqw', animationDelay: `${i * 150}ms` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em', animation: 'marquee-up 24s linear infinite' }}>
                      {[0, 1].map(copy => (
                        <div key={copy} style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
                          {PRODUCT_ITEMS.map((item, j) => (
                            <div key={j} className="shadow" style={{ display: 'flex', alignItems: 'center', gap: '1em', backgroundColor: 'white', borderRadius: '999px', padding: '1em' }}>
                              <img src={item.icon} alt={item.name} style={{ width: '3em', height: '3em', flexShrink: 0, animation: 'none' }} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#0D0D0D', fontSize: '1.25em', lineHeight: 1.2 }}>{item.name}</p>
                                <p style={{ fontFamily: 'sans-serif', fontWeight: 400, color: '#999999', fontSize: '.875em', lineHeight: 1.3 }}>{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
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
