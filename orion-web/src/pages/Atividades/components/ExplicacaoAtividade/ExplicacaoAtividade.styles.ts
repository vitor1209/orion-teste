import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background:
    "radial-gradient(circle at top, rgba(124, 92, 255, 0.14), transparent 22%), linear-gradient(180deg, #fbfbff 0%, #f4f6ff 100%)",
}

export const conteudo: SxProps<Theme> = {
    justifyContent: "center",
    minHeight: "100vh",
    flex: 1,
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
    padding: { xs: "32px 20px 48px", sm: "56px 24px 64px" },
    display: "flex",
    flexDirection: "column",
    gap: 3,
}

export const cabecalho: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 2,
}

export const barraTitulo: SxProps<Theme> = {
    width: 4,
    height: 36,
    borderRadius: "999px",
    background: "linear-gradient(180deg, #aa4cff, #7C3AED)",
}

export const acaoTopo: SxProps<Theme> = {
    position: { xs: "static", md: "absolute" },
    top: { md: 78 },
    right: { md: 44 },
    display: { xs: "flex", md: "block" },
    justifyContent: { xs: "flex-end", md: "normal" },
    marginBottom: { xs: "20px", md: 0 },
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: { xs: "1.5rem", sm: "2rem" },
    fontWeight: 800,
    color: "#191d2b",
}

export const chipNivel: SxProps<Theme> = {
    alignSelf: "flex-start",
    height: 30,
    paddingInline: 1,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #aa4cff, #7C3AED)",
    textTransform: "capitalize",
}

export const card: SxProps<Theme> = {
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ece7fb",
    boxShadow: "0 18px 44px rgba(20, 20, 19, 0.08)",
    padding: { xs: "24px 20px", sm: "32px 36px" },
}

export const areaRolavel: SxProps<Theme> = {
    maxHeight: 420,
    overflowY: "auto",
    paddingRight: 3,
}

export const eyebrow: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.88rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#9ca3af",
    marginBottom: 1,
}

export const subTitulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#191d2b",
    marginBottom: 2,
}

export const descricao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    lineHeight: 1.7,
    color: "#515d7d",
    whiteSpace: "pre-line",
}

export const botaoAvancar: SxProps<Theme> = {
    position: "absolute",
    right: { xs: 16, sm: -20 },
    bottom: -20,
    boxShadow: "0 12px 24px rgba(124, 58, 237, 0.35)",
}
