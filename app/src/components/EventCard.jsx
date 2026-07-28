import PropTypes from "prop-types"
import { FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const API_URL = import.meta.env.VITE_API_URL

export function EventCard({ event }) {
    const imageUrl = event.image ? `${API_URL}/images/${event.image}` : null

    return (
        <article className="group border border-border rounded-xl bg-card shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer transition-all duration-200 overflow-hidden">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                />
            ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Sin imagen</span>
                </div>
            )}

            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-base font-semibold text-foreground leading-tight text-left">
                    {event.title}
                </h3>

                <p className="text-xs text-muted-foreground flex items-start gap-1.5 text-left">
                    <FileText className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                    <span className="line-clamp-3">{event.description}</span>
                </p>

                <Button variant="outline" size="sm" className="mt-1 w-full gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Ver detalles
                </Button>
            </div>
        </article>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
    }).isRequired
}