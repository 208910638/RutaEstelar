import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registrarCliente } from "@/services/authService"
import { ApiError } from "@/services/apiClient"
import { toFieldErrors } from "@/lib/formErrors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const FORM_INICIAL = {
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    telefono: "",
    password: "",
}

function Campo({ id, label, children, error }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-foreground">
                {label}
            </label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
}

export function RegistroPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState(FORM_INICIAL)
    const [fieldErrors, setFieldErrors] = useState({})
    const [errorGeneral, setErrorGeneral] = useState(null)
    const [enviando, setEnviando] = useState(false)
    const [exito, setExito] = useState(false)

    function actualizarCampo(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setErrorGeneral(null)
        setFieldErrors({})
        setEnviando(true)

        try {
            // segundoApellido y telefono son opcionales: se envían
            // como null en vez de string vacío para respetar el DTO.
            await registrarCliente({
                nombre: form.nombre.trim(),
                primerApellido: form.primerApellido.trim(),
                segundoApellido: form.segundoApellido.trim() || null,
                correo: form.correo.trim(),
                telefono: form.telefono.trim() || null,
                password: form.password,
            })
            setExito(true)
            setTimeout(() => navigate("/login"), 1500)
        } catch (err) {
            if (err instanceof ApiError) {
                setFieldErrors(toFieldErrors(err))
                setErrorGeneral(err.errors ? null : err.message)
            } else {
                setErrorGeneral("No se pudo completar el registro. Intenta de nuevo.")
            }
        } finally {
            setEnviando(false)
        }
    }

    if (exito) {
        return (
            <div className="flex justify-center py-10">
                <Alert className="max-w-sm">
                    <AlertDescription>
                        Cuenta creada correctamente. Te estamos redirigiendo al inicio de sesión...
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="flex justify-center py-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Crear cuenta de cliente</CardTitle>
                    <CardDescription>
                        El registro público únicamente crea cuentas con rol Cliente.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <Campo id="nombre" label="Nombre" error={fieldErrors.nombre}>
                            <Input
                                id="nombre"
                                value={form.nombre}
                                onChange={(e) => actualizarCampo("nombre", e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </Campo>

                        <Campo id="primerApellido" label="Primer apellido" error={fieldErrors.primerApellido}>
                            <Input
                                id="primerApellido"
                                value={form.primerApellido}
                                onChange={(e) => actualizarCampo("primerApellido", e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </Campo>

                        <Campo id="segundoApellido" label="Segundo apellido (opcional)" error={fieldErrors.segundoApellido}>
                            <Input
                                id="segundoApellido"
                                value={form.segundoApellido}
                                onChange={(e) => actualizarCampo("segundoApellido", e.target.value)}
                                disabled={enviando}
                            />
                        </Campo>

                        <Campo id="correo" label="Correo electrónico" error={fieldErrors.correo}>
                            <Input
                                id="correo"
                                type="email"
                                value={form.correo}
                                onChange={(e) => actualizarCampo("correo", e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </Campo>

                        <Campo id="telefono" label="Teléfono (opcional)" error={fieldErrors.telefono}>
                            <Input
                                id="telefono"
                                value={form.telefono}
                                onChange={(e) => actualizarCampo("telefono", e.target.value)}
                                disabled={enviando}
                            />
                        </Campo>

                        <Campo id="password" label="Contraseña" error={fieldErrors.password}>
                            <Input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={(e) => actualizarCampo("password", e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </Campo>

                        {errorGeneral && (
                            <Alert variant="destructive">
                                <AlertDescription>{errorGeneral}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" disabled={enviando} className="w-full">
                            {enviando ? "Creando cuenta..." : "Registrarme"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-primary underline underline-offset-4">
                            Inicia sesión
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
