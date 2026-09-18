import { Stack, Typography } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { Piano } from "react-piano"
import "react-piano/dist/styles.css"

import type { CartaoPianoProps } from "./CartaoPiano.types"
import { cartao, eyebrow, subtitulo, titulo } from "./CartaoPiano.styles"
import { useCartaoPiano } from "./CartaoPiano.hook"
import "../../stylesPiano.css"

export const CartaoPiano = ({ oitava, primeiraNota, ultimaNota, larguraPiano, notaAtiva, aoTocarNota }: CartaoPianoProps) => {
    const { cartaoRef, larguraTeclado } = useCartaoPiano(larguraPiano)

    return (
        <Stack ref={cartaoRef} sx={cartao}>
            <Typography sx={eyebrow}>Modo Livre</Typography>
            <Typography sx={titulo}>Correspondência da Partitura</Typography>
            <Typography sx={subtitulo}>
                Com base nos ensinamentos da parte teórica, toque com sua luva as notas correspondentes dessa partitura
            </Typography>

            <AnimatePresence mode="wait">
                <motion.div
                    key={oitava}
                    initial={{ opacity: 0, scale: 0.98, filter: "brightness(1)" }}
                    animate={{ opacity: 1, scale: 1, filter: ["brightness(1)", "brightness(1.12)", "brightness(1)"] }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="luva-piano-wrapper">
                        <Piano
                            key={oitava}
                            noteRange={{ first: primeiraNota, last: ultimaNota }}
                            playNote={aoTocarNota}
                            stopNote={() => {}}
                            activeNotes={notaAtiva !== null ? [notaAtiva] : []}
                            width={larguraTeclado}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </Stack>
    )
}