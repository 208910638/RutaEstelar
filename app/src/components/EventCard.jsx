import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCalendarDays,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons"

export function EventCard({ event }) {
    return (
        <article className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarDays} className="text-indigo-500 w-4 h-4" />
                <span>{event.date}</span>
            </p>
            <p className="text-sm text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="text-red-500 w-4 h-4" />
                <span>{event.location}</span>
            </p>
        </article>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
    }).isRequired
}
