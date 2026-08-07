import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageHeader } from "@/components/PageHeader"
import { ServicioForm } from "@/components/ServicioForm"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ApiError } from "@/services/apiClient"
import {
    obtenerServicio,
    actualizarServicio,
    cambiarEstadoServicio,
} from "@/services/serviciosService"

export function EditServicioPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [servicio, setServicio] = useState(null)
    const [loading, setLoading] = useState(true)
    const [enviando, setEnviando] = useState(false)
    const [cambiandoEstado, setCambiandoEstado] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerServicio(id)
            .then(setServicio)
            .catch(() => setError("No se pudo cargar el servicio."))
            .finally(() => setLoading(false))
    }, [id])

    async function handleSubmit(datos) {
        setError(null)
        setEnviando(true)
        try {
            const actualizado = await actualizarServicio(id, datos)
            navigate(`/servicios/${actualizado.id}`)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "No se pudo actualizar el servicio.")
        } finally {
            setEnviando(false)
        }
    }

    async function handleToggleEstado() {
        setError(null)
        setCambiandoEstado(true)
        try {
            const actualizado = await cambiarEstadoServicio(id, !servicio.activo)
            setServicio(actualizado)
        } catch (err) {
            // Ej: "No se puede desactivar un servicio con citas pendientes o confirmadas"
            setError(err instanceof ApiError ? err.message : "No se pudo cambiar el estado.")
        } finally {
            setCambiandoEstado(false)
        }
    }

    if (loading) {
        return <p className="text-center text-muted-foreground">Cargando...</p>
    }

    if (!servicio) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error ?? "Servicio no encontrado."}</AlertDescription>
            </Alert>
        )
    }

    return (
        <section>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
                <PageHeader title="Editar servicio" description={servicio.nombre} />
                <Button
                    variant={servicio.activo ? "outline" : "default"}
                    onClick={handleToggleEstado}
                    disabled={cambiandoEstado}
                >
                    {cambiandoEstado
                        ? "Actualizando..."
                        : servicio.activo
                          ? "Desactivar servicio"
                          : "Activar servicio"}
                </Button>
            </div>

            {error && (
                <Alert variant="destructive" className="mx-auto mb-6 max-w-3xl">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <ServicioForm initialData={servicio} onSubmit={handleSubmit} enviando={enviando} />
        </section>
    )
}
