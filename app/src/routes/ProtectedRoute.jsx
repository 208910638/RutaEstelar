import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

/**
 * Protege una ruta según sesión y rol.
 *Explicación de la logica para decil a luis
 * - Sin sesión -> redirige a /login (guardando la ruta de origen).
 * - Con sesión pero rol no permitido -> redirige a "/".
 * - `roles` vacío o ausente significa "cualquier usuario autenticado".
 */
export function ProtectedRoute({ children, roles }) {
    const { estaAutenticado, rol, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
                Verificando sesión...
            </div>
        )
    }

    if (!estaAutenticado) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (roles && roles.length > 0 && !roles.includes(rol)) {
        return <Navigate to="/" replace />
    }

    return children
}
