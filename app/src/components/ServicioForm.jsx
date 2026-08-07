import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Type, Text, DollarSign, Clock, Sparkles, ImageIcon } from "lucide-react"

import { servicioSchema, IMAGENES_DISPONIBLES } from "@/schemas/servicioSchema"
import { listarEspecialidades } from "@/services/catalogosService"
import { getImageUrl } from "@/services/apiClient"
import { FormError } from "@/components/FormError"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

/**
 * Formulario para crear y editar Servicios.
 * `initialData`, si se provee, precarga el formulario (modo edición).
 * `onSubmit` recibe los datos ya validados y con los tipos correctos
 * Hay que mejorar y cargar las cosas de mnera maás dinamica 
 */
export function ServicioForm({ initialData, onSubmit, enviando }) {
    const [especialidades, setEspecialidades] = useState([])
    const [cargandoEspecialidades, setCargandoEspecialidades] = useState(true)

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(servicioSchema),
        defaultValues: {
            nombre: initialData?.nombre ?? "",
            descripcion: initialData?.descripcion ?? "",
            precioBase: initialData?.precioBase ?? "",
            duracionMinutos: initialData?.duracionMinutos ?? "",
            especialidadId: initialData?.especialidadId
                ? String(initialData.especialidadId)
                : "",
            imagen: initialData?.imagen ?? "",
        },
    })

    const imagenSeleccionada = watch("imagen")

    useEffect(() => {
        listarEspecialidades()
            .then(setEspecialidades)
            .catch(() => setEspecialidades([]))
            .finally(() => setCargandoEspecialidades(false))
    }, [])

    function handleValidSubmit(formData) {
        onSubmit({
            ...formData,
            especialidadId: Number(formData.especialidadId),
        })
    }

    return (
        <Card className="mx-auto max-w-3xl border-border/70 shadow-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Datos del servicio</CardTitle>
                <CardDescription>
                    Este servicio quedará disponible para agendar citas una vez guardado.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(handleValidSubmit)}>
                <CardContent className="grid gap-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label htmlFor="nombre" className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <Type className="h-4 w-4 text-primary" />
                                Nombre del servicio
                            </label>
                            <Input
                                id="nombre"
                                placeholder="Ej: Observación guiada con telescopio"
                                className={errors.nombre ? "border-destructive" : ""}
                                {...register("nombre")}
                            />
                            <FormError message={errors.nombre?.message} />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="descripcion" className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <Text className="h-4 w-4 text-primary" />
                                Descripción
                            </label>
                            <Textarea
                                id="descripcion"
                                placeholder="Describa brevemente en qué consiste el servicio"
                                rows={4}
                                className={errors.descripcion ? "border-destructive" : ""}
                                {...register("descripcion")}
                            />
                            <FormError message={errors.descripcion?.message} />
                        </div>

                        <div>
                            <label htmlFor="precioBase" className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <DollarSign className="h-4 w-4 text-primary" />
                                Precio base
                            </label>
                            <Input
                                id="precioBase"
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="Ej: 15000"
                                className={errors.precioBase ? "border-destructive" : ""}
                                {...register("precioBase")}
                            />
                            <FormError message={errors.precioBase?.message} />
                        </div>

                        <div>
                            <label htmlFor="duracionMinutos" className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <Clock className="h-4 w-4 text-primary" />
                                Duración (minutos)
                            </label>
                            <Input
                                id="duracionMinutos"
                                type="number"
                                min="15"
                                max="480"
                                step="15"
                                placeholder="Ej: 90"
                                className={errors.duracionMinutos ? "border-destructive" : ""}
                                {...register("duracionMinutos")}
                            />
                            <FormError message={errors.duracionMinutos?.message} />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="especialidadId" className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Especialidad
                            </label>
                            <Controller
                                name="especialidadId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={cargandoEspecialidades}
                                    >
                                        <SelectTrigger className={errors.especialidadId ? "border-destructive" : ""}>
                                            <SelectValue
                                                placeholder={
                                                    cargandoEspecialidades
                                                        ? "Cargando especialidades..."
                                                        : "Seleccione una especialidad"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {especialidades.map((especialidad) => (
                                                <SelectItem
                                                    key={especialidad.id}
                                                    value={String(especialidad.id)}
                                                >
                                                    {especialidad.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormError message={errors.especialidadId?.message} />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <ImageIcon className="h-4 w-4 text-primary" />
                                Imagen representativa
                            </label>
                            <div
                                className={`grid gap-4 rounded-xl border p-4 md:grid-cols-[160px_1fr] ${
                                    errors.imagen ? "border-destructive" : "border-border"
                                }`}
                            >
                                <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                                    {imagenSeleccionada ? (
                                        <img
                                            src={getImageUrl(imagenSeleccionada)}
                                            alt="Vista previa"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Sin imagen</span>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center gap-2">
                                    <Controller
                                        name="imagen"
                                        control={control}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className={errors.imagen ? "border-destructive" : ""}>
                                                    <SelectValue placeholder="Seleccione una imagen" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {IMAGENES_DISPONIBLES.map((archivo) => (
                                                        <SelectItem key={archivo} value={archivo}>
                                                            {archivo}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        El API todavía no expone un endpoint de carga de
                                        archivos, por eso se elige entre las imágenes
                                        disponibles en el servidor.
                                    </p>
                                    <FormError message={errors.imagen?.message} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                    <Button type="submit" disabled={enviando}>
                        {enviando ? "Guardando..." : "Guardar servicio"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
