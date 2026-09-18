import type { NotaComOitava } from "../../utils/Notas.types";

export type StatusNotaPartitura = "ativa" | "proxima" | "concluida";

export type PartituraProps = {
    notas?: NotaComOitava[];
    statusNotas?: StatusNotaPartitura[];
    onClear?: () => void;
    onRemoverUltimaNota?: () => void;
};
