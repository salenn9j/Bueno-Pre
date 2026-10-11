import { Link } from "@tanstack/react-router";
import logo from "@/assets/bueno-premium-logo.jpg";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bueno Premium" className="h-14 w-14 rounded-full object-cover ring-1 ring-primary/40" />
            <div>
              <p className="font-serif text-xl text-gradient-gold tracking-wider">BUENO PREMIUM</p>
              <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Since 2022</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-md leading-relaxed">
            Curadoria refinada de relógios de luxo. Cada peça é selecionada
            para celebrar quem entende que o tempo é o maior dos privilégios.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-primary text-sm tracking-[0.25em] uppercase mb-4">Navegação</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
            <li><Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link></li>
            <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre</Link></li>
            <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-primary text-sm tracking-[0.25em] uppercase mb-4">Contato</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2 hover:text-primary transition-colors"><MessageCircle size={14}/><span>WhatsApp</span></li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors"><Instagram size={14}/><span>@buenopremium</span></li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14}/><span>contato@buenopremium.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 text-xs text-muted-foreground/60 text-center tracking-wider">
          © {new Date().getFullYear()} BUENO PREMIUM · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}