import { Box } from "@mui/material"
import cameraIcon from "@/assets/images/camera.png"
import handIcon from "@/assets/images/mao.png"
import { useSelecaoModo } from "./SelecaoModo.hook"
import { SUBTITULO_POR_MODO } from "./SelecaoModo.utils"
import { LayoutPagina } from "../../components/LayoutPagina/LayoutPagina"
import { CardSelecao } from "../../components/CardSelecao/CardSelecao"

export const SelecaoModo = () => {
    const { modo, rotaVoltar, irParaLuva, irParaCamera } = useSelecaoModo()

    return (
        <LayoutPagina
            tagline="PLATAFORMA INTERATIVA MUSICAL"
            rotaVoltar={rotaVoltar}
            titulo="Como deseja tocar?"
            subtitulo={SUBTITULO_POR_MODO[modo]}
        >
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: { xs: 2.75, sm: 4 } }}>
                <CardSelecao
                    titulo="Luva Musical"
                    descricao="Utilize a luva Orion para tocar através dos sensores."
                    icone={handIcon}
                    alt="Luva Musical"
                    variante="modo"
                    aoClicar={irParaLuva}
                />

                <CardSelecao
                    titulo="Câmera"
                    descricao="Utilize suas mãos para tocar através do reconhecimento por câmera."
                    icone={cameraIcon}
                    alt="Câmera"
                    variante="modo"
                    aoClicar={irParaCamera}
                />
            </Box>
        </LayoutPagina>
    )
}
