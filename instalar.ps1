#Requires -Version 5.1
<#
    Instala tudo que o ORION precisa para rodar offline nesta maquina.

    Faz, nesta ordem:
      1. acha um Python compativel e cria ORION_API\venv
      2. instala requirements.txt + aiosqlite dentro do venv
      3. cria ORION_API\.env a partir do .env.example, com SECRET_KEY aleatoria
      4. roda npm install em orion-web
      5. cria orion-web\.env.local apontando para a API local
      6. confere o modelo do MediaPipe e os imports da API

    Precisa de internet. Depois dele, iniciar-offline.bat sobe tudo sem rede.

    Parametros:
      -Forcar      apaga e recria o venv e o node_modules do zero
      -Verificar   nao instala nada, so diz o que esta faltando
      -SemPausa    nao espera Enter no final (para rodar dentro de outro script)
#>

[CmdletBinding()]
param(
    [switch]$Forcar,
    [switch]$Verificar,
    [switch]$SemPausa
)

$ErrorActionPreference = "Stop"

$raiz = $PSScriptRoot
$pastaApi = Join-Path $raiz "ORION_API"
$pastaWeb = Join-Path $raiz "orion-web"
$pastaVenv = Join-Path $pastaApi "venv"
$pythonVenv = Join-Path $pastaVenv "Scripts\python.exe"
$problemas = New-Object System.Collections.Generic.List[string]

function Escrever($mensagem, $cor = "Cyan") {
    Write-Host "[ORION] $mensagem" -ForegroundColor $cor
}

function Etapa($numero, $titulo) {
    Write-Host ""
    Write-Host "=== $numero/6  $titulo " -ForegroundColor White
}

function Anotar($mensagem) {
    Escrever $mensagem "Red"
    $problemas.Add($mensagem)
}

function EscreverArquivo($caminho, $texto) {
    # UTF-8 sem BOM: o python-dotenv e o Vite leem o primeiro nome de chave torto se tiver BOM.
    $utf8SemBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($caminho, $texto, $utf8SemBom)
}

function Pausar($mensagem) {
    if ($SemPausa) { return }
    Read-Host $mensagem | Out-Null
}

function VersaoDoPython($executavel) {
    # No Windows PowerShell 5.1, com 2>$null e ErrorActionPreference=Stop, qualquer texto no
    # stderr de um programa nativo vira erro fatal. Por isso relaxamos so dentro desta funcao.
    $erroAnterior = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $saida = & $executavel -c "import sys; print('%d.%d' % sys.version_info[:2])" 2>$null
        if ($LASTEXITCODE -ne 0 -or -not $saida) { return $null }
        return ("$saida").Trim()
    } finally {
        $ErrorActionPreference = $erroAnterior
    }
}

function AcharPython {
    # As dependencias compiladas (mediapipe, opencv, numpy, pydantic-core...) tem wheel
    # para 3.11 em diante. Abaixo disso nao instala.
    $candidatos = New-Object System.Collections.Generic.List[string]

    $launcher = Get-Command py -ErrorAction SilentlyContinue
    if ($launcher) {
        # O py escreve "No suitable Python runtime found" no stderr quando a versao pedida
        # nao esta instalada (ex.: 3.12). Isso nao pode derrubar o script: so pulamos o seletor.
        $erroAnterior = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        try {
            foreach ($alvo in @("-3", "-V:3.13", "-V:3.12", "-V:3.11")) {
                $caminho = & py $alvo -c "import sys; print(sys.executable)" 2>$null
                if ($LASTEXITCODE -eq 0 -and $caminho) { $candidatos.Add(("$caminho").Trim()) }
            }
        } finally {
            $ErrorActionPreference = $erroAnterior
        }
    }

    $doPath = Get-Command python -ErrorAction SilentlyContinue
    if ($doPath) { $candidatos.Add($doPath.Source) }

    $primeiro = $null
    foreach ($candidato in $candidatos) {
        $versao = VersaoDoPython $candidato
        if (-not $versao) { continue }
        $menor = [int](($versao -split '\.')[1])
        $resultado = [pscustomobject]@{ Caminho = $candidato; Versao = $versao; Ideal = ($menor -ge 11) }
        if ($resultado.Ideal) { return $resultado }
        if (-not $primeiro) { $primeiro = $resultado }
    }

    return $primeiro
}

