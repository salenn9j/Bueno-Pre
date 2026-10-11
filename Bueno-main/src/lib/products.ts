import { supabase } from "@/integrations/supabase/client";

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  destaque: boolean;
  created_at: string;
  updated_at: string;
};

export async function fetchProdutos(): Promise<Produto[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("destaque", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Produto[];
}

export async function fetchProduto(id: string): Promise<Produto | null> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Produto | null;
}

export function formatPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor);
}

const WHATSAPP_NUMBER = "5500000000000";

export function whatsappLink(produto: Produto): string {
  const msg = `Olá! Tenho interesse no relógio *${produto.nome}* (${formatPreco(produto.preco)}). Pode me passar mais informações?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}