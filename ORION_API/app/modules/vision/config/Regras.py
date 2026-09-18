from app.modules.vision.domain.regraNota import RegraNota

REGRAS = [
    RegraNota("C3", (True, False, False, False, False), palma_camera=False, mao_cima=False),
    RegraNota("D3", (True, True, False, False, False), palma_camera=False, mao_cima=False),
    RegraNota("E3", (True, True, True, False, False), palma_camera=False, mao_cima=False),
    RegraNota("F3", (False, True, True, True, True), palma_camera=False, mao_cima=False),
    RegraNota("G3", (True, True, True, True, True), palma_camera=False, mao_cima=False),
    RegraNota("A3", (True, False, False, False, True), palma_camera=False, mao_cima=False),
    RegraNota("B3", (False, False, False, False, True), palma_camera=False, mao_cima=False),
    
    RegraNota("C4", (True, False, False, False, False), palma_camera=True, mao_cima=True),
    RegraNota("D4", (True, True, False, False, False), palma_camera=True, mao_cima=True),
    RegraNota("E4", (True, True, True, False, False), palma_camera=True, mao_cima=True),
    RegraNota("F4", (False, True, True, True, True), palma_camera=True, mao_cima=True),
    RegraNota("G4", (True, True, True, True, True), palma_camera=True, mao_cima=True),
    RegraNota("A4", (True, False, False, False, True), palma_camera=True, mao_cima=True),
    RegraNota("B4", (False, False, False, False, True), palma_camera=True, mao_cima=True),
    
    RegraNota("C5", (True, False, False, False, False), palma_camera=False, mao_cima=True),
    RegraNota("D5", (True, True, False, False, False), palma_camera=False, mao_cima=True),
    RegraNota("E5", (True, True, True, False, False), palma_camera=False, mao_cima=True),
    RegraNota("F5", (False, True, True, True, True), palma_camera=False, mao_cima=True),
    RegraNota("G5", (True, True, True, True, True), palma_camera=False, mao_cima=True),
    RegraNota("A5", (True, False, False, False, True), palma_camera=False, mao_cima=True),
    RegraNota("B5", (False, False, False, False, True), palma_camera=False, mao_cima=True),
    
    # RegraNota("Reset", (False, False, False, False, False), palma_camera=True, mao_cima=True),
]