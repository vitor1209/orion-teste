const DIMENSOES_VIDEO = {
    width: {
        xs: "min(300px, calc(100vw - 72px))",
        sm: "470px",
        md: "640px",
    },
    height: {
        xs: "auto",
        sm: "340px",
        md: "480px",
    },
    aspectRatio: {
        xs: "10 / 7",
        sm: "auto",
    },
};

export const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        flexDirection: {
            xs: "column",
            md: "column",
        },
        alignItems: "center",
        width: "100%",
        height: {
            xs: "auto",
            md: "65vh",
        },
        gap: 3,
    },

    video: {
        ...DIMENSOES_VIDEO,
        borderRadius: "16px",
        backgroundColor: "black",
    },
    placeholder: {
        ...DIMENSOES_VIDEO,
        borderRadius: "16px",
        border: "2px dashed",
        borderColor: "divider",
        backgroundColor: "rgba(212, 210, 210, 0.85)",
        color: "text.secondary",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        gap: 1,
    },
    placeholderTitle: {
        fontWeight: 700,
        color: "text.primary",
    },
    placeholderText: {
        maxWidth: 280,
    },
    buttons: {
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        flexDirection: {
            xs: "column",
            sm: "row",
        },
        justifyContent: "space-between",
        gap: 2,
    },
    cameraWrapper: {
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#d9d9d9",
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};
