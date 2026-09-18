import { Box } from "@mui/material"
import type { ReactNode } from "react"
import { grade } from "./GradeCards.styled"

export const GradeCards = ({ children }: { children: ReactNode }) => {
    return <Box sx={grade}>{children}</Box>
}