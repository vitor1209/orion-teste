import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const useHome = () => {
    const homeRef = useRef<HTMLDivElement | null>(null)

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    useEffect(() => {
        if (!homeRef.current) {
            return
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) {
            return
        }

        const context = gsap.context(() => {
            gsap.set(
                [".home-hero-title", ".home-hero-description", ".home-hero-actions", ".home-hero-image"],
                { opacity: 0, y: 32 }
            )

            gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .to(".home-hero-title", { opacity: 1, y: 0, duration: 0.9 })
                .to(".home-hero-description", { opacity: 1, y: 0, duration: 0.75 }, "-=0.45")
                .to(".home-hero-actions", { opacity: 1, y: 0, duration: 0.65 }, "-=0.35")
                .to(".home-hero-image", { opacity: 1, y: 0, duration: 1 }, "-=0.75")

            gsap.to(".home-hero-image", {
                yPercent: 8,
                rotate: 1.5,
                ease: "none",
                scrollTrigger: {
                    trigger: ".home-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.1,
                },
            })

            gsap.utils.toArray<HTMLElement>(".home-reveal").forEach((element) => {
                gsap.from(element, {
                    opacity: 0,
                    y: 56,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 82%",
                        toggleActions: "play none none reverse",
                    },
                })
            })

            gsap.from(".home-step-card", {
                opacity: 0,
                y: 42,
                scale: 0.96,
                duration: 0.75,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".home-steps-grid",
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            })

            gsap.from(".home-practice-content > *", {
                opacity: 0,
                y: 34,
                duration: 0.75,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".home-practice-section",
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            })

            gsap.utils.toArray<HTMLElement>(".home-feature-item").forEach((item) => {
                const reverse = item.dataset.reverse === "true"

                gsap.from(item.querySelector(".home-feature-text"), {
                    opacity: 0,
                    x: reverse ? 56 : -56,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 76%",
                        toggleActions: "play none none reverse",
                    },
                })

                gsap.from(item.querySelector(".home-feature-image"), {
                    opacity: 0,
                    x: reverse ? -56 : 56,
                    scale: 0.96,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 76%",
                        toggleActions: "play none none reverse",
                    },
                })
            })
        }, homeRef)

        return () => context.revert()
    }, [])

    return { homeRef, scrollToSection }
}