Write-Host ""
Escrever "Instalador do ambiente offline do ORION" "Green"
Escrever "Pasta: $raiz"
if ($Verificar) { Escrever "Modo verificacao: nada sera instalado." "Yellow" }

# --- 1. Python ---------------------------------------------------------------

Etapa 1 "Python e ambiente virtual"

$python = AcharPython
if (-not $python) {
    Anotar "Python nao encontrado. Instale o Python 3.13 (marcando 'Add to PATH') e rode de novo:"
    Escrever "  https://www.python.org/downloads/" "Red"
    Pausar "Enter para sair"
    exit 1
}

Escrever "Python $($python.Versao) em $($python.Caminho)"
if (-not $python.Ideal) {
    Anotar "Este projeto precisa de Python 3.11 ou mais novo (achei $($python.Versao))."
    Escrever "Instale uma versao nova em https://www.python.org/downloads/ e rode de novo." "Red"
    Pausar "Enter para sair"
    exit 1
}

if ($Forcar -and (Test-Path $pastaVenv) -and -not $Verificar) {
    Escrever "-Forcar: apagando o venv atual..." "Yellow"
    Remove-Item -LiteralPath $pastaVenv -Recurse -Force
}

if (Test-Path $pythonVenv) {
    Escrever "venv ja existe em ORION_API\venv." "Green"
} elseif ($Verificar) {
    Anotar "Falta o venv em ORION_API\venv."
} else {
    Escrever "Criando o venv em ORION_API\venv..."
    & $python.Caminho -m venv $pastaVenv
    if (-not (Test-Path $pythonVenv)) {
        Anotar "Nao consegui criar o venv. Confira se o Python tem o modulo venv."
        Pausar "Enter para sair"
        exit 1
    }
}

# --- 2. Dependencias Python --------------------------------------------------

Etapa 2 "Dependencias da API (pip)"

$requirements = Join-Path $pastaApi "requirements.txt"

if ($Verificar) {
    if (Test-Path $pythonVenv) {
        $erroAnterior = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        try {
            & $pythonVenv -c "import fastapi, uvicorn, mediapipe, cv2, sqlalchemy, aiosqlite" 2>$null
            $codigo = $LASTEXITCODE
        } finally {
            $ErrorActionPreference = $erroAnterior
        }
        if ($codigo -eq 0) {
            Escrever "Pacotes da API presentes." "Green"
        } else {
            Anotar "Faltam pacotes no venv (rode o instalador sem -Verificar)."
        }
    }
} else {
    Escrever "Atualizando o pip..."
    & $pythonVenv -m pip install --upgrade pip --quiet
    if ($LASTEXITCODE -ne 0) { Escrever "Nao deu para atualizar o pip; seguindo com a versao atual." "Yellow" }

    Escrever "Instalando o requirements.txt (demora alguns minutos: mediapipe e opencv sao grandes)..."
    & $pythonVenv -m pip install -r $requirements
    if ($LASTEXITCODE -ne 0) {
        Anotar "Falha ao instalar o requirements.txt. Veja o erro acima (rede? versao do Python?)."
    }

    # aiosqlite e o driver do banco local e nao esta no requirements.txt.
    Escrever "Instalando aiosqlite (driver do SQLite local)..."
    & $pythonVenv -m pip install aiosqlite
    if ($LASTEXITCODE -ne 0) {
        Anotar "Falha ao instalar aiosqlite. Sem ele a API nao sobe offline."
    }
}

# --- 3. ORION_API\.env -------------------------------------------------------

Etapa 3 "Configuracao da API (.env)"

$envApi = Join-Path $pastaApi ".env"
$envApiExemplo = Join-Path $pastaApi ".env.example"

