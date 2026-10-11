
CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  preco NUMERIC(10,2) NOT NULL DEFAULT 0,
  imagem TEXT NOT NULL DEFAULT '',
  categoria TEXT NOT NULL DEFAULT 'Geral',
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.produtos TO anon, authenticated;
GRANT ALL ON public.produtos TO service_role;

ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Produtos sao publicos para leitura"
  ON public.produtos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX idx_produtos_categoria ON public.produtos(categoria);
CREATE INDEX idx_produtos_destaque ON public.produtos(destaque) WHERE destaque = true;

ALTER PUBLICATION supabase_realtime ADD TABLE public.produtos;
ALTER TABLE public.produtos REPLICA IDENTITY FULL;
