import { z } from "zod"

// El API espera el nombre de un archivo ya existente en
// /assets/uploads, por eso el formulario ofrece un
// selector sobre las imágenes semilla en vez de un input de archivo.
export const IMAGENES_DISPONIBLES = [
    "astrofotografia.jpg",
    "cielo-invierno.jpg",
    "conferencia-agujeros-negros.jpg",
    "curso-constelaciones.jpg",
    "estacion-espacial.jpg",
    "estrellas-fugaces.jpg",
    "observacion-luna-llena.jpg",
    "planeta-marte.jpg",
]

export const servicioSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres.")
        .max(120, "El nombre no puede superar 120 caracteres."),
    descripcion: z
        .string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres.")
        .max(500, "La descripción no puede superar 500 caracteres."),
    precioBase: z.coerce
        .number({ message: "El precio debe ser numérico." })
        .positive("El precio debe ser mayor a cero.")
        .max(99999999.99, "El precio es demasiado alto."),
    duracionMinutos: z.coerce
        .number({ message: "La duración es obligatoria." })
        .int("La duración debe ser un número entero.")
        .min(15, "La duración mínima es de 15 minutos.")
        .max(480, "La duración no puede superar 8 horas."),
    especialidadId: z.coerce
        .number({ message: "Debe seleccionar una especialidad." })
        .int()
        .positive("Debe seleccionar una especialidad."),
    imagen: z
        .string()
        .min(1, "Debe seleccionar una imagen representativa."),
})
