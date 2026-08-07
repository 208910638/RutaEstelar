import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Clock, Sparkles, Pencil } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { obtenerServicio } from "@/services/serviciosService"
import { getImageUrl } from "@/services/apiClient"

const formatoColones = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
})

export function ServicioDetailPage() {
    const { id } = useParams()
    const [servicio, setServicio] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerServicio(id)
            .then(setServicio)
            .catch(() => setError("No se pudo cargar el servicio."))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <p className="text-center text-muted-foreground">Cargando...</p>
    }

    if (error || !servicio) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error ?? "Servicio no encontrado."}</AlertDescription>
            </Alert>
        )
    }

    return (
        <section className="mx-auto max-w-3xl">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
                <Link to="/servicios">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a servicios
                </Link>
            </Button>

            <Card className="overflow-hidden">
                <div className="h-64 w-full overflow-hidden bg-muted">
                    <img
                        src={getImageUrl(servicio.imagen) ?? getImageUrl("image-not-found.jpg")}
                        alt={servicio.nombre}
                        className="h-full w-full object-cover"
                    />
                </div>
                <CardContent className="grid gap-4 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-2xl font-bold text-foreground">{servicio.nombre}</h1>
                        <Badge variant={servicio.activo ? "default" : "secondary"}>
                            {servicio.activo ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>

                    <p className="text-muted-foreground">{servicio.descripcion}</p>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            {servicio.duracionMinutos} minutos
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-primary" />
                            {servicio.especialidad?.nombre}
                        </div>
                    </div>

                    <p className="text-2xl font-semibold text-foreground">
                        {formatoColones.format(Number(servicio.precioBase))}
                    </p>

                    <Button variant="outline" className="w-fit" asChild>
                        <Link to={`/servicios/${servicio.id}/editar`}>
                            <Pencil className="h-4 w-4" />
                            Editar servicio
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}
