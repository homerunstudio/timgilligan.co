import { useEffect } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import Button from '../components/Button';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';

const reveal = (delay) => ({
  animation: 'word-reveal 700ms ease-out both',
  animationDelay: `${delay}ms`,
});

export default function Info() {
  useEffect(() => {
    document.documentElement.setAttribute('data-dark', '');
    return () => document.documentElement.removeAttribute('data-dark');
  }, []);

  return (
    <ThemeProvider>
    <div className="min-h-screen flex flex-col bg-bg-primary relative">

      {/* White-to-dark overlay */}
      <div
        className="fixed inset-0 bg-neutral-50 pointer-events-none z-[100]"
        style={{ animation: 'info-overlay-fade 700ms ease-out forwards' }}
      />

      <Nav dark />

      <div className="flex-1 px-2.5 pt-24 pb-16">
        <div className="w-full max-w-container-sm lg:max-w-container-lg mx-auto">
        <div className="max-w-container-sm">

          <p className="type-label text-border-primary" style={reveal(200)}>About Me</p>
          <h1 className="type-display text-text-primary mt-2" style={reveal(350)}>Hi, I'm Tim.</h1>

          <div className="mt-8 flex flex-col gap-6">
            <p className="type-body-xl text-text-primary" style={reveal(550)}>
              I'm a product-focused designer with a foundation in brand and a specialization in systems-driven UI.
            </p>
            <p className="type-body-xl text-text-primary" style={reveal(700)}>
              After leaving Intercom in 2019 as a Senior Brand Designer I went freelance for seven years contracting in Brand and Web Designer roles with companies like Figma, Retool, Apollo, and Rippling.
            </p>
            <p className="type-body-xl text-text-primary" style={reveal(850)}>
              I am interested in building scalable design systems that create a pleasant user experience from initial landing to product onboarding.
            </p>
            <p className="type-body-xl text-text-primary" style={reveal(1000)}>
              Most recently, I have been utilizing AI tools to help build functional applications and expand design systems beyond Figma (ie React + Tailwind). Check out my most recent project{' '}
              <a
                href="https://dirtdossier.timgilligan.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-border-primary hover:opacity-70 transition-opacity"
              >
                here
              </a>.
            </p>
            <p className="type-body-xl text-text-primary" style={reveal(1150)}>
              I am currently searching for new projects and opportunities.
            </p>
          </div>

          <div className="mt-10" style={reveal(1300)}>
            <Button href="mailto:tim@homerun.studio" variant="secondary" className="px-8 py-3">
              Contact me
              <ArrowUpRight size={20} weight="bold" />
            </Button>
          </div>

        </div>
        </div>
      </div>

      <Footer dark />

    </div>
    </ThemeProvider>
  );
}
