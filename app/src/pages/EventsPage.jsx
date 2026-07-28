import { useState, useEffect } from "react"
import { getEvents } from "@/services/eventsService"
import { EventList } from "@/components/EventList"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function EventsPage() {
    const [events, setEvents] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getEvents()
            .then((data) => {
                setEvents(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    const eventsPerPage = 6

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
    const startIndex = (currentPage - 1) * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = filteredEvents.slice(startIndex, endIndex)

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    if (loading) {
        return (
            <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 mt-6">
                <p className="text-center text-muted-foreground">Cargando eventos...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 mt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </section>
        )
    }

    return (
        <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">🌌 Eventos</h2>
                <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-bold text-primary">
                    {filteredEvents.length}
                </span>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar evento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {filteredEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                    No hay eventos que coincidan con tu búsqueda.
                </p>
            ) : (
                <>
                    <EventList events={currentEvents} />

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-border rounded-md text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground"
                            >
                                Anterior
                            </button>

                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={`px-3 py-1 border border-border rounded-md text-sm ${
                                        currentPage === number
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-border rounded-md text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}