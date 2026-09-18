declare module '.png' {
    const src: string;
    export default src;
}

declare module '.jpg' {
    const src: string;
    export default src;
}

declare module '.jpeg' {
    const src: string;
    export default src;
}

declare module '.svg' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module "react-piano" {
  import { ComponentType, ReactNode } from "react";

  export interface NoteRange {
    first: number;
    last: number;
  }

  export interface KeyboardShortcut {
    key: string;
    midiNumber: number;
  }

  export interface RenderNoteLabelProps {
    keyboardShortcut?: string;
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }

  export interface OnNoteInputContext {
    prevActiveNotes: number[];
  }

  export interface PianoProps {
    /**
     * Objeto com formato { first: 48, last: 77 }, onde first e last são
     * números MIDI correspondentes a notas naturais.
     */
    noteRange: NoteRange;

    /** (midiNumber) => void — toca a nota especificada pelo número MIDI. */
    playNote: (midiNumber: number) => void;

    /** (midiNumber) => void — para de tocar a nota. */
    stopNote: (midiNumber: number) => void;

    /**
     * Largura em pixels do componente. Condicionalmente obrigatório:
     * se omitido, o container ao redor do <Piano> precisa ter
     * width/height explícitos para renderizar corretamente.
     */
    width?: number;

    /**
     * Array de números MIDI, ex: [44, 47, 54], que permite tocar notas
     * programaticamente no teclado.
     */
    activeNotes?: number[];

    /** Proporção largura/altura da tecla. */
    keyWidthToHeight?: number;

    /**
     * Função para renderizar um label nas teclas que possuem atalhos
     * de teclado.
     */
    renderNoteLabel?: (props: RenderNoteLabelProps) => ReactNode;

    /** className adicional para o componente. */
    className?: string;

    /**
     * Se true, mostra estado desabilitado. Útil enquanto sons são
     * carregados de forma assíncrona.
     */
    disabled?: boolean;

    /**
     * Array no formato [{ key: 'a', midiNumber: 48 }, ...], onde key é
     * um valor de keyEvent.key. Pode ser gerado via KeyboardShortcuts.create,
     * ou por método próprio. Pode ser omitido se atalhos não forem usados.
     * OBS: não deve ser gerado inline no JSX (causa problemas de diff).
     */
    keyboardShortcuts?: KeyboardShortcut[];

    /**
     * (midiNumber, { prevActiveNotes }) => void — disparado sempre que
     * um evento de "tocar nota" ocorre.
     */
    onPlayNoteInput?: (
      midiNumber: number,
      context: OnNoteInputContext
    ) => void;

    /**
     * (midiNumber, { prevActiveNotes }) => void — disparado sempre que
     * um evento de "parar nota" ocorre.
     */
    onStopNoteInput?: (
      midiNumber: number,
      context: OnNoteInputContext
    ) => void;
  }

  export const Piano: ComponentType<PianoProps>;

  export interface KeyboardConfig {
    natural: string;
    flat?: string;
    sharp?: string;
  }

  export const KeyboardShortcuts: {
    HOME_ROW: KeyboardConfig[];
    create: (config: {
      firstNote: number;
      lastNote: number;
      keyboardConfig: KeyboardConfig[];
    }) => KeyboardShortcut[];
  };

  export const MidiNumbers: {
    fromNote: (note: string) => number;
    getAttributes: (midiNumber: number) => {
      note: string;
      isAccidental: boolean;
      pitchName: string;
      octave: number;
    };
    NATURAL_MIDI_NUMBERS: number[];
    MIDI_NOTE_MAX: number;
    MIDI_NOTE_MIN: number;
  };
}

interface SerialPort {
    readable: ReadableStream<Uint8Array> | null
    writable: WritableStream<Uint8Array> | null

    open(options?: SerialOptions): Promise<void>
    close(): Promise<void>
    forget?(): Promise<void>
}

interface SerialOptions {
    baudRate: number
    dataBits?: number
    stopBits?: number
    parity?: "none" | "even" | "odd"
    bufferSize?: number
    flowControl?: "none" | "hardware"
}

interface SerialPortRequestOptions {
    filters?: SerialPortFilter[]
}

interface SerialPortFilter {
    usbVendorId?: number
    usbProductId?: number
}

interface Serial {
    getPorts(): Promise<SerialPort[]>
    requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>
}

interface Navigator {
    serial: Serial
}