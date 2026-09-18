from app.modules.vision.domain.estadoMao import EstadoMao


class RegraNota:

    def __init__(
        self, nota: str, dedos: tuple[bool, bool, bool, bool, bool], palma_camera: bool | None = None, mao_cima: bool | None = None, lado_mao: str | None = None
    ):
        self.nota = nota
        self.dedos = dedos
        self.palma_camera = palma_camera
        self.mao_cima = mao_cima
        self.lado_mao = lado_mao

    def combina(self, estado: EstadoMao) -> bool:
        if self.dedos != (
            estado.polegar,
            estado.indicador,
            estado.medio,
            estado.anelar,
            estado.minimo,
        ):
            return False
        if self.palma_camera is not None and self.palma_camera != estado.palma_camera:
            return False

        if self.mao_cima is not None and self.mao_cima != estado.mao_cima:
            return False

        return not (self.lado_mao is not None and self.lado_mao != estado.lado_mao)