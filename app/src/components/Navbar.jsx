import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { BrandMark } from "@/components/BrandMark"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [theme, setTheme] = useState("dark")

    useEffect(() => {
        const root = document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"))
    }

    return (
        <header className="sticky top-0 z-50 bg-[#090d18]/80 backdrop-blur-md border-b border-border/40">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                {/* Logo a la izquierda */}
                <NavLink to="/" className="flex items-center gap-2.5">
                    <BrandMark className="h-4 w-4 text-[#d4af37]" />
                    <span
                        className="text-base font-normal tracking-wide text-[#ece7da]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ruta Estelar
                    </span>
                </NavLink>

                {/* Menú y botón de sesión agrupados a la derecha */}
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center rounded-full border border-border/60 bg-card/40 px-2 py-1 shadow-inner backdrop-blur-md">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#d4af37] text-slate-950 font-semibold shadow-sm"
                                        : "text-[#ece7da] hover:text-white"
                                }`
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/servicios"
                            className={({ isActive }) =>
                                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#d4af37] text-slate-950 font-semibold shadow-sm"
                                        : "text-[#ece7da] hover:text-white"
                                }`
                            }
                        >
                            Servicios
                        </NavLink>
                        <NavLink
                            to="/servicios/nuevo"
                            className={({ isActive }) =>
                                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#d4af37] text-slate-950 font-semibold shadow-sm"
                                        : "text-[#ece7da] hover:text-white"
                                }`
                            }
                        >
                            Crear evento
                        </NavLink>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Cambiar tema"
                            className="h-8 w-8 rounded-full text-[#ece7da] hover:bg-white/10 hover:text-white ml-1"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    </nav>

                    <Button asChild variant="outline" className="rounded-full border-border/60 bg-transparent px-5 py-1.5 text-sm font-normal text-[#ece7da] hover:bg-white/5 hover:text-white">
                        <NavLink to="/login">Iniciar sesión</NavLink>
                    </Button>
                </div>
            </div>
        </header>
    )
}