export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return '';

  return value
    .replace(/\D/g, '') // Remove tudo que não é número
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1-$2') 
    .replace(/(-\d{2})\d+?$/, '$1'); // Limita no padrão CPF
};

export const normalizeDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
}

export const normalizeCurrency = (value: number) => {

  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  )
};