import { api } from "./apiClient"

/**
 * Inicia sesión.
 * El backend únicamente responde { success, message, data: { token } },
 * no incluye el usuario en la misma respuesta, por lo que el perfil
 * debe consultarse por separado (ver obtenerPerfil) una vez guardado
 * el token. Esto es para despues aun no utilizo esto 
 */
export async function login(correo, password) {
    const result = await api.post("/usuarios/login", { correo, password })
    return result.data.token
}

/**
 * Registro público de clientes.
 * Solo puede crear usuarios con rol Cliente (el backend lo fuerza).
 */
export async function registrarCliente(datos) {
    const result = await api.post("/usuarios/registro", datos)
    return result.data
}

/**
 * Consulta el usuario autenticado a partir del token guardado.
 */
export async function obtenerPerfil() {
    const result = await api.get("/usuarios/perfil")
    return result.data
}
