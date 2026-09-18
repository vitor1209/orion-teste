import { Box, Typography } from "@mui/material"
import { ShoppingCart } from "lucide-react"
import { FundoEstrelado } from "@/components/FundoEstrelado/FundoEstrelado"
import { GaleriaProduto } from "@/components/GaleriaProduto/GaleriaProduto"
import { ControleQuantidade } from "@/components/ControleQuantidade/ControleQuantidade"
import { Button } from "@/components/Button/Button"
import type { SecaoHeroLojaProps } from "./SecaoHeroLoja.types"
import * as styles from "./SecaoHeroLoja.styles"
export const SecaoHeroLoja = ({
    produto,
    quantidade,
    aoDiminuirQuantidade,
    aoAumentarQuantidade,
    imagemAtiva,
    aoSelecionarImagem,
    aoVoltarImagem,
    aoAvancarImagem,
}: SecaoHeroLojaProps) => {
    const [precoInteiro, precoCentavos] = produto.precoReais.toFixed(2).replace(".", ",").split(",")

    return (
        <FundoEstrelado variante="tela" sx={styles.wrapper}>
            <Box sx={styles.conteudo}>
                <GaleriaProduto
                    imagens={produto.imagens}
                    imagemAtiva={imagemAtiva}
                    aoSelecionarImagem={aoSelecionarImagem}
                    aoVoltarImagem={aoVoltarImagem}
                    aoAvancarImagem={aoAvancarImagem}
                    nomeProduto={produto.nome}
                />

                <Box sx={styles.infoProduto} className="store-info">
                    <Typography sx={styles.titulo}>{produto.nome}</Typography>
                    <Typography sx={styles.descricao}>{produto.descricao}</Typography>

                    <Typography sx={styles.rotuloMateriais}>Materiais</Typography>
                    <Box sx={styles.listaMateriais} aria-label="Materiais disponíveis">
                        {produto.materiais.map((material) => (
                            <Box key={material} sx={styles.circuloMaterial} title={material} />
                        ))}
                    </Box>

                    <Box sx={styles.preco}>
                        <strong>R$</strong>
                        <span>
                            {precoInteiro},{precoCentavos}
                        </span>
                    </Box>

                    <Box sx={styles.acoes}>
                        <ControleQuantidade
                            quantidade={quantidade}
                            aoDiminuir={aoDiminuirQuantidade}
                            aoAumentar={aoAumentarQuantidade}
                        />

                        <Button
                            variante="Gradiente"
                            tamanho="lg"
                            to={`/finalizar-pedido?quantidade=${quantidade}`}
                            icon={ShoppingCart}
                            ladoIcon="direita"
                        >
                            Comprar
                        </Button>
                    </Box>

                    <Typography sx={styles.textoConfianca}>
                        Pagamento seguro via PIX • Entrega estimada em até 7 dias úteis
                    </Typography>
                </Box>
            </Box>
        </FundoEstrelado>
    )
}