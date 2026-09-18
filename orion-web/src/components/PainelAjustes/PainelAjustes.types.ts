import type { MouseEvent } from "react"
import type { Oitava } from "../../pages/PraticaLivre/Luva/Luva.types"


export type PainelAjustesProps = {
    oitava: Oitava
    aoAlterarOitava: (evento: MouseEvent<HTMLElement>, novaOitava: Oitava | null) => void
    conectado: boolean
    aoAlternarConexao: () => void
}