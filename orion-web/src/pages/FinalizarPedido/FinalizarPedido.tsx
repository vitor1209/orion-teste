import { Controller } from "react-hook-form"
import { Box, Radio, Stack, Typography } from "@mui/material"
import { Navbar } from "@/components/Navbar/Navbar"
import { Footer } from "@/components/Footer/Footer"
import { InputControlado } from "@/components/InputControlado/InputControlado"
import pixIcon from "@/assets/images/pix icon.png"
import { useFinalizarPedido } from "./FinalizarPedido.hook"
import { ResumoPedido } from "./components/ResumoPedido/ResumoPedido"
import { ModalPedidoConcluido } from "./modais/ModalPedidoConcluido/ModalPedidoConcluido"
import * as styles from "./FinalizarPedido.styles"
import { CAMPOS_CADASTRO, CAMPOS_ENDERECO } from "./FinalizarPedido.utils"
import { CardSecao } from "@/components/CardSecao/CardSecao"


export const FinalizarPedido = () => {
    const {
        pageRef,
        control,
        errors,
        handleSubmit,
        finalizarPedido,
        isSubmitting,
        isValid,
        resumo,
        isLoading,
        quantidade,
        diminuirQuantidade,
        aumentarQuantidade,
        valoresResumo,
        total,
        compraFinalizada,
        fecharModalPedidoConcluido,
    } = useFinalizarPedido()

    if (isLoading || !resumo) {
        return null
    }

    return (
        <Box ref={pageRef} sx={styles.pagina}>
            <Navbar />

            <Box component="main" sx={styles.conteudoPrincipal}>
                <Box component="form" onSubmit={handleSubmit(finalizarPedido)} sx={styles.grade}>
                    <Box>
                        <Typography className="checkout-breadcrumb" sx={styles.migalha}>
                            Loja &gt; Finalizar Pedido
                        </Typography>

                        <CardSecao mostrarAvatar={false} titulo="Finalizar cadastro" className="checkout-card">
                            <Box sx={styles.gradeCadastro}>
                                {CAMPOS_CADASTRO.map((campo) => (
                                    <InputControlado key={campo.name} {...campo} control={control} errors={errors} />
                                ))}
                            </Box>
                        </CardSecao>

                        <CardSecao mostrarAvatar={false} titulo="Endereço de entrega" className="checkout-card">
                            <Box sx={styles.gradeEndereco}>
                                {CAMPOS_ENDERECO.map((campo) => (
                                    <InputControlado key={campo.name} {...campo} control={control} errors={errors} />
                                ))}
                            </Box>
                        </CardSecao>

                        <CardSecao titulo="Método de pagamento" className="checkout-card">
                            <Controller
                                control={control}
                                name="metodoPagamento"
                                render={({ field }) => (
                                    <>
                                        <Stack
                                            sx={styles.opcaoPagamento}
                                            role="radio"
                                            aria-checked={field.value === "pix"}
                                            tabIndex={0}
                                            onClick={() => field.onChange("pix")}
                                            onKeyDown={(evento) => {
                                                if (evento.key === "Enter" || evento.key === " ") {
                                                    evento.preventDefault()
                                                    field.onChange("pix")
                                                }
                                            }}
                                        >
                                            <Radio
                                                size="small"
                                                checked={field.value === "pix"}
                                                onChange={() => field.onChange("pix")}
                                            />
                                            <Box component="img" src={pixIcon} alt="Pix" sx={styles.iconePagamento} />
                                            <Stack spacing={0.2}>
                                                <Typography sx={styles.nomePagamento}>PIX</Typography>
                                                <Typography sx={styles.descricaoPagamento}>Aprovação imediata</Typography>
                                            </Stack>
                                        </Stack>

                                        {errors.metodoPagamento?.message && (
                                            <Typography sx={styles.mensagemErroPagamento}>
                                                {errors.metodoPagamento.message}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            />
                        </CardSecao>
                    </Box>

                    <ResumoPedido
                        produto={resumo.produto}
                        quantidade={quantidade}
                        aoDiminuirQuantidade={diminuirQuantidade}
                        aoAumentarQuantidade={aumentarQuantidade}
                        valoresResumo={valoresResumo}
                        total={total}
                        isSubmitting={isSubmitting}
                        isValid={isValid}
                    />
                </Box>
            </Box>

            <Footer />

            <ModalPedidoConcluido aberto={compraFinalizada} aoFechar={fecharModalPedidoConcluido} />
        </Box>
    )
}
