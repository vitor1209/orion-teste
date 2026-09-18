import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { MAPA_AUDIO_NOTAS_PIANO } from "./useNotasSound.utils";
import type { UseNotaSoundProps } from "./useNotasSound.types";

export const useNotaSound = ({ notas }: UseNotaSoundProps) => {
    const [tocando, setTocando] = useState(false);

    const samplerRef = useRef<Tone.Sampler | null>(null);
    const parteRef = useRef<Tone.Part<{ time: number, nota: string }> | null>(null);

    const pararPartitura = () => {
        parteRef.current?.stop();
        parteRef.current?.dispose();
        parteRef.current = null;
        Tone.getTransport().stop();
        Tone.getTransport().cancel();
        samplerRef.current?.releaseAll();
        setTocando(false);
    }

    const tocarPartitura = async () => {
        if (tocando) {
            pararPartitura();
            return;
        }

        if (!notas) return;
        if (!samplerRef.current?.loaded) return;

        const lista = (Array.isArray(notas) ? notas : [notas])
            .filter(nota => MAPA_AUDIO_NOTAS_PIANO[nota]);

        if (!lista.length) return;

        await Tone.start();

        const duracaoNota = Tone.Time("4n").toSeconds();
        const duracaoTotal = lista.length * duracaoNota;

        const parte = new Tone.Part<{ time: number, nota: string }>((tempo, evento) => {
            samplerRef.current?.triggerAttackRelease(evento.nota, duracaoNota, tempo);
        }, lista.map((nota, index) => ({ time: index * duracaoNota, nota }))).start(0);

        parte.stop(duracaoTotal);
        parteRef.current = parte;

        Tone.getTransport().scheduleOnce(pararPartitura, duracaoTotal);

        setTocando(true);
        Tone.getTransport().start();
    }

    useEffect(() => {
        samplerRef.current = new Tone.Sampler({
            urls: MAPA_AUDIO_NOTAS_PIANO,
            release: 1,
        }).toDestination();

        return () => {
            parteRef.current?.dispose();
            samplerRef.current?.dispose();
            samplerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!notas) return;
        if (!samplerRef.current?.loaded) return;
        if (Array.isArray(notas)) return;

        const notaKey = notas as keyof typeof MAPA_AUDIO_NOTAS_PIANO;
        if (!MAPA_AUDIO_NOTAS_PIANO[notaKey]) return;

        samplerRef.current.triggerAttackRelease(notaKey as string, "4n");
    }, [notas]);

    const play = async (notaOuNotas: UseNotaSoundProps['notas']) => {
        if (!notaOuNotas) return;
        try {
            await Tone.start();
        } catch {
        }
        if (!samplerRef.current?.loaded) return;

        const lista = (Array.isArray(notaOuNotas) ? notaOuNotas : [notaOuNotas])
            .filter(n => MAPA_AUDIO_NOTAS_PIANO[n as keyof typeof MAPA_AUDIO_NOTAS_PIANO]);

        if (!lista.length) return;

        const duracaoNota = Tone.Time("4n").toSeconds();

        lista.forEach((n, i) => {
            samplerRef.current!.triggerAttackRelease(n as string, duracaoNota, Tone.now() + i * duracaoNota);
        });
    };

    return { tocarPartitura, tocando, play };
};