if (Test-Path $envApi) {
    Escrever "ORION_API\.env ja existe; deixando como esta." "Green"
} elseif ($Verificar) {
    Anotar "Falta ORION_API\.env (a API nao sobe sem SECRET_KEY)."
} else {
    if (-not (Test-Path $envApiExemplo)) {
        Anotar "Nao achei ORION_API\.env.example para copiar."
    } else {
        $bytes = New-Object byte[] 48
        [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
        $segredo = [Convert]::ToBase64String($bytes)

        $conteudo = Get-Content -LiteralPath $envApiExemplo -Raw
        $conteudo = $conteudo -replace '(?m)^SECRET_KEY=.*$', ('SECRET_KEY="' + $segredo + '"')
        EscreverArquivo $envApi $conteudo

        Escrever "ORION_API\.env criado com SECRET_KEY aleatoria (SQLite local, seed ligado)." "Green"
    }
}

# --- 4. Dependencias do front ------------------------------------------------

Etapa 4 "Dependencias do front (npm)"

$node = Get-Command node -ErrorAction SilentlyContinue
$npm = Get-Command npm -ErrorAction SilentlyContinue

if (-not $node -or -not $npm) {
    Anotar "Node.js nao encontrado. Instale a versao LTS (20 ou mais nova) e rode de novo:"
    Escrever "  https://nodejs.org/" "Red"
} else {
    $versaoNode = (& node --version).Trim()
    Escrever "Node $versaoNode"
    $maior = [int](($versaoNode.TrimStart("v") -split '\.')[0])
    if ($maior -lt 20) {
        Anotar "O Vite 8 deste projeto precisa de Node 20 ou mais novo (achei $versaoNode)."
    }

    $nodeModules = Join-Path $pastaWeb "node_modules"

    if ($Forcar -and (Test-Path $nodeModules) -and -not $Verificar) {
        Escrever "-Forcar: apagando node_modules..." "Yellow"
        Remove-Item -LiteralPath $nodeModules -Recurse -Force
    }

    if (Test-Path $nodeModules) {
        Escrever "node_modules ja existe." "Green"
    } elseif ($Verificar) {
        Anotar "Falta o node_modules em orion-web."
    } else {
        Escrever "Rodando npm install em orion-web (demora alguns minutos)..."
        Push-Location $pastaWeb
        try {
            & npm install
            if ($LASTEXITCODE -ne 0) {
                Anotar "npm install falhou. Veja o erro acima."
            }
        } finally {
            Pop-Location
        }
    }
}

# --- 5. orion-web\.env.local -------------------------------------------------

Etapa 5 "Front apontando para a API local"

$envLocal = Join-Path $pastaWeb ".env.local"

if (Test-Path $envLocal) {
    Escrever "orion-web\.env.local ja existe; deixando como esta." "Green"
} elseif ($Verificar) {
    Anotar "Falta orion-web\.env.local (sem ele o front fala com a API da Railway)."
} else {
    EscreverArquivo $envLocal "VITE_BACKEND_BASE_URL=http://localhost:8000`r`n"
    Escrever "orion-web\.env.local criado apontando para http://localhost:8000." "Green"
}

# --- 6. Conferencia final ----------------------------------------------------

Etapa 6 "Conferencia"

$modelo = Join-Path $pastaApi "app\modules\vision\Modelos\hand_landmarker.task"
if (Test-Path $modelo) {
    Escrever "Modelo do MediaPipe presente (hand_landmarker.task)." "Green"
} else {
    Anotar "Falta o modelo hand_landmarker.task em ORION_API\app\modules\vision\Modelos."
}

if (-not $Verificar -and (Test-Path $pythonVenv)) {
    Escrever "Testando os imports da API..."
    & $pythonVenv -c "import fastapi, uvicorn, mediapipe, cv2, sqlalchemy, aiosqlite; print('ok')"
    if ($LASTEXITCODE -ne 0) {
        Anotar "Os imports da API falharam. A API nao vai subir assim."
    } else {
        Escrever "Imports da API ok." "Green"
    }
}

$iniciar = Join-Path $raiz "iniciar-offline.bat"
if (-not (Test-Path $iniciar)) {
    Anotar "Nao achei iniciar-offline.bat nesta pasta."
}

Write-Host ""
if ($problemas.Count -eq 0) {
    Escrever "Tudo instalado." "Green"
    Escrever "Agora e so dar duplo clique em iniciar-offline.bat." "Green"
    Escrever "Login: orion@orion.com / orion123" "Green"
} else {
    Escrever "Terminou com $($problemas.Count) pendencia(s):" "Red"
    foreach ($problema in $problemas) { Write-Host "  - $problema" -ForegroundColor Red }
    Escrever "Resolva o que esta acima e rode o instalador outra vez." "Yellow"
}

Write-Host ""
Pausar "Enter para fechar"
