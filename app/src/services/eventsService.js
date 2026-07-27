const API_URL = import.meta.env.VITE_API_URL
console.log("API URL: ", API_URL)

export async function getEvents() {
    try {
        const response = await fetch(`${API_URL}/events`)

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        throw new Error("Error al obtener eventos. Por favor, intenta más tarde.")
    }
}