import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import gsap from "gsap"
import { useEnviarPedido, useObterProdutoPedido } from "@/api/Controllers/FinalizarPedido"
import { finalizarPedidoSchema, formatarMoeda } from "@/utils/validacoes"
import type { FinalizarPedidoSchema } from "./FinalizarPedido.types"

export const useFinalizarPedido = () => {
    const [searchParams] = useSearchParams()
    const quantidadeParam = Number(searchParams.get("quantidade"))
    const quantidadeInicial = Number.isFinite(quantidadeParam) && quantidadeParam > 0 ? quantidadeParam : 1

    const [quantidade, setQuantidade] = useState(quantidadeInicial)
    const [compraFinalizada, setCompraFinalizada] = useState(false)

    const pageRef = useRef<HTMLDivElement | null>(null)

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FinalizarPedidoSchema>({
        resolver: zodResolver(finalizarPedidoSchema),
        mode: "onChange",
        defaultValues: {
            nomeCompleto: "",
            cpf: "",
            cep: "",
            endereco: "",
            numero: "",
            bairro: "",
            cidade: "",
            estado: "",
            metodoPagamento: "pix",
        },
    })

    const { data: resumo, isLoading } = useObterProdutoPedido()
    const { mutateAsync: enviarPedido } = useEnviarPedido()

    const subtotal = (resumo?.produto.precoUnitario ?? 0) * quantidade
    const frete = resumo?.frete ?? 0
    const desconto = resumo?.desconto ?? 0
    const total = subtotal - desconto + frete

    const valoresResumo = [
        { label: "Subtotal", valor: formatarMoeda(subtotal) },
        { label: "Desconto", valor: formatarMoeda(desconto) },
        { label: "Frete", valor: formatarMoeda(frete) },
    ]

    const diminuirQuantidade = () => {
        setQuantidade((valorAtual) => Math.max(1, valorAtual - 1))
    }

    const aumentarQuantidade = () => {
        setQuantidade((valorAtual) => valorAtual + 1)
    }

    const finalizarPedido = async (dados: FinalizarPedidoSchema) => {
        await enviarPedido({ ...dados, quantidade })
        setCompraFinalizada(true)
    }

    const fecharModalPedidoConcluido = () => setCompraFinalizada(false)

    useEffect(() => {
        if (!pageRef.current) {
            return
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            return
        }

        const context = gsap.context(() => {
            gsap.from(".checkout-breadcrumb", { opacity: 0, y: 16, duration: 0.55, ease: "power3.out" })

            gsap.from(".checkout-card", {
                opacity: 0,
                y: 34,
                scale: 0.985,
                duration: 0.72,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.08,
            })

            gsap.from(".checkout-summary", {
                opacity: 0,
                x: 44,
                scale: 0.98,
                duration: 0.85,
                ease: "power3.out",
                delay: 0.18,
            })
        }, pageRef)

        return () => context.revert()
    }, [])

    return {
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
        total: formatarMoeda(total),
        compraFinalizada,
        fecharModalPedidoConcluido,
    }
}
