export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-purple-900/30">
            <span className="font-mono text-purple-300 text-sm tracking-widest font-medium">
                [ PIXEL FORGE ]
            </span>
            <div className="hidden md:flex items-center gap-8">
                {["gallery", "how it works", "pricing"].map((link) => (
                    <a
                        key={link}
                        href={`#${link.replace(" ", "-")}`}
                        className="text-xs font-mono text-purple-600 hover:text-purple-300 transition-colors duration-200"
                    >
                        {link}
                    </a>
                ))}
            </div>
            <button className="text-xs font-mono text-purple-300 bg-purple-900/30 border border-purple-700/50 rounded px-3 py-1.5 hover:bg-purple-800/40 hover:border-purple-500 transition-all duration-200">
                sign in
            </button>
        </nav>
    );
}
