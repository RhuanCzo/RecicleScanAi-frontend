import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.font.body};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.font.display};
    margin: 0;
  }

  button {
    font-family: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.plastico};
    color: white;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.papel};
    outline-offset: 2px;
  }
`;
