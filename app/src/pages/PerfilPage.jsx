import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function Dato({ label, valor }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
            <span className="text-foreground">{valor || "—"}</span>
        </div>
    )
}

export function PerfilPage() {
    const { usuario } = useAuth()

    if (!usuario) return null

    const nombreCompleto = [usuario.nombre, usuario.primerApellido, usuario.segundoApellido]
        .filter(Boolean)
        .join(" ")

    return (
        <div className="flex justify-center py-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Mi perfil</CardTitle>
                        <Badge>{usuario.rol?.nombre}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Dato label="Nombre completo" valor={nombreCompleto} />
                    <Dato label="Correo" valor={usuario.correo} />
                    <Dato label="Teléfono" valor={usuario.telefono} />
                    <Dato label="Estado" valor={usuario.activo ? "Activo" : "Inactivo"} />
                </CardContent>
            </Card>
        </div>
    )
}
