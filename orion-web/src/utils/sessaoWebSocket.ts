import { api } from "@/api/Axios";

const CHAVE_SESSAO = "orion_sessao";

const BASE_URL_WS = (api.defaults.baseURL ?? "http://localhost:8000").replace(/^http/, "ws");

let sessaoEmMemoria: string | null = null;

const gerarIdSessao = () => {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const obterSessao = () => {
    if (sessaoEmMemoria) return sessaoEmMemoria;

    try {
        const sessaoSalva = localStorage.getItem(CHAVE_SESSAO);
        sessaoEmMemoria = sessaoSalva ?? gerarIdSessao();
        if (!sessaoSalva) localStorage.setItem(CHAVE_SESSAO, sessaoEmMemoria);
    } catch {
        sessaoEmMemoria ??= gerarIdSessao();
    }

    return sessaoEmMemoria;
};

export const montarUrlWebSocket = (caminho: string) =>
    `${BASE_URL_WS}${caminho}?sessao=${encodeURIComponent(obterSessao())}`;
