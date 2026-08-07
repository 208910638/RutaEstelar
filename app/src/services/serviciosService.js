import { api } from "./apiClient"

export async function listarServicios() {
    const result = await api.get("/servicios")
    return result.data
}

export async function listarServiciosActivos() {
    const result = await api.get("/servicios/activos")
    return result.data
}

export async function obtenerServicio(id) {
    const result = await api.get(`/servicios/${id}`)
    return result.data
}

export async function crearServicio(datos) {
    const result = await api.post("/servicios", datos)
    return result.data
}

export async function actualizarServicio(id, datos) {
    const result = await api.put(`/servicios/${id}`, datos)
    return result.data
}

export async function cambiarEstadoServicio(id, activo) {
    const result = await api.patch(`/servicios/${id}/estado`, { activo })
    return result.data
}
