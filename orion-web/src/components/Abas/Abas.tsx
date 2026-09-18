import { Tab, Tabs } from "@mui/material"
import type { AbasProps } from "./Abas.types"
import * as styles from "./Abas.styles"

export const Abas = <TValor extends string>({ abas, valorSelecionado, aoAlterar, sx }: AbasProps<TValor>) => {
    return (
        <Tabs
            value={valorSelecionado}
            onChange={(_evento, valor: TValor) => aoAlterar(valor)}
            variant="fullWidth"
            sx={[styles.abas, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        >
            {abas.map((item) => (
                <Tab key={item.valor} value={item.valor} label={item.rotulo} sx={styles.aba} disableRipple />
            ))}
        </Tabs>
    )
}
