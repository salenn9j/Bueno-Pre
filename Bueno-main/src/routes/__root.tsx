import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Bueno Premium — Relógios de Luxo" },
      { name: "description", content: "Bueno Premium: relógios de luxo selecionados. Rolex, Patek Philippe, Audemars Piguet e mais. Tradição, sofisticação e exclusividade desde 2022." },
      { name: "author", content: "Bueno Premium" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Bueno Premium" },
      { property: "og:title", content: "Bueno Premium — Relógios de Luxo" },
      { property: "og:description", content: "Coleção exclusiva de relógios premium. Sofisticação e elegância em cada peça." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://buenopremium.prestigebp.workers.dev" },
      { property: "og:image", content: "https://buenopremium.prestigebp.workers.dev/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bueno Premium — Relógios de Luxo" },
      { name: "twitter:description", content: "Coleção exclusiva de relógios premium. Sofisticação e elegância em cada peça." },
      { name: "twitter:image", content: "https://buenopremium.prestigebp.workers.dev/og-image.jpg" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://buenopremium.prestigebp.workers.dev",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Bueno Premium",
    "description": "Curadoria exclusiva de relógios de luxo. Peças selecionadas de alta relojoaria.",
    "url": "https://buenopremium.prestigebp.workers.dev",
    "logo": "https://buenopremium.prestigebp.workers.dev/og-image.jpg",
    "image": "https://buenopremium.prestigebp.workers.dev/og-image.jpg",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    }
  };

  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const channel = supabase
      .channel("produtos-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "produtos" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["produtos"] });
          queryClient.invalidateQueries({ queryKey: ["produto"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
