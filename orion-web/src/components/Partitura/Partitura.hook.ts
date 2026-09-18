import { useEffect, useRef, useState } from "react";
import type { NotaComOitava } from "../../utils/Notas.types";
import type { StatusNotaPartitura } from "./Partitura.type";
import { Accidental, Formatter, Renderer, Stave, StaveNote } from "vexflow";

const NOTA_REGEX = /^([A-Ga-g])([#b]?)(\d+)$/;
const COR_NOTA_PROXIMA = "#9e9e9e";
const COR_NOTA_ATIVA = "#7C3AED";
const NOTAS_POR_COMPASSO = 4;
const LARGURA_COMPASSO_INICIAL = 250;
const LARGURA_COMPASSO = 180;
const ALTURA_CONTAINER = 220;

const PX_POR_DEGRAU = 5;
const ALTURA_PENTAGRAMA = 40

const LETRA_VALOR: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
const IDX_LINHA_BAIXO = 4 * 7 + LETRA_VALOR.E; 
const IDX_LINHA_CIMA = 5 * 7 + LETRA_VALOR.F;  

const MARGEM_MINIMA = 30;

const calcularX = (coluna: number, linha: number, larguraCompassoInicial: number, larguraCompasso: number): number => {
	if (linha === 0) {
		return coluna === 0
			? 16
			: larguraCompassoInicial + (coluna - 1) * larguraCompasso + 16;
	}
	return coluna * larguraCompasso + 16;
}

const obterIndiceDiatonico = (letra: string, oitava: number): number => {
	const valorLetra = LETRA_VALOR[letra.toUpperCase()];
	return oitava * 7 + valorLetra;
}

export const usePartitura = (notas: NotaComOitava[], statusNotas?: StatusNotaPartitura[]) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [largura, setLargura] = useState(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new ResizeObserver(([entry]) => {
			if (entry) {
				setLargura(entry.contentRect.width);
			}
		});

		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;

		if (container) container.innerHTML = "";

		if (!container || largura === 0) return;

		const compassosPorLinha = Math.max(
			1,
			Math.floor((largura - LARGURA_COMPASSO_INICIAL) / LARGURA_COMPASSO) + 1
		);

		const compassos: NotaComOitava[][] = [];
		const compassosStatus: (StatusNotaPartitura | undefined)[][] = [];
		for (let i = 0; i < Math.max(notas.length, 1); i += NOTAS_POR_COMPASSO) {
			compassos.push(notas.slice(i, i + NOTAS_POR_COMPASSO));
			compassosStatus.push((statusNotas ?? []).slice(i, i + NOTAS_POR_COMPASSO));
		}

		let idxMax = IDX_LINHA_CIMA;
		let idxMin = IDX_LINHA_BAIXO;

		notas.forEach((nota) => {
			if (typeof nota !== "string") return;
			const match = nota.match(NOTA_REGEX);
			if (!match) return;

			const [, letter, , octave] = match;
			const idx = obterIndiceDiatonico(letter, Number(octave));

			if (idx > idxMax) idxMax = idx;
			if (idx < idxMin) idxMin = idx;
		});

		const margemAcima = Math.max(0, idxMax - IDX_LINHA_CIMA) * PX_POR_DEGRAU + MARGEM_MINIMA;
		const margemAbaixo = Math.max(0, IDX_LINHA_BAIXO - idxMin) * PX_POR_DEGRAU + MARGEM_MINIMA;

		const alturaLinha = margemAcima + ALTURA_PENTAGRAMA + margemAbaixo;

		const totalLinhas = Math.ceil(compassos.length / compassosPorLinha);
		const totalAltura = Math.max(
			ALTURA_CONTAINER,
			margemAcima + totalLinhas * alturaLinha
		);

		try {
			const renderer = new Renderer(container, Renderer.Backends.SVG);
			renderer.resize(largura, totalAltura);
			const contexto = renderer.getContext();

			compassos.forEach((notasCompasso, index) => {
				const linha = Math.floor(index / compassosPorLinha);
				const coluna = index % compassosPorLinha;

				const isPrimeiroGlobal = index === 0;
				const isPrimeiroNaLinha = coluna === 0;

				const larguraCompasso =
					isPrimeiroNaLinha && isPrimeiroGlobal
						? LARGURA_COMPASSO_INICIAL
						: LARGURA_COMPASSO;

				const xAtual = calcularX(coluna, linha, LARGURA_COMPASSO_INICIAL, LARGURA_COMPASSO);
				const yAtual = margemAcima + linha * alturaLinha;

				const stave = new Stave(xAtual, yAtual, larguraCompasso);
				if (isPrimeiroNaLinha) stave.addClef("treble");
				if (isPrimeiroGlobal) stave.addTimeSignature("4/4");
				stave.setContext(contexto).draw();

				const statusCompasso = compassosStatus[index] ?? [];

				const staveNotes = notasCompasso
					.map((nota, indiceNaCompasso) => {
						if (typeof nota !== "string") return null;

						const match = nota.match(NOTA_REGEX);
						if (!match) return null;

						const [, letter, accidental, octave] = match;
						const status = statusCompasso[indiceNaCompasso];

						const staveNote = new StaveNote({
							keys: [`${letter.toLowerCase()}${accidental}/${octave}`],
							duration: status === "ativa" ? "h" : "q",
						});

						if (accidental !== "") {
							staveNote.addModifier(new Accidental(accidental), 0);
						}

						if (status === "proxima") {
							staveNote.setStyle({ fillStyle: COR_NOTA_PROXIMA, strokeStyle: COR_NOTA_PROXIMA });
						} else if (status === "ativa") {
							staveNote.setStyle({ fillStyle: COR_NOTA_ATIVA, strokeStyle: COR_NOTA_ATIVA });
						}

						return staveNote;
					})
					.filter((n): n is StaveNote => n !== null);

				if (staveNotes.length === 0) return;

				Formatter.FormatAndDraw(contexto, stave, staveNotes, {
					alignRests: false,
				});
			});
		} catch (err) {
			console.error("[usePartitura] Erro ao renderizar partitura:", err);
			container.innerHTML = "";
		}
	}, [largura, notas, statusNotas]);

	return {
		containerRef,
		largura,
	};
};