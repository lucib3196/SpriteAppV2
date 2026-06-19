interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="5" height="5" fill="#7F77DD" />
        <rect x="7" y="1" width="5" height="5" fill="#534AB7" />
        <rect x="1" y="7" width="5" height="5" fill="#534AB7" />
        <rect x="7" y="7" width="5" height="5" fill="#7F77DD" />
      </svg>
    ),
    title: "AI sprite generation",
    description:
      "Describe any character, item, or scene. Get a pixel-art sprite back in under 3 seconds.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="6" width="4" height="5" fill="#7F77DD" />
        <rect x="6" y="4" width="4" height="8" fill="#AFA9EC" />
        <rect x="11" y="6" width="4" height="5" fill="#7F77DD" />
      </svg>
    ),
    title: "One-click animation",
    description:
      "Walk cycles, idle bobs, attack frames — animated automatically from your prompt.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="4" cy="8" r="3" fill="#534AB7" />
        <circle cx="12" cy="8" r="3" fill="#7F77DD" />
        <rect x="4" y="7" width="8" height="2" fill="#AFA9EC" />
      </svg>
    ),
    title: "Instant share links",
    description:
      "Every sprite gets a permanent link. Send to friends, embed in Discord, post anywhere.",
  },
];

export default function Features() {
  return (
    <section className="border-t border-purple-900/30 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-900/20">
      {features.map((f) => (
        <div key={f.title} className="px-8 py-8">
          <div className="w-8 h-8 bg-purple-900/30 rounded-md flex items-center justify-center mb-4">
            {f.icon}
          </div>
          <p className="text-sm font-medium text-purple-200 mb-2">{f.title}</p>
          <p className="text-xs text-purple-700 leading-relaxed">{f.description}</p>
        </div>
      ))}
    </section>
  );
}
