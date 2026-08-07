<<<<<<< HEAD
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
=======
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card text-card-foreground border-t border-border p-6 mt-auto">
            <p className="text-sm text-muted-foreground text-center">
                &copy; {currentYear} <span className="text-foreground font-medium">Ruta Estelar</span>.
                Todos los derechos reservados.
            </p>
        </footer>
    )
}
>>>>>>> b2c166aa14a778dcaaaf27ccb47aadf87e1879ce
