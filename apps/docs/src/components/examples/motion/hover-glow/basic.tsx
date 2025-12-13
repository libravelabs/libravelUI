import { HoverGlow } from "@/components/ui/motion/hover-glow";

export default function BasicHoverGlow() {
  return (
    <div className="relative aspect-video h-[200px] rounded-sm border">
      <HoverGlow
        size={72}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-background flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="8" height="18" x="3" y="3" rx="1" />
          <path d="M7 3v18" />
          <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
        </svg>
        <span>Motion is emotion.</span>
      </div>
    </div>
  );
}
