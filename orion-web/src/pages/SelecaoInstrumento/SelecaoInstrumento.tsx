import { CardSelecao } from "../../components/CardSelecao/CardSelecao"
import { GradeCards } from "../../components/GradeCards/GradeCards"
import { LayoutPagina } from "../../components/LayoutPagina/LayoutPagina"
import { useSelecaoInstrumento } from "./SelecaoInstrumento.hook"

export const SelecaoInstrumento = () => {
    const { subtitulo, rotaVoltar, instrumentos, selecionarInstrumento } = useSelecaoInstrumento()

    return (
        <LayoutPagina tagline="PLATAFORMA INTERATIVA MUSICAL" rotaVoltar={rotaVoltar} titulo="Seja bem-vindo!" subtitulo={subtitulo} >
            <GradeCards>
                {instrumentos.map((instrumento) => (
                    <CardSelecao
                        key={instrumento.titulo}
                        variante="instrumento"
                        titulo={instrumento.titulo}
                        descricao={instrumento.descricao}
                        icone={instrumento.imagem}
                        alt={instrumento.titulo}
                        larguraImagem={instrumento.larguraImagem}
                        aoClicar={() => selecionarInstrumento(instrumento.titulo)}
                    />
                ))}
            </GradeCards>
        </LayoutPagina>
    )
}