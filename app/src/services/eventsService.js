const API_URL = import.meta.env.VITE_API_URL

export async function getEvents() {
    try {
        const response = await fetch(`${API_URL}/servicios`)

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const result = await response.json()

        const eventos = result.data ?? result

        return eventos.map((item) => ({
            id: item.id,
            title: item.nombre,
            description: item.descripcion,
            image: item.imagen,
        }))
    } catch (error) {
        throw new Error("Error al obtener eventos. Por favor, intenta más tarde.")
    }
}