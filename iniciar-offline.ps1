#Requires -Version 5.1
<#
    Sobe o ORION inteiro na maquina local, sem internet.

    - API  (FastAPI + MediaPipe) em http://localhost:8000
    - Front (Vite)               em http://localhost:5173

    Cada servico abre na sua propria janela. Feche as janelas para parar.
#>

$ErrorActionPreference = "Stop"

$raiz = $PSScriptRoot
$pastaApi = Join-Path $raiz "ORION_API"
$pastaWeb = Join-Path $raiz "orion-web"
$python = Join-Path $pastaApi "venv\Scripts\python.exe"

function Escrever($mensagem, $cor = "Cyan") {
    Write-Host "[ORION] $mensagem" -ForegroundColor $cor
}

# --- Checagens ---------------------------------------------------------------

if (-not (Test-Path $python)) {
    Escrever "Ambiente virtual nao encontrado em ORION_API\venv." "Red"
    Escrever "Crie com:  python -m venv ORION_API\venv" "Red"
    Escrever "E instale: ORION_API\venv\Scripts\python.exe -m pip install -r ORION_API\requirements.txt aiosqlite" "Red"
    Read-Host "Enter para sair"
    exit 1
}

& $python -c "import aiosqlite" 2>$null
if ($LASTEXITCODE -ne 0) {
    Escrever "Instalando aiosqlite (driver do banco local, unica vez que precisa de internet)..." "Yellow"
    & $python -m pip install aiosqlite
    if ($LASTEXITCODE -ne 0) {
        Escrever "Falha ao instalar aiosqlite. Conecte-se a internet e rode este script de novo." "Red"
        Read-Host "Enter para sair"
        exit 1
    }
}

if (-not (Test-Path (Join-Path $pastaWeb "node_modules"))) {
    Escrever "node_modules nao encontrado. Rodando npm install (precisa de internet)..." "Yellow"
    Push-Location $pastaWeb
    npm install
    Pop-Location
}

if (-not (Test-Path (Join-Path $pastaWeb ".env.local"))) {
    Escrever "Criando orion-web\.env.local apontando para a API local..." "Yellow"
    "VITE_BACKEND_BASE_URL=http://localhost:8000" |
        Set-Content -Path (Join-Path $pastaWeb ".env.local") -Encoding UTF8
}

# --- Subida ------------------------------------------------------------------

Escrever "Subindo a API em http://localhost:8000 ..."
Start-Process powershell -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location -LiteralPath '$pastaApi'; " +
    "& '$python' -m uvicorn app.main:app --host 0.0.0.0 --port 8000"
)

Escrever "Subindo o front em http://localhost:5173 ..."
Start-Process powershell -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location -LiteralPath '$pastaWeb'; npm run dev"
)

Escrever "Aguardando o front responder..."
$pronto = $false
foreach ($tentativa in 1..40) {
    Start-Sleep -Seconds 1
    try {
        Invoke-WebRequest -Uri "http://localhost:5173/" -UseBasicParsing -TimeoutSec 2 | Out-Null
        $pronto = $true
        break
    } catch { }
}

if ($pronto) {
    Start-Process "http://localhost:5173/"
    Escrever "Pronto." "Green"
    Escrever "Login: orion@orion.com / orion123" "Green"
} else {
    Escrever "O front demorou para subir. Confira a janela do Vite e abra http://localhost:5173 na mao." "Yellow"
}
