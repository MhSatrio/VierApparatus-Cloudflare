const paths: Record<string, string> = {
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3Z",
  compare: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  spec: "M6 3h9l4 4v14H6V3ZM14 3v5h5M9 13h7M9 17h5",
  shield: "M12 3l8 3v6c0 4.500-3.200 8-8 9-4.800-1-8-4.500-8-9V6l8-3ZM9 12l2 2 4-4",
  check: "M4 12l5 5L20 6",
  docs: "M7 3h8l4 4v14H7V3ZM11 12h5M11 16h5M11 8h2",
  truck: "M3 6h11v10H3V6ZM14 10h4l3 3v3h-7V10ZM7 19a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3ZM17 19a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.300-4.300",
  arrow: "M5 12h14M13 6l6 6-6 6",
  flask: "M9 3h6M10 3v6.500L4.600 18.200A2 2 0 0 0 6.300 21h11.400a2 2 0 0 0 1.700-2.800L14 9.500V3M7.500 15h9",
};

export function Icon({ name, size = 24, className = "" }: { name: keyof typeof paths | string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name] ?? paths.check} />
    </svg>
  );
}
