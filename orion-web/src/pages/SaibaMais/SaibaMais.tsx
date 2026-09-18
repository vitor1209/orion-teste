import { Box } from "@mui/material"
import { useSaibaMais } from "./SaibaMais.hook"
import { ETAPAS, PILARES } from "./SaibaMais.utils"
import { PilaresSaibaMais } from "./components/PilaresSaibaMais/PilaresSaibaMais"
import { HeroSaibaMais } from "./components/HeroSaibaMais/HeroSaibaMais"
import { Navbar } from "../../components/Navbar/Navbar"
import { JornadaSaibaMais } from "./components/JornadaSaibaMais/JornadaSaibaMais"
import { CtaFinalSaibaMais } from "./components/CtaFinalSaibaMais/CtaFinalSaibaMais"
import { Footer } from "../../components/Footer/Footer"

export const SaibaMais = () => {
    const { pageRef } = useSaibaMais()

    return (
        <Box ref={pageRef} sx={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#080a14", overflowX: "hidden" }}>
            <Navbar escuroNoTopo />

            <HeroSaibaMais />
            <PilaresSaibaMais pilares={PILARES} />
            <JornadaSaibaMais etapas={ETAPAS} />
            <CtaFinalSaibaMais />

            <Footer />
        </Box>
    )
}