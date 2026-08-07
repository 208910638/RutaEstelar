import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import { SearchBar } from "@/components/SearchBar"
import { ServicioCard } from "@/components/ServicioCard"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { listarServicios } from "@/services/serviciosService"

export function ServiciosPage() {
    const [servicios, setServicios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function cargar() {
            try {
                setLoading(true)
                // TODO: una vez reactivado el login, mostrar solo activos
                // a Cliente/Empleado y todos (incluidos inactivos) a
                // Administrador. Luis acordar 
                const data = await listarServicios()
                setServicios(data || [])
            } catch {
                setError("No se pudieron cargar los servicios.")
            } finally {
                setLoading(false)
            }
        }
        cargar()
    }, [])

    const serviciosFiltrados = servicios.filter((servicio) =>
    (servicio?.title || "").toLowerCase().includes((busqueda || "").toLowerCase())
)

    return (
        <section>
            <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                <PageHeader
                    title="Servicios"
                    description={serviciosFiltrados.length}
                    isBadge
                />
                <Button asChild>
                    <Link to="/servicios/nuevo">
                        <Plus className="h-4 w-4" />
                        Nuevo servicio
                    </Link>
                </Button>
            </div>

            <SearchBar
                value={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar servicio..."
            />

            {loading && (
                <p className="text-center text-muted-foreground">Cargando servicios...</p>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {!loading && !error && serviciosFiltrados.length === 0 && (
                <p className="text-center text-muted-foreground">No hay resultados.</p>
            )}

            {!loading && !error && serviciosFiltrados.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {serviciosFiltrados.map((servicio) => (
                        <ServicioCard
                            key={servicio.id}
                            servicio={servicio}
                            puedeEditar
                        />
                    ))}
                </div>
            )}
        </section>
    )
}