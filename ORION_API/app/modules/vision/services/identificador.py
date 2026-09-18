from app.modules.vision.domain.mao import Mao


class Identificador:
    def __init__(self, regras):
        self.regras = regras

    def identificar(self, mao: Mao):
        estado = mao.estado()

        for regra in self.regras:
            if regra.combina(estado):
                return regra.nota

        return "reset"