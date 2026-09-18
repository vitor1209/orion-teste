import numpy as np

from app.modules.vision.domain.dedo import Dedo
from app.modules.vision.domain.estadoMao import EstadoMao
from app.modules.vision.domain.landmark import Landmark


class Mao:
    def __init__(self, landmarks, lado_mao):
        self.landmarks = landmarks
        self.lado_mao = lado_mao

        self.polegar = Dedo(
            "Polegar", landmarks[2], landmarks[3], landmarks[3], landmarks[4]
        )
        self.indicador = Dedo(
            "Indicador", landmarks[5], landmarks[6], landmarks[7], landmarks[8]
        )
        self.medio = Dedo(
            "Medio", landmarks[9], landmarks[10], landmarks[11], landmarks[12]
        )
        self.anelar = Dedo(
            "Anelar", landmarks[13], landmarks[14], landmarks[15], landmarks[16]
        )
        self.minimo = Dedo(
            "Minimo", landmarks[17], landmarks[18], landmarks[19], landmarks[20]
        )
        
    def _vetor(self, a: Landmark, b: Landmark):
        return (b.x - a.x, b.y - a.y, b.z - a.z)
    
    def polegar_estendido(self):
        pulso = self.landmarks[0]
        tip_polegar = self.landmarks[4]
        tip_indicador = self.landmarks[8]

        v_polegar = self._vetor(pulso, tip_polegar) 
        v_indicador = self._vetor(pulso, tip_indicador)

        cos = np.dot(v_polegar, v_indicador) / (
            np.linalg.norm(v_polegar) * np.linalg.norm(v_indicador)
        )

        angulo = np.degrees(np.arccos(np.clip(cos, -1, 1)))

        return angulo > 15
    
    def _normal_palma(self):
        pulso = self.landmarks[0]
        indicador_mcp = self.landmarks[5]
        minimo_mcp = self.landmarks[17]

        v1 = np.array([indicador_mcp.x - pulso.x, indicador_mcp.y - pulso.y, indicador_mcp.z - pulso.z])
        v2 = np.array([minimo_mcp.x - pulso.x, minimo_mcp.y - pulso.y, minimo_mcp.z - pulso.z])

        return np.cross(v1, v2)
    
    def palma_para_camera(self):
        normal = self._normal_palma()
        
        if self.lado_mao == "Right":
            return normal[2] < 0
        return normal[2] > 0

    def mao_para_cima(self):
        pulso = self.landmarks[0]
        medio_mcp = self.landmarks[9]

        return medio_mcp.y < pulso.y

    def estado(self):
        return EstadoMao(
            polegar=self.polegar_estendido(),
            indicador=self.indicador.estendido(),
            medio=self.medio.estendido(),
            anelar=self.anelar.estendido(),
            minimo=self.minimo.estendido(),
            palma_camera=self.palma_para_camera(),
            mao_cima=self.mao_para_cima(),
            lado_mao=self.lado_mao,
        )