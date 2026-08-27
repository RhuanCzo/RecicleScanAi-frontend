export function formatYearsRange(minYears, maxYears) {
  const fmt = (y) => {
    const years = Number(y);
    if (years >= 1) {
      return `${Math.round(years)} ano${Math.round(years) === 1 ? "" : "s"}`;
    }
    const months = Math.round(years * 12);
    if (months >= 1) {
      return `${months} ${months === 1 ? "mês" : "meses"}`;
    }
    const weeks = Math.round(years * 52);
    return `${weeks} semana${weeks === 1 ? "" : "s"}`;
  };

  if (minYears == null || maxYears == null) return "tempo indeterminado";
  if (Math.round(minYears) === Math.round(maxYears)) return fmt(minYears);
  return `${fmt(minYears)} a ${fmt(maxYears)}`;
}

export function formatConfidence(confidence) {
  if (confidence == null) return null;
  return `${Math.round(confidence * 100)}%`;
}

export function materialLabel(material) {
  const labels = {
    plastico: "Plástico",
    papel: "Papel",
    vidro: "Vidro",
    metal: "Metal",
    organico: "Orgânico",
    eletronico: "Eletrônico (e-lixo)",
    perigoso: "Resíduo perigoso",
    naoReciclavel: "Não reciclável",
  };
  return labels[material] || material;
}
