'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Mail, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const Spotlight = dynamic(
  () => import("@/components/ui/spotlight").then((m) => m.Spotlight),
  { ssr: false }
)

function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  let charIdx = 0;
  return (
    <span className="inline flex flex-wrap gap-x-[0.3em]">
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split("").map((ch, ci) => {
            const delay = charIdx * 0.02;
            charIdx++;
            return (
              <span
                key={`${wi}-${ci}`}
                className="inline-block char-reveal"
                style={{
                  animationDelay: `${delay}s`,
                  transformOrigin: "bottom",
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[520px] bg-black/[0.96] relative overflow-hidden rounded-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-400 w-fit mb-6 backdrop-blur-sm fade-in-scale">
            <Sparkles className="h-3.5 w-3.5 text-neutral-300" />
            <span>Powered by Spline</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/40">
              <AnimatedHeading text="Interactive 3D" />
            </span>
          </h1>

          <p
            className="mt-5 text-neutral-400 max-w-md leading-relaxed text-base fade-in-up"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Bring your UI to life with beautiful 3D scenes. Create immersive
            experiences that capture attention and enhance your design.
          </p>

          <div className="mt-7 fade-in-up" style={{ animationDelay: "0.6s" }}>
            <a
              href="mailto:ahmadbkj92@gmail.com?subject=Feedback"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              <Mail className="h-4 w-4" />
              Send Feedback
            </a>
          </div>
        </div>

        {/* Right content — Spline 3D scene */}
        <div className="flex-1 relative fade-in-scale" style={{ animationDelay: "0.2s" }}>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
