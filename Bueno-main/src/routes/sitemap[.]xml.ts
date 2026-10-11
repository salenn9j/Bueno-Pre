import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchProdutos } from "@/lib/products";

const BASE_URL = "https://buenopremium.prestigebp.workers.dev";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "daily" },
          { path: "/catalogo", priority: "0.9", changefreq: "daily" },
          { path: "/sobre", priority: "0.7", changefreq: "monthly" },
          { path: "/contato", priority: "0.7", changefreq: "monthly" },
        ];

        let productEntries: { path: string; priority: string; changefreq: string }[] = [];
        try {
          const produtos = await fetchProdutos();
          productEntries = (produtos || []).map((p) => ({
            path: `/produto/${p.id}`,
            priority: "0.8",
            changefreq: "weekly",
          }));
        } catch {
          // Em caso de falha transitória com o banco, preserva as páginas estáticas
        }

        const entries = [...staticEntries, ...productEntries];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <priority>${e.priority}</priority>\n    <changefreq>${e.changefreq}</changefreq>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});