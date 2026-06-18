import { useState, useRef, useEffect } from "react";
import { drawSprite,  } from "../features/SpriteUtils"

const DEFAULT_PROMPT = "a tiny knight with a sword";

export default function Hero() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentSeed, setCurrentSeed] = useState(DEFAULT_PROMPT);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawSprite(canvasRef.current, "base", currentSeed);
    }
  }, [currentSeed]);

  const handleGenerate = () => {
    if (generating || !prompt.trim()) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setCurrentSeed(prompt.trim());
      setGenerating(false);
      setGenerated(true);
    }, 1300);
  };

  return (
    <section className="px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Left: copy */}
      <div>
        <p className="font-mono text-xs text-purple-600 tracking-widest uppercase mb-4">
          // sprite + animation generator
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-purple-50 leading-tight mb-5">
          Describe it.<br />
          Watch it appear.<br />
          <span className="text-purple-400">Share the magic.</span>
        </h1>
        <p className="text-sm text-purple-700 leading-relaxed mb-8 max-w-sm">
          Type a prompt, get a pixel-perfect sprite in seconds. Animate it.
          Send the link. No signup required to try.
        </p>
        <div className="flex gap-3">
          <button className="bg-purple-600 hover:bg-purple-500 text-purple-50 text-sm font-mono px-5 py-2.5 rounded transition-colors duration-200">
            start generating
          </button>
          <button className="bg-transparent border border-purple-800 hover:border-purple-600 text-purple-500 hover:text-purple-300 text-sm font-mono px-5 py-2.5 rounded transition-all duration-200">
            see the gallery
          </button>
        </div>
      </div>

      {/* Right: live demo */}
      <div className="bg-[#13102a] border border-purple-900/40 rounded-xl p-5">
        <p className="font-mono text-xs text-purple-700 tracking-widest mb-4">
          // live demo — no account needed
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="a tiny dragon breathing fire..."
            maxLength={80}
            className="flex-1 bg-[#0e0c1a] border border-purple-800/50 focus:border-purple-600 outline-none rounded px-3 py-2 text-xs font-mono text-purple-300 placeholder-purple-900 transition-colors duration-200"
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-purple-100 text-xs font-mono px-4 py-2 rounded transition-colors duration-200 whitespace-nowrap"
          >
            {generating ? "..." : "generate"}
          </button>
        </div>

        {/* Sprite output */}
        <div className="bg-[#0a0815] border border-purple-900/40 rounded-lg flex items-center justify-center min-h-[120px] mb-4 relative">
          {generating && (
            <span className="font-mono text-xs text-purple-600 animate-pulse">
              generating...
            </span>
          )}
          {!generating && (
            <canvas
              ref={canvasRef}
              width={80}
              height={80}
              className="pixelated"
              style={{ imageRendering: "pixelated" }}
            />
          )}
        </div>

        {/* Share row */}
        {generated && !generating && (
          <div className="flex items-center justify-between animate-fade-in">
            <span className="font-mono text-xs text-purple-700">
              pixelforge.app/s/x7k2p
            </span>
            <button className="font-mono text-xs text-purple-300 bg-purple-900/30 border border-purple-700/50 rounded px-3 py-1 hover:border-purple-500 transition-all duration-200">
              copy share link
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
