import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [enviando, setEnviando] = useState(false)

    const destino = location.state?.from?.pathname ?? "/"

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        if (!correo.trim() || !password) {
            setError("Debes ingresar correo y contraseña.")
            return
        }

        setEnviando(true)
        const exito = await login(correo.trim(), password)
        setEnviando(false)

        if (exito) {
            navigate(destino, { replace: true })
        } else {
            setError("Correo o contraseña incorrectos.")
        }
    }

    return (
        <div className="flex justify-center py-10">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Iniciar sesión</CardTitle>
                    <CardDescription>
                        Accede con tu correo y contraseña para gestionar tus citas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="correo" className="text-sm font-medium text-foreground">
                                Correo electrónico
                            </label>
                            <Input
                                id="correo"
                                type="email"
                                autoComplete="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                Contraseña
                            </label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={enviando}
                                required
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" disabled={enviando} className="w-full">
                            {enviando ? "Ingresando..." : "Ingresar"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-primary underline underline-offset-4">
                            Regístrate como cliente
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
