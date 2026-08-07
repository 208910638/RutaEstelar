const API_URL = import.meta.env.VITE_API_URL

const TOKEN_STORAGE_KEY = "rutaestelar_token"

/**
 * Errr personalizado para respuestas no exitosas del API.
 * Conserva el mensaje del backend y, si existe, el detalle de
 * validaciones (errores por campo) para poder mostralos en los
 * formularios.
 */
export class ApiError extends Error {
    constructor(message, status, errors) {
        super(message)
        this.name = "ApiError"
        this.status = status
        this.errors = errors ?? null
    }
}

export function getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
}

/**
 * Construye la URL absoluta de una imagen almacenada en el API
 * (carpeta /images) a partir del nombre de archivo guardado en un
 * registro (ej. servicio.imagen).
 */
export function getImageUrl(fileName) {
    if (!fileName) return null
    return `${API_URL}/images/${fileName}`
}

/**
 * Wrapper central para todas las llamadas al API.
 * - Agrega automáticamente el header Authorization2 cuando hay token.
 * - Serializa el body como JSON salvo que ya sea FormData.
 * - Normaliza los errores del backen
 *
 * @param {string} path - Ruta relativa, ej. "/servicios"
 * @param {RequestInit & { query?: Record<string, string|number|undefined> }} options
 */
export async function apiFetch(path, options = {}) {
    const { query, headers, body, ...rest } = options

    let url = `${API_URL}${path}`
    if (query) {
        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null && value !== "") {
                params.append(key, value)
            }
        }
        const queryString = params.toString()
        if (queryString) url += `?${queryString}`
    }

    const finalHeaders = { ...headers }
    const token = getToken()
    if (token) {
        finalHeaders["Authorization"] = `Bearer ${token}`
    }

    let finalBody = body
    if (body && !(body instanceof FormData)) {
        finalHeaders["Content-Type"] = "application/json"
        finalBody = JSON.stringify(body)
    }

    let response
    try {
        response = await fetch(url, {
            ...rest,
            headers: finalHeaders,
            body: finalBody,
        })
    } catch {
        throw new ApiError(
            "No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.",
            0
        )
    }

    // Algunas respuestas (204) no traen body.
    const text = await response.text()
    const data = text ? JSON.parse(text) : null

    if (!response.ok) {
        const message =
            data?.message ?? `Error HTTP ${response.status}`
        // El middleware de errores del API envía los errores de
        // validación de Zod bajo la clave "validationErrors":
        
        const errors = data?.validationErrors ?? null
        throw new ApiError(message, response.status, errors)
    }

    return data
}

export const api = {
    get: (path, query) => apiFetch(path, { method: "GET", query }),
    post: (path, body) => apiFetch(path, { method: "POST", body }),
    put: (path, body) => apiFetch(path, { method: "PUT", body }),
    patch: (path, body) => apiFetch(path, { method: "PATCH", body }),
}
