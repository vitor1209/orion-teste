import { Box } from "@mui/material"
import { Navbar } from "@/components/Navbar/Navbar"
import { Footer } from "@/components/Footer/Footer"

import { useLoja } from "./Loja.hook"
import * as styles from "./Loja.styles"
import { SecaoHeroLoja } from "./components/SecaoHeroLoja/SecaoHeroLoja"
import { SecaoBeneficiosLoja } from "./components/SecaoBeneficiosLoja/SecaoBeneficiosLoja"

export const Loja = () => {
    const {
        pageRef,
        produto,
        isLoading,
        quantidade,
        diminuirQuantidade,
        aumentarQuantidade,
        imagemAtiva,
        setImagemAtiva,
        voltarImagem,
        avancarImagem,
    } = useLoja()

    if (isLoading || !produto) {
        return null
    }

    return (
        <Box ref={pageRef} sx={styles.pagina}>
            <Navbar escuroNoTopo />

            <SecaoHeroLoja
                produto={produto}
                quantidade={quantidade}
                aoDiminuirQuantidade={diminuirQuantidade}
                aoAumentarQuantidade={aumentarQuantidade}
                imagemAtiva={imagemAtiva}
                aoSelecionarImagem={setImagemAtiva}
                aoVoltarImagem={voltarImagem}
                aoAvancarImagem={avancarImagem}
            />

            <SecaoBeneficiosLoja />

            <Footer />
        </Box>
    )
}