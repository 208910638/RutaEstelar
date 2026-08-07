import { api } from "./apiClient"

// Estos catálogos no tienen pantallas de mantenimiento: el enunciado
// solo permite consultarlos para usarlos internamente (login, formularios,
// validaciones de disponibilidad, etc.) 

export async function listarRoles() {
    const result = await api.get("/roles")
    return result.data
}

export async function listarEspecialidades() {
    const result = await api.get("/especialidades")
    return result.data
}

export async function listarEstadosCita() {
    const result = await api.get("/estados-cita")
    return result.data
}

export async function listarDiasSemana() {
    const result = await api.get("/dias-semana")
    return result.data
}

export async function listarTiposRestriccionHorario() {
    const result = await api.get("/tipos-restriccion-horario")
    return result.data
}
