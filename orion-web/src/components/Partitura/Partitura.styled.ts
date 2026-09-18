export const styles = {

    container: {
        flexDirection: { xs: "column", sm: "row" },
		alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
        padding:"2 0",
    },

    botoes: {
        justifyContent: "center",
    },

    header: {
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: 1,
    },

    score: {
        flex: 1,
        width: "100%",
        minHeight: "220px",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    scoreEmpty: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "text.secondary",
        pointerEvents: "none",
        px: 2,
    },
    
    svg: {
        width: "100%",
        "& svg": {
            display: "block",
            margin: "auto",
        },
    },

    title: {
        fontWeight: 700,
    },
};
