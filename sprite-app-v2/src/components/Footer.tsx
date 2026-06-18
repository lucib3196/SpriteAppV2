export default function Footer() {
  return (
    <footer className="border-t border-purple-900/30 px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-purple-800 text-xs tracking-widest">
          [ PIXEL FORGE ] — make something weird
        </span>
        <div className="flex items-center gap-6">
          {["terms", "privacy", "docs", "discord"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-xs text-purple-800 hover:text-purple-500 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
