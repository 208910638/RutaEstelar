import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/**
 * Placeholder temporal para los módulos que todavía no se han
 * construido (Servicios, Adicionales, Empleados, Horarios,*/
export function ComingSoonPage({ titulo }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
                <CardDescription>Este módulo todavía no ha sido implementado.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                Próximamente disponible.
            </CardContent>
        </Card>
    )
}
