export default function DoctorIllustration() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="h-[320px] w-[320px] md:h-[360px] md:w-[360px]"
      role="img"
      aria-label="Doctor illustration"
    >
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf96" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* background circle */}
      <circle cx="320" cy="150" r="140" fill="url(#bg1)" opacity="0.18" />

      {/* head */}
      <circle cx="310" cy="150" r="72" fill="url(#skin)" />

      {/* hair */}
      <path
        d="M250 155c10-70 60-92 120-68 28 11 38 34 36 66-10-12-32-16-48-10-18 7-24 24-42 24-21 0-27-18-40-12-9 4-18 12-26 0z"
        fill="#111827"
      />

      {/* stethoscope */}
      <g stroke="#0f172a" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M355 225c0 40-35 55-35 55" />
        <path d="M270 280c0-20 20-35 35-35 15 0 35 15 35 35" opacity="0.7" />
        <circle cx="235" cy="312" r="26" fill="#ffffff" stroke="#0f172a" />
      </g>

      {/* coat */}
      <path
        d="M170 470c20-120 80-150 120-150s100 30 120 150H170z"
        fill="#f8fafc"
      />
      <path
        d="M255 320c10 18 25 28 45 0 20 20 42 62 50 150H205c8-88 30-130 50-150z"
        fill="#e5e7eb"
        opacity="0.9"
      />

      {/* badge */}
      <rect x="300" y="355" width="60" height="26" rx="6" fill="#2563eb" />
      <text
        x="330"
        y="374"
        textAnchor="middle"
        fontSize="14"
        fill="#ffffff"
        fontFamily="Arial, sans-serif"
      >
        MD
      </text>
    </svg>
  );
}

