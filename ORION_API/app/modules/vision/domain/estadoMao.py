class EstadoMao:
    def __init__(
        self,
        polegar: bool,
        indicador: bool,
        medio: bool,
        anelar: bool,
        minimo: bool,
        palma_camera: bool,
        mao_cima: bool,
        lado_mao: str,
    ):
        self.polegar = polegar
        self.indicador = indicador
        self.medio = medio
        self.anelar = anelar
        self.minimo = minimo
        self.palma_camera = palma_camera
        self.mao_cima = mao_cima
        self.lado_mao = lado_mao