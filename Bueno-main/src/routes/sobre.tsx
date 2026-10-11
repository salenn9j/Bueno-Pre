import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import logo from "@/assets/bueno-premium-logo.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Bueno Premium | História & Relógios de Luxo" },
      { name: "description", content: "Conheça a história da Bueno Premium: curadoria de relógios de luxo desde 2022, com paixão por peças únicas e atendimento personalizado." },
      { property: "og:title", content: "Sobre — Bueno Premium | História & Relógios de Luxo" },
      { property: "og:description", content: "Conheça a história da Bueno Premium: curadoria de relógios de luxo desde 2022." },
      { property: "og:url", content: "https://buenopremium.prestigebp.workers.dev/sobre" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://buenopremium.prestigebp.workers.dev/sobre",
      },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 w-full">
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary text-center mb-4">Nossa História</p>
        <h1 className="font-serif text-5xl md:text-6xl text-center text-foreground mb-12">
          Tradição, paixão e <span className="text-gradient-gold italic">excelência</span>.
        </h1>

        <div className="flex justify-center mb-16">
          <img src={logo} alt="Bueno Premium" className="w-48 h-48 rounded-full object-cover ring-2 ring-primary/50 shadow-elegant" />
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Fundada em 2022, a <strong className="text-foreground">Bueno Premium</strong> nasceu da
            paixão por relógios de alta relojoaria e do desejo de oferecer uma experiência de compra à
            altura das peças mais desejadas do mundo.
          </p>
          <p>
            Cada relógio em nossa coleção é cuidadosamente selecionado, autenticado e apresentado.
            Trabalhamos apenas com as maisons mais prestigiadas — Rolex, Patek Philippe, Audemars
            Piguet, Cartier, Omega, IWC, entre outras — garantindo que cada cliente leve para casa
            não apenas um relógio, mas uma obra de arte mecânica.
          </p>
          <p>
            Nosso compromisso é com a discrição, a autenticidade e o relacionamento de longo prazo.
            Aqui, cada peça tem uma história — e cada cliente, um atendimento exclusivo.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}