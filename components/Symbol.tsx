import { useId } from 'react';

type Props = {
  className?: string;
  /** Étincelle qui pulse doucement (hero). */
  pulse?: boolean;
  title?: string;
  /** Dimensions explicites (utile quand le symbole est imbriqué dans un autre SVG). */
  width?: number;
  height?: number;
};

/** Symbole AX : un A solide traversé par une flèche montante et une étincelle cyan. */
export function Symbol({ className, pulse = false, title, width, height }: Props) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 270 280"
      width={width}
      height={height}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0" stopColor="#0B2A4A" />
          <stop offset="1" stopColor="#1A7896" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#2789AA" />
          <stop offset="1" stopColor="#0B2A4A" />
        </linearGradient>
        <linearGradient id={`${id}a`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0B2A4A" />
          <stop offset="0.5" stopColor="#14607F" />
          <stop offset="1" stopColor="#2A9CC0" />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.22" stopColor="#D4F6FF" />
          <stop offset="0.55" stopColor="#4FD1F0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4FD1F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M14 234 L104 30 L124 30 L106 86 L60 234 Z" fill={`url(#${id}l)`} />
      <path d="M104 30 L124 30 L252 234 L208 234 L106 86 Z" fill={`url(#${id}r)`} />
      <path d="M52 214 L160 126 L172 140 L62 226 Z" fill="#14607F" />
      <path
        d="M51.2 266.2 L208.2 59.3 L191.1 48.8 L256 8 L238.9 85.2 L223.8 73.7 L68.8 279.6 Z"
        fill={`url(#${id}a)`}
      />
      <g className={pulse ? 'spark-pulse' : undefined}>
        <circle cx="165" cy="133" r="34" fill={`url(#${id}g)`} />
        <path
          d="M165 112 L168 130 L186 133 L168 136 L165 154 L162 136 L144 133 L162 130 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
