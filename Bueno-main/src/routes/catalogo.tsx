import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProdutos } from "@/lib/products";

const produtosQuery = queryOptions({
  queryKey: ["produtos"],
  queryFn: fetchProdutos,
});

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — Bueno Premium | Relógios de Luxo" },
      { name: "description", content: "Explore a coleção completa de relógios de luxo da Bueno Premium. Filtre por categoria e encontre a peça perfeita." },
      { property: "og:title", content: "Catálogo — Bueno Premium | Relógios de Luxo" },
      { property: "og:description", content: "Explore a coleção completa de relógios de luxo da Bueno Premium." },
      { property: "og:url", content: "https://buenopremium.prestigebp.workers.dev/catalogo" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://buenopremium.prestigebp.workers.dev/catalogo",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(produtosQuery),
  component: Catalogo,
  errorComponent: ({ error }) => <div className="p-10 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Não encontrado</div>,
});

function Catalogo() {
  const { data: produtos } = useSuspenseQuery(produtosQuery);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<string>("Todas");

  const categorias = useMemo(
    () => ["Todas", ...Array.from(new Set(produtos.map((p) => p.categoria)))],
    [produtos],
  );

  const filtrados = useMemo(() => {
    return produtos.filter((p) => {
      const matchCat = categoria === "Todas" || p.categoria === categoria;
      const q = busca.trim().toLowerCase();
      const matchBusca = !q || p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q);
      return matchCat && matchBusca;
    });
  }, [produtos, busca, categoria]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="border-b border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-4">Coleção Completa</p>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground">Catálogo</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Peças únicas, selecionadas a dedo para os mais exigentes colecionadores.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 w-full">
        {/* Search + filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou descrição..."
              className="w-full bg-card border border-border focus:border-primary outline-none pl-11 pr-4 py-3 text-sm tracking-wide rounded-sm transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border whitespace-nowrap transition-all ${
                  categoria === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-foreground">Nenhuma peça encontrada</p>
            <p className="text-sm text-muted-foreground mt-2">Ajuste sua busca ou explore outras categorias.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtrados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        )}

        <p className="mt-12 text-xs text-muted-foreground/70 text-center tracking-wider">
          {filtrados.length} {filtrados.length === 1 ? "peça" : "peças"} encontradas
        </p>
      </section>

      <Footer />
    </div>
  );
}