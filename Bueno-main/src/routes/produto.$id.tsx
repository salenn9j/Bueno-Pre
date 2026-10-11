import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchProduto, formatPreco, whatsappLink } from "@/lib/products";

const produtoQuery = (id: string) =>
  queryOptions({
    queryKey: ["produto", id],
    queryFn: async () => {
      const p = await fetchProduto(id);
      if (!p) throw notFound();
      return p;
    },
  });

export const Route = createFileRoute("/produto/$id")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(produtoQuery(params.id)),
  component: ProdutoPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-serif text-3xl">Peça não encontrada</p>
      <Link to="/catalogo" className="text-primary text-sm tracking-[0.2em] uppercase hover:underline">
        Voltar ao catálogo
      </Link>
    </div>
  ),
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.nome} — Bueno Premium` },
          { name: "description", content: loaderData.descricao.slice(0, 160) },
          { property: "og:title", content: `${loaderData.nome} — Bueno Premium` },
          { property: "og:description", content: loaderData.descricao.slice(0, 160) },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `https://buenopremium.prestigebp.workers.dev/produto/${params.id}` },
          { property: "og:image", content: loaderData.imagem },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: `${loaderData.nome} — Bueno Premium` },
          { name: "twitter:description", content: loaderData.descricao.slice(0, 160) },
          { name: "twitter:image", content: loaderData.imagem },
        ]
      : [],
    links: [
      {
        rel: "canonical",
        href: `https://buenopremium.prestigebp.workers.dev/produto/${params.id}`,
      },
    ],
  }),
});

function ProdutoPage() {
  const { id } = Route.useParams();
  const { data: produto } = useSuspenseQuery(produtoQuery(id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 w-full">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Voltar ao catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative animate-fade-up">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full -z-10" />
            <div className="relative aspect-square bg-card border border-border/60 overflow-hidden rounded-sm">
              {produto.imagem ? (
                <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
              )}
            </div>
          </div>

          <div className="space-y-8 animate-fade-up">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-3">{produto.categoria}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">{produto.nome}</h1>
            </div>

            <div className="border-y border-border/50 py-6">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Valor</p>
              <p className="font-serif text-4xl md:text-5xl text-gradient-gold">{formatPreco(produto.preco)}</p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Descrição</p>
              <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">{produto.descricao}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={whatsappLink(produto)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium shadow-gold hover:opacity-90 transition-all"
              >
                <MessageCircle size={16} /> Comprar via WhatsApp
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-primary/40 text-primary text-sm tracking-[0.2em] uppercase hover:bg-primary/5 transition-all"
              >
                Entrar em contato
              </Link>
            </div>

            <p className="text-xs text-muted-foreground/70 leading-relaxed pt-4">
              Peça com autenticidade garantida. Entrega segura e discreta para todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}