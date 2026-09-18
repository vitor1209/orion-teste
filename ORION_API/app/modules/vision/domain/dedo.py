from numpy import acos, degrees, sqrt

from app.modules.vision.domain.landmark import Landmark


class Dedo:
    def __init__(self, nome, mcp: Landmark, pip: Landmark, dip: Landmark, tip: Landmark):
        self.nome = nome
        self.mcp = mcp
        self.pip = pip
        self.dip = dip
        self.tip = tip

    def _vetor(self, a: Landmark, b: Landmark):
        return (b.x - a.x, b.y - a.y, b.z - a.z)

    def _produto_escalar(self, v1, v2):
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]

    def _modulo(self, v):
        return sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)

    def _angulo(self):

        v1 = self._vetor(self.mcp, self.pip)
        v2 = self._vetor(self.pip, self.dip)

        produto_escalar = self._produto_escalar(v1, v2)

        modulo_v1 = self._modulo(v1)
        modulo_v2 = self._modulo(v2)

        if modulo_v1 == 0 or modulo_v2 == 0:
            return 0

        cos_theta = max(-1, min(1, produto_escalar / (modulo_v1 * modulo_v2)))
        return degrees(acos(cos_theta))

    def estendido(self):
        angulo = self._angulo()
        return angulo < 35

    def direcao(self):
        return (
            self.tip.x - self.mcp.x,
            self.tip.y - self.mcp.y,
            self.tip.z - self.mcp.z,
        )

    def __repr__(self):
        return (
            f"{self.nome}"
            f"(estendido={self.estendido()}, "
            f"angulo={self._angulo():.2f})"
        )