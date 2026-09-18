"""Dados iniciais para rodar a plataforma offline, sem depender do banco remoto.

O seed é idempotente: só insere o que ainda não existe, então pode rodar a cada
startup sem duplicar nada. Os ids são explícitos de propósito, porque o frontend
navega pela `Chave` e o progresso do usuário referencia `Atividade.Id`.
"""

import asyncio
import logging

from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Atividade.models import Atividade
from app.modules.Dominio.models import Dominio
from app.modules.DominioTipo.models import DominioTipo
from app.modules.Usuario.models import Usuario

logger = logging.getLogger(__name__)

USUARIO_OFFLINE_NOME = "Usuário ORION"
# Evite TLDs reservados (.test, .local, .invalid): o email-validator usado pelo
# pydantic EmailStr recusa esses dominios e o login nem chega no banco.
USUARIO_OFFLINE_EMAIL = "orion@orion.com"
USUARIO_OFFLINE_SENHA = "orion123"

DOMINIO_TIPOS = [
    (1, "CATEGORIA_ATIVIDADE", "Categoria da atividade"),
    (2, "TIPO_ATIVIDADE", "Tipo de interação da atividade"),
]

# As descrições viram `categoria` e `tipo` na resposta da API e o frontend compara
# com string literal: a categoria bate com o enum ConteudoAtividade (Escala,
# Intervalo, Melodia) e o tipo é testado com includes("manossolfa") / includes("luva").
DOMINIOS = [
    (1, 1, "MELODIA", "Melodia"),
    (2, 1, "INTERVALO", "Intervalo"),
    (3, 1, "ESCALA", "Escala"),
    (10, 1, "GESTOS", "Gestos"),
    (8, 2, "MANOSSOLFA", "Manossolfa"),
    (9, 2, "LUVA", "Luva"),
]

FINAL_GESTO = (
    "ao fazer o gesto correspondente a nota irá escurecer, ao fazer o gesto errado "
    "será mostrada em vermelho qual nota você fez, e então terá a chance de tentar novamente."
)

FINAL_PRESSAO = (
    "Ao pressionar corretamente, a nota irá escurecer. Ao pressionar errado, será mostrada "
    "em vermelho qual nota você fez, e então terá a chance de tentar novamente."
)

DICIONARIO = (
    "Antes de começar, você pode consultar o dicionário para revisar quais gestos "
    "representam cada nota."
)

DEMONSTRACAO_GESTO = (
    "Cada nota será apresentada individualmente na tela, acompanhada de uma demonstração "
    "do gesto e do seu respectivo som. Após visualizar o gesto, você deverá reproduzi-lo "
    "com a mão em frente à câmera para avançar para a próxima nota."
)

