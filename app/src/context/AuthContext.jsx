import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { getToken, setToken as persistToken, ApiError } from "@/services/apiClient"
import { login as loginRequest, obtenerPerfil } from "@/services/authService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    // "loading" cubre únicamente la verificación inicial de sesión
    // (token guardado -> perfil), no cda login individual.
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const cargarPerfil = useCallback(async () => {
        try {
            const perfil = await obtenerPerfil()
            setUsuario(perfil)
        } catch {
            // Token inválido o expirado: limpiar sesión silenciosamemn
            persistToken(null)
            setUsuario(null)
        }
    }, [])

    useEffect(() => {
        const token = getToken()
        if (!token) {
            setLoading(false)
            return
        }
        cargarPerfil().finally(() => setLoading(false))
    }, [cargarPerfil])

    async function login(correo, password) {
        setError(null)
        try {
            const token = await loginRequest(correo, password)
            persistToken(token)
            await cargarPerfil()
            return true
        } catch (err) {
            const message =
                err instanceof ApiError
                    ? err.message
                    : "No se pudo iniciar sesión. Intenta de nuevo."
            setError(message)
            return false
        }
    }

    function logout() {
        persistToken(null)
        setUsuario(null)
    }

    const value = {
        usuario,
        rol: usuario?.rol?.nombre ?? null,
        estaAutenticado: Boolean(usuario),
        loading,
        error,
        login,
        logout,
        setUsuario,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe utilizarse dentro de un AuthProvider")
    }
    return context
}
