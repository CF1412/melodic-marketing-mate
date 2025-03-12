
import { useState, useEffect } from "react";
import { Music, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        scrolled ? "glass-morphism" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-2 animate-pulse-subtle">
            <Music className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">
            <span className="gradient-text">Music</span> Copilot
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-full hover:bg-secondary/50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-morphism border-t animate-fade-in p-4">
          <nav className="flex flex-col space-y-4">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
