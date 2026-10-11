import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageCircle, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Bueno Premium | Atendimento Exclusivo" },
      { name: "description", content: "Fale com a Bueno Premium. Atendimento personalizado por WhatsApp, e-mail e Instagram para colecionadores de relógios de luxo." },
      { property: "og:title", content: "Contato — Bueno Premium | Atendimento Exclusivo" },
      { property: "og:description", content: "Fale com a Bueno Premium. Atendimento personalizado para colecionadores de relógios de luxo." },
      { property: "og:url", content: "https://buenopremium.prestigebp.workers.dev/contato" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://buenopremium.prestigebp.workers.dev/contato",
      },
    ],
  }),
  component: Contato,
});

const itens = [
  { icon: MessageCircle, label: "WhatsApp", value: "+55 (00) 00000-0000", href: "https://wa.me/5500000000000" },
  { icon: Mail, label: "E-mail", value: "contato@buenopremium.com", href: "mailto:contato@buenopremium.com" },
  { icon: Instagram, label: "Instagram", value: "@buenopremium", href: "https://instagram.com/buenopremium" },
  { icon: MapPin, label: "Atendimento", value: "Todo o Brasil · Agendamento exclusivo", href: "#" },
];

function Contato() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 w-full">
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary text-center mb-4">Atendimento Exclusivo</p>
        <h1 className="font-serif text-5xl md:text-6xl text-center text-foreground mb-6">
          Entre em <span className="text-gradient-gold italic">contato</span>
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
          Nossa equipe está pronta para atender você com a discrição e o cuidado
          que cada cliente Bueno Premium merece.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {itens.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-card border border-border/60 hover:border-primary/60 transition-all rounded-sm flex items-start gap-5"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</p>
                <p className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}