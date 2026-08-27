import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import CameraCapture from "./components/CameraCapture";
import ResultCard from "./components/ResultCard";
import HistoryStrip from "./components/HistoryStrip";
import { scanImage, fetchHistory } from "./services/api";

const Page = styled.div`
  min-height: 100%;
  padding: 32px 20px 80px;
`;

const Container = styled.main`
  max-width: 640px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkSoft};
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: clamp(28px, 6vw, 40px);
  line-height: 1.1;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkSoft};
  margin-top: 12px;
  font-size: 15px;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorBanner = styled.div`
  margin-top: 20px;
  background: #fdecec;
  color: #a5271f;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 16px;
  font-size: 14px;
  text-align: center;
`;

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    try {
      const { scans } = await fetchHistory();
      setHistory(scans);
    } catch {
      // histórico é best-effort — não bloqueia o uso do app
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleScan(file) {
    setIsScanning(true);
    setError(null);
    setResult(null);
    try {
      const { result } = await scanImage(file);
      setResult(result);
      loadHistory();
    } catch (err) {
      setError(err.message || "Algo deu errado ao analisar a imagem.");
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Container>
          <Header>
            <Eyebrow>recicleScanAI</Eyebrow>
            <Title>Escaneie. Descubra a lata certa.</Title>
            <Subtitle>
              Tire uma foto do seu lixo e a IA identifica o material, a lata correta
              para descarte e quanto tempo ele leva para reciclar ou desaparecer na natureza.
            </Subtitle>
          </Header>

          <CameraCapture
            onScan={handleScan}
            isScanning={isScanning}
            resultMaterial={result?.material}
          />

          {error && <ErrorBanner role="alert">{error}</ErrorBanner>}

          <ResultCard result={result} />

          <HistoryStrip scans={history} />
        </Container>
      </Page>
    </ThemeProvider>
  );
}