# (Id, CategoriaId, TipoId, Titulo, SubTitulo, Descricao, Chave, Ordem)
ATIVIDADES = [
    (
        1, 3, 8,
        "Introdução a escala de Dó Maior",
        "Primeiros passos na música - conhecendo a escala de Dó Maior",
        "Nesta atividade você irá conhecer a escala de Dó Maior, fazendo os gestos "
        f"correspondentes de cada nota mostrada, {FINAL_GESTO}\n{DICIONARIO}",
        "introducao-escala-do-maior-manossolfa", 1,
    ),
    (
        2, 3, 9,
        "Introdução a escala de Dó Maior",
        "Primeiros passos na música - conhecendo a escala de Dó Maior",
        "Nesta atividade você irá conhecer a escala de Dó Maior, pressionando em alguma "
        "superfície os dedos ou punho correspondentes de cada nota mostrada. "
        f"{FINAL_PRESSAO}",
        "introducao-escala-do-maior-luva", 1,
    ),
    (
        3, 2, 8,
        "Passeando pela escala de Dó Maior",
        "Conhecendo e praticando os intervalos da escala",
        "Nesta atividade você irá conhecer os intervalos da escala de Dó Maior, fazendo os "
        f"gestos correspondentes de cada nota mostrada, {FINAL_GESTO}",
        "passeando-escala-do-maior-manossolfa", 2,
    ),
    (
        4, 2, 8,
        "Passeando pela escala de Dó Maior pt2",
        "Explorando intervalos em diferentes combinações",
        "Nesta atividade você irá fazer intervalos aleatórios da escala de Dó Maior, fazendo "
        f"os gestos correspondentes de cada nota mostrada, {FINAL_GESTO}",
        "passeando-escala-do-maior-pt2-manossolfa", 3,
    ),
    (
        5, 10, 8,
        "Conhecendo a Manossolfa",
        "Aprendendo a representar as notas da 4° oitava com as mãos",
        "Nesta atividade você irá aprender os gestos correspondentes às notas musicais da "
        f"4° oitava. {DEMONSTRACAO_GESTO}",
        "manossolfa-gesto-camera", 0,
    ),
    (
        6, 10, 9,
        "Conhecendo os gestos da luva",
        "Aprendendo a representar as notas com as mãos",
        "Nesta atividade você irá conhecer os pontos de pressão correspondentes às diferentes "
        "notas musicais. Cada nota será apresentada individualmente na tela, acompanhada de "
        "uma demonstração de qual dedo ou pulso deve ser pressionado na superfície e do seu "
        "respectivo som. Após visualizar a demonstração, você deverá reproduzi-la para "
        "avançar para a próxima nota.",
        "manossolfa-pressao-luva", 0,
    ),
    (
        7, 3, 8,
        "Introdução a escala de Lá Menor",
        "Conhecendo a estrutura e os caminhos da escala menor",
        "Nesta atividade você irá conhecer a escala de Lá Menor, fazendo os gestos "
        f"correspondentes de cada nota mostrada, {FINAL_GESTO}",
        "introducao-escala-la-menor-manossolfa", 4,
    ),
    (
        8, 2, 8,
        "Passeando pela escala de Lá Menor",
        "Praticando os intervalos da escala menor",
        "Nesta atividade você irá conhecer os intervalos da escala de Lá Menor, fazendo os "
        f"gestos correspondentes de cada nota mostrada, {FINAL_GESTO}",
        "passeando-escala-la-menor-manossolfa", 5,
    ),
    (
        9, 2, 8,
        "Passeando pela escala de Lá Menor pt2",
        "Explorando intervalos em diferentes combinações",
        "Nesta atividade você irá fazer intervalos aleatórios da escala de Lá Menor, fazendo "
        f"os gestos correspondentes de cada nota mostrada, {FINAL_GESTO}",
        "passeando-escala-la-menor-pt2-manossolfa", 6,
    ),
    (
        10, 1, 8,
        "Primeiras Melodias",
        "Combinando notas para criar pequenas melodias",
        "Nesta atividade você irá executar pequenas melodias utilizando os gestos da "
        "Manossolfa correspondentes às notas apresentadas na tela. Ao realizar corretamente "
        "cada gesto, a nota será escurecida. Caso faça um gesto incorreto, será mostrada em "
        "vermelho a nota identificada, e então terá a chance de tentar novamente.\n"
        f"{DICIONARIO}",
        "primeiras-melodias-manossolfa", 7,
    ),
    (
        11, 1, 8,
        "Memorizando Melodias",
        "Treinando a memória musical",
        "Nesta atividade será apresentada uma pequena sequência de notas. Após alguns "
        "segundos ela desaparecerá e você deverá reproduzir a sequência utilizando os gestos "
        "da Manossolfa. Ao acertar todas as notas, uma nova sequência será apresentada.\n"
        f"{DICIONARIO}",
        "memorizando-melodias-manossolfa", 8,
    ),
    (
        12, 1, 8,
        "Complete a Melodia",
        "Desenvolvendo a percepção dos padrões melódicos",
        "Será apresentada uma sequência contendo uma nota faltando. Você deverá realizar o "
        "gesto correspondente à nota que completa corretamente a melodia. Caso erre, será "
        f"possível tentar novamente.\n{DICIONARIO}",
        "complete-melodia-manossolfa", 9,
    ),
    (
        13, 1, 8,
        "Eco Musical",
        "Ouvindo, memorizando e reproduzindo melodias",
        "Nesta atividade você irá ouvir uma pequena sequência de notas, acompanhada da sua "
        "representação visual. Após a sequência ser reproduzida, você deverá repeti-la "
        "utilizando os gestos correspondentes da Manossolfa. Ao realizar corretamente toda a "
        "sequência, uma nova será apresentada.",
        "eco-musical-manossolfa", 10,
    ),
    (
        14, 3, 9,
        "Passeando pela escala de Dó Maior",
        "Conhecendo e praticando os intervalos da escala",
        "Nesta atividade você irá conhecer os intervalos da escala de Dó Maior, pressionando "
        "em alguma superfície os dedos ou punho correspondentes de cada nota mostrada. "
        f"{FINAL_PRESSAO}",
        "passeando-escala-do-maior-luva", 2,
    ),
    (
        15, 2, 9,
        "Passeando pela escala de Dó Maior pt2",
        "Explorando intervalos em diferentes combinações",
        "Nesta atividade você irá fazer intervalos aleatórios da escala de Dó Maior, "
        "pressionando em alguma superfície os dedos ou punho correspondentes de cada nota "
        f"mostrada. {FINAL_PRESSAO}",
        "passeando-escala-do-maior-pt2-luva", 3,
    ),
    (
        16, 3, 9,
        "Introdução a escala de Dó Menor",
        "Conhecendo a estrutura e os caminhos da escala menor",
        "Nesta atividade você irá conhecer a escala de Dó Menor, pressionando em alguma "
        "superfície os dedos ou punho correspondentes de cada nota mostrada. "
        f"{FINAL_PRESSAO}",
        "introducao-escala-do-menor-luva", 4,
    ),
    (
        17, 2, 9,
        "Passeando pela escala de Dó Menor",
        "Praticando os intervalos da escala menor",
        "Nesta atividade você irá conhecer os intervalos da escala de Dó Menor, pressionando "
        "em alguma superfície os dedos ou punho correspondentes de cada nota mostrada. "
        f"{FINAL_PRESSAO}",
        "passeando-escala-do-menor-luva", 5,
    ),
    (
        18, 2, 9,
        "Passeando pela escala de Dó Menor pt2",
        "Explorando intervalos em diferentes combinações",
        "Nesta atividade você irá fazer intervalos aleatórios da escala de Dó Menor, "
        "pressionando em alguma superfície os dedos ou punho correspondentes de cada nota "
        f"mostrada. {FINAL_PRESSAO}",
        "passeando-escala-do-menor-pt2-luva", 6,
    ),
    (
        19, 1, 9,
        "Primeiras Melodias",
        "Combinando notas para criar pequenas melodias",
        "Nesta atividade você irá executar pequenas melodias pressionando os dedos ou o punho "
        "correspondentes às notas apresentadas na tela. Ao pressionar corretamente, a nota "
        "será escurecida. Caso pressione uma nota incorreta, será mostrada em vermelho a nota "
        "identificada, e então terá a chance de tentar novamente.",
        "primeiras-melodias-luva", 7,
    ),
    (
        20, 1, 9,
        "Memorizando Melodias",
        "Treinando a memória musical",
        "Nesta atividade será apresentada uma pequena sequência de notas. Após alguns "
        "segundos ela desaparecerá e você deverá reproduzir a sequência pressionando os dedos "
        "ou o punho correspondentes às notas. Ao acertar todas as notas, uma nova sequência "
        "será apresentada.",
        "memorizando-melodias-luva", 8,
    ),
    (
        21, 1, 9,
        "Complete a Melodia",
        "Desenvolvendo a percepção dos padrões melódicos",
        "Será apresentada uma sequência contendo uma nota faltando. Você deverá pressionar o "
        "dedo ou punho correspondente à nota que completa corretamente a melodia. Caso erre, "
        "será possível tentar novamente.",
        "complete-melodia-luva", 9,
    ),
    (
        22, 1, 9,
        "Eco Musical",
        "Ouvindo, memorizando e reproduzindo melodias",
        "Nesta atividade você irá ouvir uma pequena sequência de notas, acompanhada da sua "
        "representação visual. Após a sequência ser reproduzida, você deverá repeti-la "
        "utilizando os dedos ou punhos correspondentes. Ao realizar corretamente toda a "
        "sequência, uma nova será apresentada.",
        "eco-musical-luva", 10,
    ),
    (
        23, 10, 8,
        "Conhecendo a Manossolfa pt2",
        "Aprendendo a representar as notas da 5° oitava com as mãos",
        "Nesta atividade você irá aprender os gestos correspondentes às notas musicais da "
        f"5° oitava. {DEMONSTRACAO_GESTO}",
        "manossolfa-gesto-camera-pt2", 0,
    ),
    (
        24, 10, 8,
        "Conhecendo a Manossolfa pt3",
        "Aprendendo a representar as notas da 3° oitava com as mãos",
        "Nesta atividade você irá aprender os gestos correspondentes às notas musicais da "
        f"3° oitava. {DEMONSTRACAO_GESTO}",
        "manossolfa-gesto-camera-pt3", 0,
    ),
]


