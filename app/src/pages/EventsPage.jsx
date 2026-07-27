import { useState } from "react"
import { eventsData } from "@/services/eventsData"
import { EventList } from "@/components/EventList"

export function EventsPage() {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const eventsPerPage = 6

    const filteredEvents = eventsData.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    // Paginación
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
    const startIndex = (currentPage - 1) * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = filteredEvents.slice(startIndex, endIndex)

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    return (
        <section className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">🌌 Eventos</h2>
                <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-bold text-blue-800">
                    {filteredEvents.length}
                </span>
            </div>

            {/* Input de búsqueda */}
            <input
                type="text"
                placeholder="Buscar evento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Renderizado */}
            {filteredEvents.length === 0 ? (
                <p className="text-center text-gray-400 py-4">
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
                        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Anterior
                    </button>

                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`px-3 py-1 border rounded-md text-sm ${currentPage === number
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Siguente
                    </button>
                </div>
            )}
            </>
            )}
        </section>
    )
}