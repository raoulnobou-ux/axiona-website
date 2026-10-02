/** Illustrations SVG générées dans le code, dans la palette AXIONA. Purement décoratives. */

export function NodeNetwork({ className = '' }: { className?: string }) {
  const nodes = [
    [40, 120], [95, 60], [110, 150], [170, 100], [200, 30], [230, 160], [280, 80], [320, 140],
  ] as const;
  const links = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [5, 7], [1, 4],
  ] as const;
  return (
    <svg viewBox="0 0 360 190" className={className} aria-hidden="true" focusable="false" fill="none">
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#14607F"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 7 : 4.5} fill={i === 3 ? '#4FD1F0' : '#fff'} stroke="#14607F" strokeWidth="1.5" />
      ))}
      <circle cx="170" cy="100" r="16" fill="#4FD1F0" fillOpacity="0.18" />
    </svg>
  );
}

export function FlowLines({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 190" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M20 150 C 110 150, 120 60, 200 60 S 300 40, 340 24" stroke="#14607F" strokeOpacity="0.35" strokeWidth="1.4" />
      <path d="M20 170 C 120 170, 150 100, 230 100 S 310 80, 340 70" stroke="#14607F" strokeOpacity="0.2" strokeWidth="1.2" />
      <path
        d="M20 130 C 100 130, 110 30, 190 30 S 290 20, 340 6"
        stroke="#4FD1F0"
        strokeWidth="1.6"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />
      {[
        [20, 150],
        [200, 60],
        [340, 24],
      ].map(([x, y]) => (
        <rect key={x} x={x - 9} y={y - 9} width="18" height="18" rx="5" fill="#fff" stroke="#14607F" strokeWidth="1.5" />
      ))}
      <circle cx="200" cy="60" r="3.2" fill="#4FD1F0" />
    </svg>
  );
}

/** Fines lignes de lumière montant vers le haut-droite, pour les fonds. */
export function LightLines({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false" fill="none">
      <defs>
        <linearGradient id="ll" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4FD1F0" stopOpacity="0" />
          <stop offset="0.7" stopColor="#4FD1F0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M-20 380 C 260 360, 480 250, 820 40" stroke="url(#ll)" strokeWidth="1.2" />
      <path d="M-20 400 C 300 380, 520 280, 820 90" stroke="url(#ll)" strokeWidth="0.8" />
      <path d="M-20 350 C 240 330, 460 210, 820 -10" stroke="url(#ll)" strokeWidth="0.8" />
    </svg>
  );
}
