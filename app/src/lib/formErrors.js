/**
 * Convierte err.errors (lista [{ field, message }] que devuelve ApiError)
 * en un objeto { [campo]: mensaje } fácil de usar junto a cada <Input>. explicar a Luis 
 */
export function toFieldErrors(apiError) {
    if (!apiError?.errors) return {}
    return apiError.errors.reduce((acc, { field, message }) => {
        acc[field] = message
        return acc
    }, {})
}
