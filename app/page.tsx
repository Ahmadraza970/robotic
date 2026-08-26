import { SplineSceneBasic } from "@/components/ui/demo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <main className="relative z-10 w-full max-w-5xl">
        <SplineSceneBasic />
      </main>
    </div>
  );
}
