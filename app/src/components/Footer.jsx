import { BrandMark } from "@/components/BrandMark"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="star-field mt-auto bg-[#090d18]">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-2">
                    <BrandMark className="h-4 w-4 text-primary" />
                    <span
                        className="text-sm text-[#ece7da]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ruta Estelar
                    </span>
                </div>
                <p className="text-xs text-[#7c8499]" style={{ fontFamily: "var(--font-mono)" }}>
                    &copy; {currentYear} · Observatorio astronómico
                </p>
            </div>
        </footer>
    )
}
