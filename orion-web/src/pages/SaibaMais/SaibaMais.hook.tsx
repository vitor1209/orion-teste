import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const useSaibaMais = () => {
    const pageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!pageRef.current) return

        const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefereMovimentoReduzido) return

        const contexto = gsap.context(() => {
            gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .from(".saiba-hero-copy > *", { opacity: 0, y: 34, duration: 0.75, stagger: 0.1 })
                .from(".saiba-hero-divider", { opacity: 0, scaleX: 0.72, duration: 0.55 }, "-=0.2")

            gsap.utils.toArray<HTMLElement>(".saiba-reveal").forEach((elemento) => {
                gsap.from(elemento, {
                    opacity: 0,
                    y: 48,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: elemento, start: "top 82%", toggleActions: "play none none reverse" },
                })
            })

            gsap.from(".saiba-pillar-card", {
                opacity: 0,
                y: 42,
                scale: 0.96,
                duration: 0.72,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: { trigger: ".saiba-pillars-grid", start: "top 78%", toggleActions: "play none none reverse" },
            })

            gsap.from(".saiba-step-item", {
                opacity: 0,
                x: 34,
                duration: 0.65,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".saiba-step-list", start: "top 78%", toggleActions: "play none none reverse" },
            })
        }, pageRef)

        return () => contexto.revert()
    }, [])

    return { pageRef }
}