import { Rainbow, PaintBucket } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

// ─── Home / About variant (requires ThemeProvider in tree) ───────────────────

function HomeAboutNav({ dark }) {
  const { themeIndex, cycleColorTheme, resetTheme, showTooltip } = useTheme();
  const colorActive = themeIndex >= 0;

  const text        = 'text-text-primary';
  const toggleBg        = 'bg-bg-secondary border-border-primary';
  const iconDefault     = dark ? 'text-text-primary' : '';
  const tipBg           = dark ? 'bg-bg-secondary'   : 'bg-bg-dark';
  const tipText         = dark ? 'text-text-primary'  : 'text-white';
  const tipArrow        = dark ? 'var(--color-bg-secondary)' : 'var(--color-bg-dark)';

  const content = (
    <>
      <div className="flex items-center gap-3">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>

        <div className={`${toggleBg} border relative flex gap-0.5 h-[34px] items-center px-1 rounded-full w-[70px]`}>
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
            <Rainbow size={16} className={!colorActive ? 'text-text-on-active' : iconDefault} />
          </button>
          <button
            onClick={cycleColorTheme}
            className="flex-1 h-[26px] rounded-full flex items-center justify-center cursor-pointer relative z-10 hover:opacity-70 transition-opacity"
          >
            <PaintBucket size={16} className={colorActive ? 'text-text-on-active' : iconDefault} />
          </button>
        </div>

        <div className={`flex items-center transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div style={{
            width: 0, height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: `7px solid ${tipArrow}`,
          }} />
          <div className={`${tipBg} ${tipText} type-tooltip px-3 py-2 rounded-sm whitespace-nowrap`}>
            Keep pressing me
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <a href={dark ? '/#projects' : '/info'} className={`type-body ${text} hover:opacity-70 transition-opacity`}>{dark ? 'projects' : 'about me'}</a>
        <span className={`type-body ${text}`}>•</span>
        <a href="mailto:tim@homerun.studio" className={`type-body ${text} hover:opacity-70 transition-opacity`}>contact</a>
      </div>
    </>
  );

  if (dark) {
    return (
      <div
        className="w-full flex items-center px-2.5 sticky top-0 z-10 bg-bg-primary"
        style={{ animation: 'info-nav-slide 400ms ease-out both', animationDelay: '150ms' }}
      >
        <div className="flex items-center justify-between w-full max-w-container-sm lg:max-w-container-lg mx-auto h-14">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-2.5">
      <div className="flex items-center justify-between w-full max-w-container-sm lg:max-w-container-lg pt-4 lg:pt-6">
        {content}
      </div>
    </div>
  );
}

// ─── Project variant ──────────────────────────────────────────────────────────

function ProjectNav() {
  return (
    <div
      className="sticky top-0 z-10 bg-bg-tertiary flex items-center justify-between h-14"
      style={{ animation: 'info-nav-slide 400ms ease-out both' }}
    >
      <Link to="/" aria-label="Home">
        <Logo />
      </Link>
      <Link
        to="/info"
        className="type-body text-text-primary hover:opacity-70 transition-opacity"
        style={{ animation: 'none' }}
      >
        info
      </Link>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Nav({ variant = 'home', dark = false }) {
  if (variant === 'project') return <ProjectNav />;
  return <HomeAboutNav dark={dark} />;
}
