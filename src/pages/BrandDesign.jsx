import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const IMAGES = [
  { src: '/images/Brand Design/brand-design_01.jpg', alt: 'Brand Design — 01' },
  { src: '/images/Brand Design/brand-design_02.jpg', alt: 'Brand Design — 02' },
  { src: '/images/Brand Design/brand-design_03.jpg', alt: 'Brand Design — 03' },
  { src: '/images/Brand Design/brand-design_04.jpg', alt: 'Brand Design — 04' },
  { src: '/images/Brand Design/brand-design_05.jpg', alt: 'Brand Design — 05' },
  { src: '/images/Brand Design/brand-design_06.jpg', alt: 'Brand Design — 06' },
  { src: '/images/Brand Design/brand-design_07.jpg', alt: 'Brand Design — 07' },
  { src: '/images/Brand Design/brand-design_08.jpg', alt: 'Brand Design — 08' },
  { src: '/images/Brand Design/brand-design_09.jpg', alt: 'Brand Design — 09' },
  { src: '/images/Brand Design/brand-design_10.jpg', alt: 'Brand Design — 10' },
  { src: '/images/Brand Design/brand-design_11.jpg', alt: 'Brand Design — 11' },
  { src: '/images/Brand Design/brand-design_12.jpg', alt: 'Brand Design — 12' },
  { src: '/images/Brand Design/brand-design_13.jpg', alt: 'Brand Design — 13' },
  { src: '/images/Brand Design/brand-design_14.jpg', alt: 'Brand Design — 14' },
];

// Clone first slide at end for seamless looping
const SLIDES = [...IMAGES, IMAGES[0]];


export default function BrandDesign() {
  const [activeImage, setActiveImage] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
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
                  Brand Design
                </h1>
                <p className="type-body text-text-primary mt-4" style={{ animationDelay: '500ms' }}>
                  I was the Lead Designer and a Fintech Startup serving the trucking industry
                  overlapping with Brand and Product. Before I started brand was a hodgepodge of
                  assets, Figma files, workflows with a lack of unity between our marketing site
                  and core product.
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
                        {img.video ? (
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

            </div>

            <div className="hidden lg:flex flex-col gap-6 pt-[64px]">
              {IMAGES.map((img, i) => (
                img.video ? (
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
