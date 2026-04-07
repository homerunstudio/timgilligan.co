import { useState, Children } from 'react';

export default function Button({ href, children, variant = 'primary', className = '' }) {
  const [hovered, setHovered] = useState(false);

  const baseStyles = 'inline-flex items-center gap-4 px-4 py-2 rounded-full type-body';

  const variants = {
    primary: 'bg-bg-dark text-white shadow-sm',
    secondary: 'bg-accent text-accent-text',
  };

  const childArray = Children.toArray(children);
  const icon = childArray[childArray.length - 1];
  const label = childArray.slice(0, -1);

  return (
    <a
      href={href}
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
