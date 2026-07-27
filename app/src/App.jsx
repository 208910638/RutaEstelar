import { Navbar } from "@/components/Navbar"
import { HomePage } from "./pages/HomePage"
import { Footer } from "./components/Footer"
import { EventsPage } from "./pages/EventsPage"

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <main className="flex-1 max-w-5xl mx-auto p-4 w-full">
                <HomePage />
                <EventsPage />
            </main>
            <Footer />
        </div>
    )
}