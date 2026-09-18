import { ModoJogo } from "./SelecaoModo.types";

export const SUBTITULO_POR_MODO: Record<ModoJogo, string> = {
  [ModoJogo.Livre]:
    "Antes de escolher o instrumento, selecione como deseja praticar no modo livre.",
  [ModoJogo.Guiado]:
    "Antes de escolher o instrumento e selecione como deseja tocar no modo guiado.",
};