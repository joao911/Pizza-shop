import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export const formatDistanceToNowLocale = (date: Date) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });
};

export const formatCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
