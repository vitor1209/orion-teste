/* eslint-disable react-hooks/set-state-in-effect */
import { Enum } from "../../utils/Enums";
import type { ResponseWs } from "./useNotes.types";
import { useEffect, useRef, useState } from "react";
import type { NotaComOitava } from "../../utils/Notas.types";
import { montarUrlWebSocket } from "@/utils/sessaoWebSocket";

export const useNotes = (ativo: boolean) => {
    const wsRef = useRef<WebSocket | null>(null);
    const [notas, setNotas] = useState<NotaComOitava[]>([]);
    const [statusConexao, setStatusConexao] = useState<Enum.TipoConexao>(Enum.TipoConexao.FECHADO);

    function limparNotas() {
        setNotas([]);
    }

    function removerUltimaNota() {
        setNotas((prev) => prev.slice(0, -1));
    }

    useEffect(() => {
        if (!ativo) {
            wsRef.current?.close();
            wsRef.current = null;
            setStatusConexao(Enum.TipoConexao.FECHADO);
            return;
        }

        let ignorar = false;

        const ws = new WebSocket(montarUrlWebSocket("/api/v1/ws"));
        wsRef.current = ws;

        ws.onopen = () => {
            if (!ignorar) setStatusConexao(Enum.TipoConexao.ABERTO);
        };
        ws.onclose = () => {
            if (!ignorar) setStatusConexao(Enum.TipoConexao.FECHADO);
        };
        ws.onerror = () => {
            if (!ignorar) setStatusConexao(Enum.TipoConexao.ERRO);
        };
        ws.onmessage = (event) => {
            if (ignorar) return;
            const parsed: ResponseWs = JSON.parse(event.data);
            if (parsed.nota) {
                setNotas((prev) => [...prev, parsed.nota!]);
            }
        };

        return () => {
            ignorar = true;
            ws.close();
            wsRef.current = null;
        }

    }, [ativo],);

    return {
        listaNotas: notas,
        limparNotas,
        removerUltimaNota,
        ultimaNota: notas[notas.length - 1],
        statusConexao: Enum.TipoConexao[statusConexao],
    };
}
