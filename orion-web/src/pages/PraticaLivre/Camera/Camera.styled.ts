import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import notaTop from "../../../assets/images/notas1.png";
import notaBottom from "../../../assets/images/notas1.png";

export const PageWrapper = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: -300,
    right: 0,
    width: "min(640px, 90vw)",
    height: "min(640px, 90vw)",
    backgroundImage: `url(${notaBottom})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "top right",
    opacity: 0.18,
    pointerEvents: "none",
    zIndex: 0,
    transform: "rotate(180deg)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "23%",
    left: 0,
    width: "min(640px, 90vw)",
    height: "min(640px, 90vw)",
    backgroundImage: `url(${ notaTop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "bottom left",
    opacity: 0.18,
    pointerEvents: "none",
    zIndex: 0,
  },
});

export const ModalCard = styled(Stack)({
  position: "relative",
  zIndex: 1,
  minHeight: "calc(100vh - 80px)",
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "40px",
  margin: "40px auto",
  width: "100%",
  maxWidth: "75vw",
  boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
  alignItems: "center",

  "@media (max-width: 900px)": {
    maxWidth: "calc(100vw - 32px)",
    minHeight: "calc(100vh - 40px)",
    margin: "20px 16px",
    padding: "24px",
  },

  "@media (max-width: 520px)": {
    borderRadius: "16px",
    padding: "20px 16px",
  },
});

export const EyebrowLabel = styled(Typography)({
  fontWeight: 600,
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8f7cff",
  marginBottom: "8px",
});

export const PageTitle = styled(Typography)({
  fontFamily: "Ubuntu, Arial, sans-serif",
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#111111",
  lineHeight: 1.2,
  marginBottom: "8px",

  "@media (max-width: 600px)": {
    fontSize: "1.4rem",
  },
});

export const PageSubtitle = styled(Typography)({
  fontSize: "0.9rem",
  color: "#888888",
  lineHeight: 1.6,
  marginBottom: "24px",

  "@media (max-width: 600px)": {
    fontSize: "0.84rem",
  },
});

export const CameraBox = styled(Box)({
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  width: "100%",
  "@media (max-width: 600px)": {
    maxWidth: "100%",
  },
});

export const BackButtonWrapper = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
  zIndex: 2,

  "@media (max-width: 600px)": {
    position: "static",
    alignSelf: "flex-end",
    marginBottom: "12px",
  },
});
