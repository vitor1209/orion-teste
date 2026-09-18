import { Box, Stack, Tooltip } from "@mui/material";
import { styles } from "./Partitura.styled";
import { usePartitura } from "./Partitura.hook";
import type { PartituraProps } from "./Partitura.type";
import { useNotaSound } from "../../hooks/useNotaSound/useNotaSound.hook";
import { Button } from "../Button/Button";
import { CirclePlay, Trash2, PauseCircle, Undo2 } from "lucide-react";

export const Partitura = ({ notas = [], statusNotas, onClear, onRemoverUltimaNota }: PartituraProps) => {
	const {
		containerRef,
	} = usePartitura(notas, statusNotas);

	const { tocarPartitura, tocando } = useNotaSound({ notas });

	return (
		<Stack sx={styles.container}>
			<Stack direction={{ xs: "row", sm: "column" }} spacing={1} sx={styles.botoes}>
				<Tooltip title={tocando ? "Pausar partitura" : "Tocar partitura"}>
					<Button
						variante="Icone"
						tamanho="xl"
						icon={tocando ? PauseCircle : CirclePlay}
						onClick={tocarPartitura}
						disabled={notas.length === 0}
						aria-label={tocando ? "Pausar partitura" : "Tocar partitura"}
					/>
				</Tooltip>
				{!statusNotas && (
					<>
						<Tooltip title="Limpar todas as notas">
							<Button
								variante="Icone"
								tamanho="xl"
								icon={Trash2}
								onClick={onClear}
								disabled={notas.length === 0 || !onClear}
								aria-label="Limpar todas as notas"
							/>
						</Tooltip>
						<Tooltip title="Remover última nota">
							<Button
								variante="Icone"
								tamanho="xl"
								icon={Undo2}
								onClick={onRemoverUltimaNota}
								disabled={notas.length === 0 || !onRemoverUltimaNota}
								aria-label="Remover última nota"
							/>
						</Tooltip>
					</>
				)}
			</Stack>

			<Box sx={styles.score}>
				<Box ref={containerRef} sx={styles.svg} />
			</Box>
		</Stack>
	);
};
