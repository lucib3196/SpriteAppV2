import { useState, useRef, useEffect } from "react";
import { drawSprite, type Theme } from "./SpriteUtils";

interface PromptTheme {
  id: Theme;
  badge: string;
  badgeClass: string;
  name: string;
  description: string;
  chips: { label: string; prompt: string }[];
  accentClass: string;
  btnClass: string;
  count: string;
  spriteSeed: string;
}

const themes: PromptTheme[] = [
  {
    id: "base",
    badge: "// base",
    badgeClass: "bg-purple-900/30 text-purple-400",
    name: "Freestyle",
    description: "No theme. Just your imagination and a blank canvas.",
    chips: [
      { label: "tiny knight", prompt: "a tiny knight with a sword" },
      { label: "magic orb", prompt: "a glowing magic orb" },
      { label: "beach crab", prompt: "a little crab on a beach" },
      { label: "treasure chest", prompt: "a treasure chest overflowing with gold" },
    ],
    accentClass: "border-purple-600",
    btnClass: "text-purple-400 bg-purple-900/25 border-purple-700/50 hover:border-purple-500 hover:text-purple-200",
    count: "120+ prompts",
    spriteSeed: "knight",
  },
  {
    id: "fantasy",
    badge: "// theme",
    badgeClass: "bg-pink-900/25 text-pink-400",
    name: "Dark Fantasy",
    description: "Dungeons, demons, and ancient relics. Made for RPG makers.",
    chips: [
      { label: "dark elf", prompt: "a dark elf archer in shadow armor" },
      { label: "cursed skull", prompt: "a cursed skull with glowing eyes" },
      { label: "fire demon", prompt: "a fire demon wielding a scythe" },
      { label: "runic sword", prompt: "an ancient runic sword dripping poison" },
    ],
    accentClass: "border-pink-600",
    btnClass: "text-pink-400 bg-pink-900/20 border-pink-800/50 hover:border-pink-500 hover:text-pink-200",
    count: "80+ prompts",
    spriteSeed: "demon",
  },
  {
    id: "scifi",
    badge: "// theme",
    badgeClass: "bg-teal-900/25 text-teal-400",
    name: "Sci-Fi",
    description: "Robots, ships, and alien worlds. For builders of future worlds.",
    chips: [
      { label: "tiny robot", prompt: "a small robot with a blinking antenna" },
      { label: "plasma rifle", prompt: "a neon plasma rifle charging up" },
      { label: "alien pilot", prompt: "an alien pilot in a glass cockpit" },
      { label: "holo shield", prompt: "a holographic shield generator" },
    ],
    accentClass: "border-teal-600",
    btnClass: "text-teal-400 bg-teal-900/20 border-teal-800/50 hover:border-teal-500 hover:text-teal-200",
    count: "90+ prompts",
    spriteSeed: "robot",
  },
];

const TAGS: Record<Theme, string[]> = {
  base: ["freestyle", "character", "16×16"],
  fantasy: ["dark fantasy", "rpg", "16×16"],
  scifi: ["sci-fi", "mecha", "16×16"],
};

