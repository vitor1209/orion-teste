import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"

export const RolarParaTopo = () => {
    const { pathname, search } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname, search])

    return (
        <Outlet />
    )
}