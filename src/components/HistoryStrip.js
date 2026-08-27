import styled from "styled-components";
import { materialColor } from "../styles/theme";
import { materialLabel } from "../utils/format";

const Wrapper = styled.section`
  margin-top: 48px;
`;

const Title = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.inkSoft};
  margin-bottom: 14px;
`;

const List = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
`;

const Chip = styled.div`
  flex: 0 0 auto;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 14px;
  border-left: 4px solid ${({ $color }) => $color};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const ChipLabel = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 2px;
`;

const ChipMeta = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.inkSoft};
  font-size: 14px;
`;

export default function HistoryStrip({ scans }) {
  if (!scans || scans.length === 0) {
    return (
      <Wrapper>
        <Title>Histórico</Title>
        <Empty>Seus escaneamentos recentes vão aparecer aqui.</Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Histórico recente</Title>
      <List>
        {scans.map((scan) => (
          <Chip key={scan.id} $color={materialColor(scan.material)}>
            <ChipLabel>{scan.item_label}</ChipLabel>
            <ChipMeta>{materialLabel(scan.material)}</ChipMeta>
          </Chip>
        ))}
      </List>
    </Wrapper>
  );
}
