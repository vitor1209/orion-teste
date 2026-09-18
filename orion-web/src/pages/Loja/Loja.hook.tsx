import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useObterProduto } from "@/api/Controllers/Loja"

gsap.registerPlugin(ScrollTrigger)

export const useLoja = () => {
    const pageRef = useRef<HTMLDivElement | null>(null)
    const [quantidade, setQuantidade] = useState(1)
    const [imagemAtiva, setImagemAtiva] = useState(0)

    const { data: produto, isLoading } = useObterProduto()

    const diminuirQuantidade = () => {
        setQuantidade((valorAtual) => Math.max(1, valorAtual - 1))
    }

    const aumentarQuantidade = () => {
        setQuantidade((valorAtual) => valorAtual + 1)
    }

    const voltarImagem = () => {
        if (!produto) return
        setImagemAtiva((indiceAtual) => (indiceAtual === 0 ? produto.imagens.length - 1 : indiceAtual - 1))
    }

    const avancarImagem = () => {
        if (!produto) return
        setImagemAtiva((indiceAtual) => (indiceAtual === produto.imagens.length - 1 ? 0 : indiceAtual + 1))
    }

    useEffect(() => {
        if (!pageRef.current || !produto) {
            return
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            return
        }

        const context = gsap.context(() => {
            const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })

            introTimeline
                .from(".store-orbit", { opacity: 0, scale: 0.72, rotate: -28, duration: 0.9 })
                .from(".store-product-image", { opacity: 0, y: 42, scale: 0.9, duration: 0.85 }, "-=0.58")
                .from(".store-gallery", { opacity: 0, y: 28, scale: 0.96, duration: 0.58 }, "-=0.34")
                .from(".store-info > *", { opacity: 0, x: 34, duration: 0.58, stagger: 0.08 }, "-=0.62")

            gsap.to(".store-product-image", {
                y: -12,
                duration: 3.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })

            gsap.from(".store-benefits-header > *", {
                scrollTrigger: { trigger: ".store-benefits-header", start: "top 82%" },
                opacity: 0,
                y: 24,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
            })

            gsap.from(".store-benefit-card", {
                scrollTrigger: { trigger: ".store-benefits-grid", start: "top 82%" },
                opacity: 0,
                y: 34,
                scale: 0.96,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
            })
        }, pageRef)

        return () => context.revert()
    }, [produto])

    return {
        pageRef,
        produto,
        isLoading,
        quantidade,
        diminuirQuantidade,
        aumentarQuantidade,
        imagemAtiva,
        setImagemAtiva,
        voltarImagem,
        avancarImagem,
    }
}