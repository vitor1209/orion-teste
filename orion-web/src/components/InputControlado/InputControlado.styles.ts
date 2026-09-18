import type { SxProps, Theme } from "@mui/material"

export const rotulo: SxProps<Theme> = {
    marginBottom: "7px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.82rem",
    fontWeight: 600,
}

export const campo: SxProps<Theme> = {
    width: "100%",

    "& .MuiOutlinedInput-root": {
        height: 46,
        borderRadius: "33px",
        fontFamily: '"Ubuntu", "Inter", sans-serif',
        backgroundColor: "#ffffff",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",

        "& fieldset": {
            borderColor: "#8eaaff",
        },

        "&:hover fieldset, &.Mui-focused fieldset": {
            borderColor: "#8b6cff",
        },

        "&.Mui-focused": {
            boxShadow: "0 8px 18px rgba(142, 170, 255, 0.18)",
            transform: "translateY(-1px)",
        },
    },

    "& .MuiFormHelperText-root": {
        marginLeft: "12px",
        fontFamily: '"Ubuntu", "Inter", sans-serif',
        fontSize: "0.72rem",
    },


}
