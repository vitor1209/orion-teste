import type { SxProps, Theme } from "@mui/material"

export const abas: SxProps<Theme> = {
    width: "100%",
    minHeight: "auto",
    padding: "5px",
    borderRadius: "999px",
    backgroundColor: "rgba(219, 222, 230, 0.72)",
    boxShadow: "inset 0 2px 10px rgba(15, 23, 42, 0.1)",

    "& .MuiTabs-indicator": {
        display: "none",
    },
}

export const aba: SxProps<Theme> = {
    minHeight: 42,
    height: 42,
    borderRadius: "999px",
    color: "#9a5cff",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    fontWeight: 800,
    textTransform: "none",
    transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",

    "&:hover": {
        color: "#7c3aed",
        backgroundColor: "rgba(255, 255, 255, 0.48)",
    },

    "&.Mui-selected": {
        color: "#ffffff",
        background: "linear-gradient(90deg, #b55cff, #8b5cf6)",
        boxShadow: "0 8px 18px rgba(139, 92, 246, 0.28)",
    },
}
