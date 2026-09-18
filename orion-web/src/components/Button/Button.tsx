import type { ButtonProp } from "./Button.types"
import { Link } from "react-router"
import * as Component from "./Button.styled"

export const Button = ({
    variante = "Branco",
    tamanho,
    loading,
    disabled,
    ativo,
    children,
    espacamento,
    icon: Icon,
    to,
    ladoIcon = "esquerda",
    ...props
}: ButtonProp) => {
    const linkProps = {
        LinkComponent: Link,
        viewTransition: true,
        rel: "noreferrer",
        to,
    }

    const iconSizeMap = {
        sm: 15,
        md: 20,
        lg: 25,
        xl: 30,
    }
    const iconSize = iconSizeMap[tamanho] || 20

    return (
        <Component.ButtonVariants
            disabled={disabled || loading}
            variante={variante}
            tamanho={tamanho}
            espacamento={espacamento || 0}
            ativo={ativo}
            {...props}
            {...(to && linkProps)}
        >
            {ladoIcon === "esquerda" && Icon && <Icon size={iconSize} />}
            <span>{children}</span>
            {ladoIcon === "direita" && Icon && <Icon size={iconSize} />}
        </Component.ButtonVariants>
    )
}