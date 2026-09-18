import { Box } from "@mui/material"
import { useHome } from "./Home.hook"
import * as styles from "./Home.styles"
import { Navbar } from "../../components/Navbar/Navbar"
import { SecaoHero } from "./components/SecaoHero/SecaoHero"
import { SecaoComoFunciona } from "./components/SecaoComoFunciona/SecaoComoFunciona"
import { SecaoPratique } from "./components/SecaoPratique/SecaoPratique"
import { SecaoProposito } from "./components/SecaoProposito/SecaoProposito"
import { Footer } from "../../components/Footer/Footer"

export const Home = () => {
    const { homeRef, scrollToSection } = useHome()

    return (
        <Box ref={homeRef} sx={styles.raiz}>
            <Navbar escuroNoTopo />

            <SecaoHero
                aoClicarComoFunciona={() => scrollToSection("como-funciona")}
                aoClicarPratique={() => scrollToSection("pratique")}
            />

            <SecaoComoFunciona />
            <SecaoPratique />
            <SecaoProposito />

            <Footer />
        </Box>
    )
}