async def _semear_dominio_tipos(session: AsyncSession) -> int:
    existentes = set((await session.scalars(select(DominioTipo.Id))).all())

    novos = [
        DominioTipo(Id=id_, Codigo=codigo, Descricao=descricao, Ativo=True)
        for id_, codigo, descricao in DOMINIO_TIPOS
        if id_ not in existentes
    ]

    session.add_all(novos)
    return len(novos)


async def _semear_dominios(session: AsyncSession) -> int:
    existentes = set((await session.scalars(select(Dominio.Id))).all())

    novos = [
        Dominio(
            Id=id_,
            DominioTipo_id=dominio_tipo_id,
            Codigo=codigo,
            Descricao=descricao,
            Ativo=True,
        )
        for id_, dominio_tipo_id, codigo, descricao in DOMINIOS
        if id_ not in existentes
    ]

    session.add_all(novos)
    return len(novos)


async def _semear_atividades(session: AsyncSession) -> int:
    existentes = set((await session.scalars(select(Atividade.Chave))).all())

    novos = [
        Atividade(
            Id=id_,
            CategoriaAtividade_id=categoria_id,
            TipoAtividade_id=tipo_id,
            Titulo=titulo,
            SubTitulo=subtitulo,
            Descricao=descricao,
            Chave=chave,
            Ordem=ordem,
        )
        for id_, categoria_id, tipo_id, titulo, subtitulo, descricao, chave, ordem in ATIVIDADES
        if chave not in existentes
    ]

    session.add_all(novos)
    return len(novos)


async def _semear_usuario(session: AsyncSession) -> int:
    ja_existe = await session.scalar(
        select(Usuario.Id).where(Usuario.Email == USUARIO_OFFLINE_EMAIL)
    )

    if ja_existe:
        return 0

    senha_hash = await asyncio.to_thread(
        PasswordHash.recommended().hash, USUARIO_OFFLINE_SENHA
    )

    session.add(
        Usuario(
            Nome=USUARIO_OFFLINE_NOME,
            Email=USUARIO_OFFLINE_EMAIL,
            Senha=senha_hash,
            Ativo=True,
        )
    )

    return 1


async def semear_dados_offline(session: AsyncSession) -> None:
    dominio_tipos = await _semear_dominio_tipos(session)
    await session.flush()

    dominios = await _semear_dominios(session)
    await session.flush()

    atividades = await _semear_atividades(session)
    usuarios = await _semear_usuario(session)

    await session.commit()

    if dominio_tipos or dominios or atividades or usuarios:
        logger.info(
            "Seed offline: %s tipos de dominio, %s dominios, %s atividades, %s usuario(s).",
            dominio_tipos,
            dominios,
            atividades,
            usuarios,
        )
