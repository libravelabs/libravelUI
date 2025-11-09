"use client";

import { Marquee } from "@/components/ui/core/marquee";
import { Info } from "lucide-react";

export default function NewsMarquee() {
  return (
    <div className="bg-emerald-600 text-white rounded-md overflow-hidden shadow-md">
      <div className="bg-emerald-700 px-4 py-1.5 flex items-center gap-2">
        <Info />
        <span className="text-xs font-semibold tracking-wide uppercase">
          Breaking News
        </span>
      </div>
      <Marquee className="py-2 bg-emerald-500">
        <div className="flex gap-6 text-sm px-4 items-center">
          <span>📰 OpenAI launches GPT-5 with real-time reasoning</span>
          <span>•</span>
          <span>💡 Apple unveils AI-powered macOS update</span>
          <span>•</span>
          <span>📱 WhatsApp adds offline messaging via satellite</span>
          <span>•</span>
          <span>💸 Bitcoin hits $100k amid institutional buying</span>
          <span>•</span>
          <span>🧬 CRISPR gene editing approved for rare diseases</span>
        </div>
      </Marquee>
    </div>
  );
}
