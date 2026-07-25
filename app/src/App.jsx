import { Navbar } from "@/components/Navbar"

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto p-4 w-full">
                {/* Aquí irán las páginas según la ruta */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Bienvenido a Ruta Estelar
                    </h2>
                    <p className="text-gray-600">
                        Explora el cosmos a través de nuestras observaciones astronómicas, 
                        tours estelares y talleres de astrofotografía.
                    </p>
                </div>
            </main>

        </div>
    )
}