function MiniSprite({ theme, seed }: { theme: Theme; seed: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSprite(ref.current, theme, seed);
  }, [theme, seed]);
  return (
    <canvas
      ref={ref}
      width={40}
      height={40}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

function OutputSprite({ theme, seed }: { theme: Theme; seed: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawSprite(ref.current, theme, seed);
  }, [theme, seed]);
  return (
    <canvas
      ref={ref}
      width={64}
      height={64}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export default function PromptThemes() {
  const [activeTheme, setActiveTheme] = useState<Theme>("base");
  const [selectedChips, setSelectedChips] = useState<Record<Theme, string>>({
    base: "a tiny knight with a sword",
    fantasy: "a dark elf archer in shadow armor",
    scifi: "a small robot with a blinking antenna",
  });
  const [demoPrompt, setDemoPrompt] = useState("a tiny knight with a sword");
  const [generating, setGenerating] = useState(false);
  const [outputSeed, setOutputSeed] = useState("a tiny knight with a sword");

  const selectTheme = (theme: Theme) => {
    setActiveTheme(theme);
    setDemoPrompt(selectedChips[theme]);
    generate(selectedChips[theme], true);
  };

  const pickChip = (theme: Theme, prompt: string) => {
    setSelectedChips((prev) => ({ ...prev, [theme]: prompt }));
    if (activeTheme === theme) {
      setDemoPrompt(prompt);
      generate(prompt, true);
    }
  };

  const generate = (promptOverride?: string, instant = false) => {
    const p = promptOverride ?? demoPrompt;
    if (!p.trim()) return;
    if (instant) {
      setOutputSeed(p);
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setOutputSeed(p);
      setGenerating(false);
    }, 1200);
  };

  const activeThemeData = themes.find((t) => t.id === activeTheme)!;

  return (
    <section id="how-it-works" className="px-8 py-16 max-w-6xl mx-auto">
      {/* Section header */}
      <p className="font-mono text-xs text-purple-600 tracking-widest uppercase mb-3">
        // starter themes
      </p>
      <h2 className="text-2xl font-semibold text-purple-50 mb-2">
        Pick a theme, start instantly
      </h2>
      <p className="text-sm text-purple-700 mb-8">
        Not sure what to make? Start with a curated prompt pack — or go freestyle.
      </p>

      {/* Three cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {themes.map((theme) => {
          const isActive = activeTheme === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`bg-[#13102a] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                isActive
                  ? `border-2 ${theme.accentClass}`
                  : "border border-purple-900/30 hover:border-purple-700/50"
              }`}
            >
              {/* Card top */}
              <div className="p-4 border-b border-purple-900/20">
                <span className={`inline-block font-mono text-xs px-2 py-0.5 rounded mb-3 ${theme.badgeClass}`}>
                  {theme.badge}
                </span>
                <p className="text-sm font-medium text-purple-200 mb-1">{theme.name}</p>
                <p className="text-xs text-purple-700 leading-relaxed">{theme.description}</p>
              </div>

              {/* Sprite + chips */}
              <div className="p-4 bg-[#0a0815] flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0 bg-[#13102a] border border-purple-900/30 rounded-md flex items-center justify-center">
                  <MiniSprite theme={theme.id} seed={theme.spriteSeed} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {theme.chips.map((chip) => {
                    const isSelected = selectedChips[theme.id] === chip.prompt;
                    return (
                      <button
                        key={chip.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          pickChip(theme.id, chip.prompt);
                        }}
                        className={`font-mono text-xs px-2 py-1 rounded border transition-all duration-150 ${
                          isSelected
                            ? "text-purple-100 border-purple-500 bg-purple-800/30"
                            : "text-purple-700 border-purple-900/40 bg-transparent hover:border-purple-600 hover:text-purple-400"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-4 py-3 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectTheme(theme.id);
                  }}
                  className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${theme.btnClass}`}
                >
                  try {theme.name.toLowerCase()}
                </button>
                <span className="font-mono text-xs text-purple-800">{theme.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo area */}
      <div className="bg-[#13102a] border border-purple-900/40 rounded-xl p-5">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={demoPrompt}
            onChange={(e) => setDemoPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="describe your sprite..."
            className="flex-1 bg-[#0e0c1a] border border-purple-800/50 focus:border-purple-600 outline-none rounded px-3 py-2 text-xs font-mono text-purple-300 placeholder-purple-900 transition-colors duration-200"
          />
          <button
            onClick={() => generate()}
            disabled={generating}
            className={`font-mono text-xs px-4 py-2 rounded border transition-all duration-200 disabled:opacity-40 ${activeThemeData.btnClass}`}
          >
            {generating ? "..." : "generate"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#0a0815] border border-purple-900/40 rounded-lg p-3 flex-shrink-0">
            {generating ? (
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="font-mono text-xs text-purple-700 animate-pulse">...</span>
              </div>
            ) : (
              <OutputSprite theme={activeTheme} seed={outputSeed} />
            )}
          </div>
          <div>
            <p className="font-mono text-xs text-purple-700 mb-2">
              {"// prompt: "}
              <span className="text-purple-400">{outputSeed}</span>
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {TAGS[activeTheme].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-purple-800 bg-purple-900/20 rounded px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
