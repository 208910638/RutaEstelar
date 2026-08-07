import { Link } from "react-router-dom"
import { Clock, Sparkles, ArrowRight, Pencil } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getImageUrl } from "@/services/apiClient"          

const formatoColones = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
})

export function ServicioCard({ servicio, puedeEditar = false }) {
    return (
        <Card className="group relative overflow-hidden border-border bg-card text-card-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
            <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative h-44 w-full overflow-hidden bg-muted">
                <img
                    src={getImageUrl(servicio.imagen || servicio.image) ?? getImageUrl("image-not-found.jpg")}
                    alt={servicio.title || servicio.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge
                    className="absolute top-2 right-2"
                    variant={servicio.active ?? servicio.activo ? "default" : "secondary"}
                >
                    {(servicio.active ?? servicio.activo) ? "Activo" : "Inactivo"}
                </Badge>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {servicio.title || servicio.nombre}
                </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary/70" />
                    <span>{servicio.durationMinutes || servicio.duracionMinutos || 0} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary/70" />
                    <span className="line-clamp-1">{servicio.category?.name || servicio.especialidad?.nombre || "Evento astronómico"}</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-foreground">
                    {formatoColones.format(Number(servicio.price || servicio.precioBase || 0))}
                </p>
            </CardContent>

            <CardFooter className="flex gap-2 pt-2">
                <Button variant="ghost" className="flex-1 bg-secondary/50 hover:bg-accent hover:text-accent-foreground" asChild>
                    <Link to={`/servicios/${servicio.id}`}>
                        Ver detalles
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                {puedeEditar && (
                    <Button variant="outline" size="icon" asChild>
                        <Link to={`/servicios/${servicio.id}/editar`} aria-label="Editar servicio">
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}