import { useRef, useEffect } from "react";
import { drawSprite, type Theme } from "./SpriteUtils";

interface GalleryItem {
  theme: Theme;
  seed: string;
  user: string;
  label: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { theme: "base", seed: "wizard", user: "@pixl_rex", label: "wizard" },
  { theme: "fantasy", seed: "demon", user: "@fungi_art", label: "fire demon" },
  { theme: "scifi", seed: "robot", user: "@spooky_dev", label: "bot v2" },
  { theme: "base", seed: "crab", user: "@forge_master", label: "beach crab" },
  { theme: "fantasy", seed: "skull", user: "@gem_witch", label: "cursed skull" },
  { theme: "scifi", seed: "ship", user: "@neon_arc", label: "warpship" },
];

function GallerySprite({ theme, seed }: { theme: Theme; seed: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSprite(ref.current, theme, seed);
  }, [theme, seed]);
  return (
    <canvas
      ref={ref}
      width={48}
      height={48}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-purple-900/30 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-xs text-purple-600 tracking-widest uppercase">
            // recently shared by the community
          </p>
          <span className="font-mono text-xs text-purple-800">live feed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="bg-[#13102a] border border-purple-900/30 rounded-lg p-3 flex flex-col items-center gap-2 hover:border-purple-700/50 transition-colors duration-200 cursor-pointer"
            >
              <GallerySprite theme={item.theme} seed={item.seed} />
              <p className="font-mono text-xs text-purple-700 text-center truncate w-full">
                {item.user}
              </p>
            </div>
          ))}
        </div>

        {/* Share CTA bar */}
        <div className="mt-6 bg-purple-900/15 border border-purple-900/30 rounded-lg px-5 py-4 flex items-center justify-between">
          <span className="font-mono text-xs text-purple-700">
            // your friends can see your sprites without an account
          </span>
          <button className="font-mono text-xs text-purple-300 bg-purple-900/30 border border-purple-700/50 rounded px-3 py-1.5 hover:border-purple-500 transition-all duration-200">
            learn about sharing
          </button>
        </div>
      </div>
    </section>
  );
}
