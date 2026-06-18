import { useEffect, useRef } from "react";

type Theme = "base" | "fantasy" | "scifi";

const PALETTES: Record<Theme, string[]> = {
  base: ["#534AB7", "#7F77DD", "#AFA9EC", "#CECBF6", "#3C3489", "#26215C"],
  fantasy: ["#72243E", "#993556", "#D4537E", "#ED93B1", "#26215C", "#534AB7", "#412402", "#854F0B"],
  scifi: ["#085041", "#1D9E75", "#5DCAA5", "#9FE1CB", "#0C447C", "#378ADD", "#B5D4F4"],
};

function rng(seed: number, n: number): number {
  const x = Math.sin(seed * 9301 + n * 49297 + 17) * 49279;
  return x - Math.floor(x);
}

export function drawSprite(canvas: HTMLCanvasElement, theme: Theme, seedStr: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const SZ = W >= 60 ? 8 : 5;
  const cols = Math.floor(W / SZ);
  const rows = Math.floor(H / SZ);
  const half = Math.ceil(cols / 2);
  const seed = seedStr.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const pal = PALETTES[theme];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < half; c++) {
      const v = rng(seed, r * 20 + c);
      const idx = Math.floor(v * (pal.length + 3));
      if (idx < pal.length) {
        ctx.fillStyle = pal[idx];
        ctx.fillRect(c * SZ, r * SZ, SZ, SZ);
        ctx.fillRect((cols - 1 - c) * SZ, r * SZ, SZ, SZ);
      }
    }
  }
}

export function useSpriteCanvas(theme: Theme, seedStr: string, size = 64) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSprite(ref.current, theme, seedStr);
  }, [theme, seedStr]);
  return { ref, size };
}

export type { Theme };
