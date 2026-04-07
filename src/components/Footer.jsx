import { InstagramLogo } from '@phosphor-icons/react';

export default function Footer({ wide = false, dark = false }) {
  const text    = 'text-text-primary';
  const noAnim  = dark ? { animation: 'none' } : {};

  return (
    <footer className={`w-full flex flex-col items-center px-2.5 ${wide ? 'xl:px-20' : ''}`}>
      <div className={`flex items-center justify-between w-full max-w-container-sm lg:max-w-container-lg ${wide ? 'xl:max-w-none' : ''} mx-auto`}>

        <div className="py-[10px]">
          <span className={`type-body ${text}`} style={noAnim}>ⓒ 2026</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:tim@homerun.studio"
            className={`type-body ${text} hover:opacity-70 transition-opacity`}
            style={noAnim}
          >
            tim@homerun.studio
          </a>
          <span className={`type-body ${text}`} style={noAnim}>•</span>
          <a
            href="https://www.instagram.com/timgilligan/"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative size-7 flex items-center justify-center ${text} hover:opacity-70 transition-opacity`}
            aria-label="Instagram"
            style={noAnim}
          >
            <InstagramLogo size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}
