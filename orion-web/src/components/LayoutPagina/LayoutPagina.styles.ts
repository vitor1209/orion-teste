import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    minHeight: "100vh",

    background:
        "radial-gradient(circle at top, rgba(124, 92, 255, 0.14), transparent 22%), linear-gradient(180deg, #fbfbff 0%, #f4f6ff 100%)",
}

export const inner: SxProps<Theme> = {
    width: "100%",
    minHeight: "100vh",
    mx: "auto",
    px: { xs: 2, sm: 3 },
    pb: 3,

}

export const main: SxProps<Theme> = {
    width: { xs: "100%", md: "70%" },
    gap: { xs: 2.75, sm: 4 },
    justifyContent: "center",
    flex: 1,
    pb: { xs: 3.5, sm: 5 },
    marginInline: "auto",
}

export const titulo: SxProps<Theme> = {
    fontSize: "clamp(2.25rem, 9vw, 4.5rem)",
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: "#191d2b",
}

export const subtitulo: SxProps<Theme> = {
    maxWidth: 720,
    fontSize: { xs: "1rem", sm: "1.12rem" },
    lineHeight: { xs: 1.65, sm: 1.9 },
    color: "#515d7d",
}