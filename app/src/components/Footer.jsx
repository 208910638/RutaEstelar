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