// Paleta derivada da Resolução CONAMA 275/2001 (cores oficiais de coleta seletiva no Brasil).
// O "acento" muda dinamicamente conforme o material identificado — isso é o sinal visual
// central do app, não uma decoração.

export const theme = {
  colors: {
    bg: "#F0F2EE",
    bgAlt: "#E4E8E0",
    ink: "#14231C",
    inkSoft: "#4B5A50",
    line: "#CBD2C6",
    surface: "#FFFFFF",
    surfaceSoft: "#F7F8F5",

    // cores oficiais por material (Resolução CONAMA 275/2001)
    plastico: "#E23B32",
    papel: "#2F6FED",
    vidro: "#2E9E52",
    metal: "#F4B400",
    organico: "#8B5E34",
    eletronico: "#8E44AD",
    perigoso: "#D9006C",
    naoReciclavel: "#6B7280",
  },
  font: {
    display: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: "6px",
    md: "14px",
    lg: "26px",
    pill: "999px",
  },
  shadow: {
    soft: "0 2px 10px rgba(20, 35, 28, 0.06)",
    card: "0 12px 30px rgba(20, 35, 28, 0.10)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
  },
};

export const materialColor = (material) =>
  theme.colors[material] || theme.colors.naoReciclavel;
