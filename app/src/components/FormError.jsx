import { CircleAlert } from "lucide-react" //Terminar formulario, ver presentaciín semana 11 

export function FormError({ message }) {
    if (!message) return null

    return (
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-destructive">
            <CircleAlert className="h-3.5 w-3.5 shrink-0" /> {message}
        </p>
    )
}
