import { useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { materialColor } from "../styles/theme";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const sweep = keyframes`
  0% { top: 6%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 92%; opacity: 0; }
`;

const Viewfinder = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 420px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px dashed ${({ theme }) => theme.colors.line};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.ink};
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.inkSoft};
  padding: 24px;
  text-align: center;
`;

const CameraIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
`;

const Ring = styled.div`
  position: absolute;
  inset: 14px;
  border-radius: 20px;
  border: 2px dashed ${({ $color, theme }) => $color || theme.colors.ink};
  opacity: 0.7;
  animation: ${spin} 6s linear infinite;
`;

const ScanLine = styled.div`
  position: absolute;
  left: 6%;
  right: 6%;
  height: 2px;
  background: ${({ $color, theme }) => $color || theme.colors.ink};
  box-shadow: 0 0 12px 2px ${({ $color, theme }) => $color || theme.colors.ink};
  animation: ${sweep} 1.6s ease-in-out infinite;
`;

const CornerTag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  letter-spacing: 0.06em;
  color: ${({ $color, theme }) => $color || theme.colors.inkSoft};
  background: rgba(255, 255, 255, 0.85);
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const HiddenInput = styled.input`
  display: none;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 12px 22px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.ink};
          color: ${theme.colors.bg};
        `
      : css`
          background: transparent;
          color: ${theme.colors.ink};
          border: 1.5px solid ${theme.colors.line};
        `}

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function CameraCapture({ onScan, isScanning, resultMaterial }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const accentColor = resultMaterial ? materialColor(resultMaterial) : null;

  function handleFile(file) {
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    onScan(file);
  }

  return (
    <div>
      <Viewfinder onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          <PreviewImg src={previewUrl} alt="Pré-visualização do resíduo escaneado" />
        ) : (
          <Placeholder>
            <CameraIcon>📷</CameraIcon>
            <strong>Toque para escanear seu lixo</strong>
            <span>Envie uma foto ou use a câmera do dispositivo</span>
          </Placeholder>
        )}

        {isScanning && (
          <>
            <Ring $color={accentColor} />
            <ScanLine $color={accentColor} />
            <CornerTag $color={accentColor}>ANALISANDO…</CornerTag>
          </>
        )}
      </Viewfinder>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <HiddenInput
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <Actions>
        <ActionButton
          $variant="primary"
          onClick={() => cameraInputRef.current?.click()}
          disabled={isScanning}
        >
          Tirar foto
        </ActionButton>
        <ActionButton onClick={() => fileInputRef.current?.click()} disabled={isScanning}>
          Escolher da galeria
        </ActionButton>
      </Actions>
    </div>
  );
}
