export function BrandMark({ className = "h-6 w-6" }) {   //nuestro logo
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
            <path
                d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.55"
            />
            <path
                d="M12 6.8 14 11l4.2 2-4.2 2-2 4.2-2-4.2L5.8 13l4.2-2 2-4.2Z"
                fill="currentColor"
            />
        </svg>
    )
}
