import { Box, Link, Stack, Typography } from "@mui/material"
import logo from "@/assets/images/logo.png"
import { SECOES } from "./Footer.utils"
import * as styles from "./Footer.styles"

export const Footer = () => {
    return (
        <Box component="footer" sx={styles.wrapper}>
            <Stack sx={styles.inner}>
                <Box sx={styles.brandBlock}>
                    <Link href="/#topo" aria-label="Voltar ao topo">
                        <Box component="img" src={logo} alt="Orion" sx={styles.logo} />
                    </Link>
                    <Typography sx={styles.tagline}>PLATAFORMA INTERATIVA MUSICAL</Typography>
                    <Typography sx={styles.description}>
                        Como luva inteligente que transforma cada toque em aprendizado,
                        conectando tecnologia e educação musical de forma interativa.
                    </Typography>
                </Box>

                <Box sx={styles.linksBlock}>
                    <Typography component="h4" sx={styles.columnTitle}>
                        Seções
                    </Typography>
                    <Box component="ul" sx={styles.linkList}>
                        {SECOES.map((secao) => (
                            <Box component="li" key={secao.legenda}>
                                <Link href={secao.href} sx={styles.linkItem}>
                                    {secao.legenda}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* <Box sx={styles.linksBlock}>
                    <Typography component="h4" sx={styles.columnTitle}>
                        Colaboradores
                    </Typography>
                    <Box sx={styles.collabList}>
                        {COLABORADORES.map((colaborador) => (
                            <Link
                                key={colaborador.nome}
                                href={colaborador.github}
                                target="_blank"
                                rel="noreferrer"
                                sx={styles.collabItem}
                            >
                                <CircleUserRound size={18} />
                                <span>{colaborador.nome}</span>
                            </Link>
                        ))}
                    </Box>
                </Box> */}
            </Stack>
        </Box>
    )
}