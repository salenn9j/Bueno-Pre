import { Link } from "@tanstack/react-router";
import type { Produto } from "@/lib/products";
import { formatPreco } from "@/lib/products";

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link
      to="/produto/$id"
      params={{ id: produto.id }}
      className="group relative block overflow-hidden bg-card border border-border/60 hover:border-primary/60 transition-all duration-500 rounded-sm"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {produto.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Sem imagem</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        {produto.destaque && (
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.25em] uppercase bg-background/80 backdrop-blur text-primary border border-primary/40">
            Destaque
          </span>
        )}
      </div>
      <div className="p-6 space-y-2">
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary/70">{produto.categoria}</p>
        <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
          {produto.nome}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{produto.descricao}</p>
        <div className="pt-3 flex items-end justify-between">
          <span className="font-serif text-2xl text-gradient-gold">{formatPreco(produto.preco)}</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
            Ver →
          </span>
        </div>
      </div>
    </Link>
  );
}