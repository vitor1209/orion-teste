import type { SxProps, Theme } from "@mui/material"
import fundoNotas from "@/assets/images/fundo_notas.png"

export const painel: SxProps<Theme> = {
    width: { xs: "100%", md: "30%" },
    bgcolor: "#F8FAFF",
    border: "#ECECEC 2px solid",
}

export const conteudo: SxProps<Theme> = {
    p: { xs: "24px 20px 0", md: "15% 15% 0 15%" },
}

export const grupoOitavas: SxProps<Theme> = {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    "& .MuiToggleButton-root": {
        flex: "0 0 calc(25% - 6px)",
        boxSizing: "border-box",
        border: "none",
        borderRadius: "999px",
        height: 32,
        textTransform: "none",
        color: "white",
        background: "linear-gradient(90deg, #BDBDBD 0%, #9E9E9E 100%)",
        "&:hover": {
            background: "linear-gradient(90deg, #A8A8A8 0%, #8F8F8F 100%)",
        },
        "&.Mui-selected": {
            color: "white",
            background: "linear-gradient(90deg, #9C4DFF 0%, #6C8DFF 100%)",
            transition: "background 5s",
        },
        "&.Mui-selected:hover": {
            background: "linear-gradient(90deg, #8A40F5 0%, #5D80FF 100%)",
        },
    },
}

export const fundo: SxProps<Theme> = {
    flex: 1,
    minHeight: { xs: 120, md: "auto" },
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundImage: `url(${fundoNotas})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
}