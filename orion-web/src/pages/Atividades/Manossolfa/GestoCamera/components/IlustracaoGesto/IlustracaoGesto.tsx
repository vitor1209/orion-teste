import { Box } from "@mui/material"
import { Repeat } from "lucide-react"
import { useRef } from "react"
import maoPlaceholder from "@/assets/images/mao.png"
import * as styles from "./IlustracaoGesto.styles"
import { Button } from "@/components/Button/Button"

export type IlustracaoGestoProps = {
    variante: "estatica" | "loop" | "miniatura"
    onClick?: () => void
    imagem?: string
    video?: string
}

export const IlustracaoGesto = ({
    variante,
    onClick,
    imagem,
    video,
}: IlustracaoGestoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    const repetirVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        }

        onClick?.()
    }

    return (
        <Box sx={styles.container(variante)}>
            {video ? (
                <Box
                    ref={videoRef}
                    component="video"
                    src={video}
                    muted
                    playsInline
                    autoPlay
                    sx={styles.imagem(variante)}
                />
            ) : (
                <Box
                    component="img"
                    src={imagem ?? maoPlaceholder}
                    sx={styles.imagem(variante)}
                />
            )}

            {variante === "loop" && video && (
                <Button
                    onClick={repetirVideo}
                    tamanho="sm"
                    variante="Icone"
                    icon={Repeat}
                    sx={styles.distintivoLoop}
                />
            )}
        </Box>
    )
}