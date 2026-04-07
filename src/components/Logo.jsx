export default function Logo({ className = '' }) {
  return (
    <div
      className={`nav-logo relative flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: 'var(--logo-square)',
      }}
    >
      {/* Circle */}
      <div
        style={{
          position: 'absolute',
          width: 26,
          height: 26,
          borderRadius: '50%',
          backgroundColor: 'var(--logo-circle)',
          filter: 'blur(2px)',
          top: 3,
          left: 3,
        }}
      />
      {/* Diamond */}
      <div
        style={{
          position: 'absolute',
          width: 12,
          height: 12,
          backgroundColor: 'var(--logo-diamond)',
          filter: 'blur(4px)',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          top: '50%',
          left: '50%',
        }}
      />
    </div>
  );
}
