import { AppBar, Box, Drawer, IconButton, Link, Stack, Tooltip } from "@mui/material"
import { CircleUser, LogIn, Menu, X } from "lucide-react"
import logo from "@/assets/images/logo.png"
import { useNavbar } from "./Navbar.hook"
import type { NavbarProps } from "./Navbar.types"
import { LINKS_NAVEGACAO } from "./Navbar.utils"
import * as styles from "./Navbar.styles"

export const Navbar = ({ escuroNoTopo = false}: NavbarProps) => {
    const { menuAberto, estaNoTopo, abrirMenu, fecharMenu, autenticado } = useNavbar()
    const escuro = escuroNoTopo && estaNoTopo

    return (
        <AppBar sx={styles.container(escuro)}>
            <Box sx={styles.conteudo}>
                <Link href="/#topo" aria-label="Voltar ao topo">
                    <Box component="img" src={logo} alt="Orion" sx={styles.logo} />
                </Link>

                <Box sx={styles.linksNavegacao}>
                    {LINKS_NAVEGACAO.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.legenda}
                        </Link>
                    ))}
                </Box>

                <Box sx={styles.acoesAutenticacao}>
                    {autenticado ? (
                        <Tooltip title="Meu perfil">
                            <Link href="/perfil" aria-label="Meu perfil" sx={styles.linkPerfil}>
                                <CircleUser size={24} strokeWidth={1.8} />
                            </Link>
                        </Tooltip>
                    ) : (
                        <>
                            <Link href="/login" sx={styles.linkEntrar}>
                                Entrar
                                <LogIn size={18} strokeWidth={1.8} />
                            </Link>
                            <Link href="/login?aba=cadastro">Criar conta</Link>
                        </>
                    )}
                </Box>

                <IconButton
                    sx={styles.botaoMenuMobile}
                    onClick={abrirMenu}
                    aria-label="Abrir menu de navegação"
                >
                    <Menu size={26} strokeWidth={2} />
                </IconButton>
            </Box>

            <Drawer
                anchor="right"
                open={menuAberto}
                onClose={fecharMenu}
                slotProps={{ paper: { sx: styles.menuMobilePaper } }}
            >
                <Box sx={styles.cabecalhoMenuMobile}>
                    <Box component="img" src={logo} alt="Orion" sx={styles.logo} />
                    <IconButton
                        sx={styles.botaoFecharMenu}
                        onClick={fecharMenu}
                        aria-label="Fechar menu de navegação"
                    >
                        <X size={24} strokeWidth={2} />
                    </IconButton>
                </Box>

                <Stack sx={styles.linksMenuMobile}>
                    {LINKS_NAVEGACAO.map((link) => (
                        <Link key={link.href} href={link.href} onClick={fecharMenu}>
                            {link.legenda}
                        </Link>
                    ))}

                    {autenticado ? (
                        <Link href="/perfil" onClick={fecharMenu} sx={styles.linkEntrar}>
                            Meu perfil
                            <CircleUser size={18} strokeWidth={1.8} />
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" onClick={fecharMenu} sx={styles.linkEntrar}>
                                Entrar
                                <LogIn size={18} strokeWidth={1.8} />
                            </Link>
                            <Link href="/login?aba=cadastro" onClick={fecharMenu}>
                                Criar conta
                            </Link>
                        </>
                    )}
                </Stack>
            </Drawer>
        </AppBar>
    )
}