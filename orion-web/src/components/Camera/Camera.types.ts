import type { ReactNode } from "react";

export type CameraProps = {
    isStreamActive: boolean;
    exibirNota?: boolean;
    onStart: () => void;
    onStop: () => void;
    ultimaNota: string | null;
    overlay?: ReactNode;
};