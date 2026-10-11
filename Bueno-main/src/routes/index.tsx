import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProdutos } from "@/lib/products";
import logo from "@/assets/bueno-premium-logo.jpg";
import { ArrowRight, Award, ShieldCheck, Sparkles } from "lucide-react";

const produtosQuery = queryOptions({
  queryKey: ["produtos"],
  queryFn: fetchProdutos,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bueno Premium — Relógios de Luxo Selecionados" },
      { name: "description", content: "Coleção exclusiva de relógios premium: Rolex, Patek Philippe, Audemars Piguet e mais. Bueno Premium — desde 2022." },
      { property: "og:title", content: "Bueno Premium — Relógios de Luxo Selecionados" },
      { property: "og:description", content: "Coleção exclusiva de relógios premium: Rolex, Patek Philippe, Audemars Piguet e mais." },
      { property: "og:url", content: "https://buenopremium.prestigebp.workers.dev/" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(produtosQuery),
  component: Index,
  errorComponent: ({ error }) => <div className="p-10 text-center text-muted-foreground">{error.message}</div>,
});

function Index() {
  const { data: produtos } = useSuspenseQuery(produtosQuery);
  const destaques = produtos.filter((p) => p.destaque).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-primary/10 blur-[90px] sm:blur-[120px] animate-shimmer" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-up text-center lg:text-left">
            <p className="text-[11px] tracking-[0.4em] uppercase text-primary">Desde 2022 · Relógios de Luxo</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-foreground">
              O tempo é o <span className="text-gradient-gold italic">privilégio</span> dos sofisticados.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Bueno Premium reúne os relógios mais desejados do mundo em uma curadoria
              exclusiva. Autenticidade, refinamento e atendimento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/catalogo"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium shadow-gold hover:opacity-90 transition-all"
              >
                Ver Coleção <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-primary/40 text-primary text-sm tracking-[0.2em] uppercase hover:bg-primary/5 transition-all"
              >
                Falar com consultor
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-up">
            <div className="relative max-w-full">
              <div className="absolute -inset-8 sm:-inset-12 bg-gradient-gold opacity-20 blur-2xl sm:blur-3xl rounded-full" />
              <img
                src={logo}
                alt="Bueno Premium"
                width={440}
                height={440}
                loading="eager"
                className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[440px] md:h-[440px] object-cover rounded-full ring-2 ring-primary/60 shadow-elegant mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid sm:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, t: "Autenticidade Garantida", d: "Peças verificadas e procedência comprovada." },
            { icon: Award, t: "Curadoria Exclusiva", d: "Modelos selecionados das maisons mais desejadas." },
            { icon: Sparkles, t: "Atendimento Premium", d: "Consultoria pessoal e discrição absoluta." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <Icon className="text-primary mt-1 shrink-0" size={22} />
              <div>
                <p className="font-serif text-lg text-foreground">{t}</p>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-3">Seleção da Casa</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Em destaque</h2>
            </div>
            <Link to="/catalogo" className="text-sm tracking-[0.2em] uppercase text-primary hover:underline underline-offset-4">
              Ver tudo →
            </Link>
          </div>

          {destaques.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Nenhum destaque disponível no momento.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destaques.map((p) => (
                <ProductCard key={p.id} produto={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
