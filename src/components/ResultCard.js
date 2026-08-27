import styled, { keyframes } from "styled-components";
import { materialColor } from "../styles/theme";
import { formatYearsRange, formatConfidence, materialLabel } from "../utils/format";

const stamp = keyframes`
  0% { transform: scale(0.6) rotate(-8deg); opacity: 0; }
  60% { transform: scale(1.06) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(-3deg); opacity: 1; }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 28px;
  margin-top: 28px;
  border-top: 6px solid ${({ $color }) => $color};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const ItemTitle = styled.h2`
  font-size: 22px;
  line-height: 1.25;
`;

const MaterialTag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.inkSoft};
  display: block;
  margin-top: 4px;
`;

const BinStamp = styled.div`
  transform: rotate(-3deg);
  animation: ${stamp} 0.5s ease-out;
  border: 3px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.03em;
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const Stat = styled.div`
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

const Tips = styled.p`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  color: ${({ theme }) => theme.colors.inkSoft};
  line-height: 1.6;
`;

export default function ResultCard({ result }) {
  if (!result) return null;

  const color = materialColor(result.material);

  return (
    <Card $color={color}>
      <Header>
        <div>
          <ItemTitle>{result.itemLabel}</ItemTitle>
          <MaterialTag>
            {materialLabel(result.material)}
            {result.confidence != null && ` · confiança ${formatConfidence(result.confidence)}`}
          </MaterialTag>
        </div>
        <BinStamp $color={color}>{result.binName}</BinStamp>
      </Header>

      <Grid>
        <Stat>
          <StatLabel>Tempo p/ sumir na natureza</StatLabel>
          <StatValue>
            {formatYearsRange(result.decomposeMinYears, result.decomposeMaxYears)}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>Reciclável?</StatLabel>
          <StatValue>{result.recycles ? "Sim ♻️" : "Não 🚫"}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Ciclo de reciclagem</StatLabel>
          <StatValue style={{ fontSize: "13px", lineHeight: 1.4 }}>
            {result.recycleTimeLabel}
          </StatValue>
        </Stat>
      </Grid>

      {result.tips && <Tips>💡 {result.tips}</Tips>}
    </Card>
  );
}
