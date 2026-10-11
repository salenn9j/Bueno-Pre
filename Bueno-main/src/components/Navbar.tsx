import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/bueno-premium-logo.jpg";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Início" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Bueno Premium" className="h-12 w-12 rounded-full object-cover ring-1 ring-primary/40 group-hover:ring-primary transition-all" />
          <div className="hidden sm:block leading-tight">
            <p className="font-serif text-lg text-gradient-gold tracking-wider">BUENO PREMIUM</p>
            <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Relógios de Luxo</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors relative after:absolute after:left-0 after:bottom-[-6px] after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-wider uppercase text-muted-foreground hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}