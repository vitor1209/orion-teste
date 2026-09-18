import { Box } from "@mui/material"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { GaleriaProdutoProps } from "./GaleriaProduto.types"
import * as styles from "./GaleriaProduto.styles"

export const GaleriaProduto = ({
    imagens,
    imagemAtiva,
    aoSelecionarImagem,
    aoVoltarImagem,
    aoAvancarImagem,
    nomeProduto,
}: GaleriaProdutoProps) => {
    return (
        <Box sx={styles.galeria} className="store-gallery-container">
            <Box sx={styles.orbita} className="store-orbit" aria-hidden="true" />

            <Box
                component="img"
                className="store-product-image"
                key={imagemAtiva}
                src={imagens[imagemAtiva]}
                alt={nomeProduto}
                sx={styles.imagemPrincipal}
            />

            <Box sx={styles.carrossel} className="store-gallery" aria-label={`Galeria de imagens de ${nomeProduto}`}>
                <Box
                    component="button"
                    type="button"
                    onClick={aoVoltarImagem}
                    aria-label="Imagem anterior"
                    sx={styles.botaoNavegacao}
                >
                    <ChevronLeft size={20} />
                </Box>

                {imagens.map((imagem, indice) => (
                    <Box
                        key={indice}
                        component="button"
                        type="button"
                        aria-label={`Imagem ${indice + 1}`}
                        aria-pressed={imagemAtiva === indice}
                        onClick={() => aoSelecionarImagem(indice)}
                        sx={styles.miniatura(imagemAtiva === indice)}
                    >
                        <img src={imagem} alt="" />
                    </Box>
                ))}

                <Box
                    component="button"
                    type="button"
                    onClick={aoAvancarImagem}
                    aria-label="Próxima imagem"
                    sx={styles.botaoNavegacao}
                >
                    <ChevronRight size={20} />
                </Box>
            </Box>
        </Box>
    )
}