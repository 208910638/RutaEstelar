export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white text-center p-6 mt-auto">
            <p className="text-sm text-gray-400">
                © {currentYear} <span className="text-white font-medium">Ruta Estelar</span>.
                Todos los derechos reservados.
            </p>
        </footer>
    )
}