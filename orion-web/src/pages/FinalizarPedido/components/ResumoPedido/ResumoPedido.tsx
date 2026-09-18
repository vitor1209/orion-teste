import { Box, Stack, Typography } from "@mui/material"
import { Button } from "@/components/Button/Button"
import { ControleQuantidade } from "@/components/ControleQuantidade/ControleQuantidade"
import type { ResumoPedidoProps } from "@/pages/FinalizarPedido/FinalizarPedido.types"
import { formatarMoeda } from "@/utils/validacoes"
import * as styles from "./ResumoPedido.styles"

export const ResumoPedido = ({
    produto,
    quantidade,
    aoDiminuirQuantidade,
    aoAumentarQuantidade,
    valoresResumo,
    total,
    isSubmitting,
    isValid,
}: ResumoPedidoProps) => {
    return (
        <Stack sx={styles.cartao} className="checkout-summary">
            <Typography sx={styles.titulo}>Produtos</Typography>

            <Box sx={styles.linhaProduto}>
                <Box sx={styles.caixaImagem}>
                    <Box component="img" src={produto.imagem} alt={produto.nome} sx={styles.imagem} />
                </Box>

                <Stack>
                    <Typography sx={styles.nomeProduto}>{produto.nome}</Typography>
                    <Typography sx={styles.removerProduto}>X Remove</Typography>
                </Stack>

                <Box sx={styles.precoProduto}>
                    <span>{formatarMoeda(produto.precoUnitario)}</span>
                    <ControleQuantidade
                        variante="compacto"
                        quantidade={quantidade}
                        aoDiminuir={aoDiminuirQuantidade}
                        aoAumentar={aoAumentarQuantidade}
                        desabilitarDiminuir={quantidade === 1}
                        ariaLabel="Selecionar quantidade de luvas"
                    />
                </Box>
            </Box>

            <Box sx={styles.divisor} />

            <Stack sx={styles.listaValores}>
                {valoresResumo.map((item) => (
                    <Box key={item.label} sx={styles.linhaValor}>
                        <span>{item.label}</span>
                        <strong>{item.valor}</strong>
                    </Box>
                ))}
            </Stack>

            <Box sx={styles.divisor} />

            <Box sx={styles.linhaTotal}>
                <span>Total</span>
                <strong>{total}</strong>
            </Box>

            <Button type="submit" variante="Finalizar" tamanho="lg" ativo={isValid} disabled={isSubmitting}>
                {isSubmitting ? "Finalizando..." : "Finalizar"}
            </Button>
        </Stack>
    )
}
