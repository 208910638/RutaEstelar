export function Navbar() {
    return (
        <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                {/* Logo y nombre del observatorio */}
                <h1 className="text-xl font-bold">
                    🌌 Ruta Estelar
                </h1>

                {/* Enlaces de navegación */}
                <div className="flex gap-4">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Inicio
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Eventos
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Crear evento
                    </a>
                </div>
            </nav>
        </header>
    )
}