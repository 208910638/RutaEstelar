import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "@/components/PageHeader"
import { ServicioForm } from "@/components/ServicioForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ApiError } from "@/services/apiClient"
import { crearServicio } from "@/services/serviciosService"

export function CreateServicioPage() {
    const navigate = useNavigate()
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState(null)

    async function handleSubmit(datos) {
        setError(null)
        setEnviando(true)
        try {
            const servicio = await crearServicio(datos)
            navigate(`/servicios/${servicio.id}`)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "No se pudo crear el servicio.")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <section>
            <PageHeader
                title="Nuevo servicio"
                description="Complete la información para publicar un nuevo servicio del observatorio."
            />
            {error && (
                <Alert variant="destructive" className="mx-auto mb-6 max-w-3xl">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <ServicioForm onSubmit={handleSubmit} enviando={enviando} />
        </section>
    )
}
