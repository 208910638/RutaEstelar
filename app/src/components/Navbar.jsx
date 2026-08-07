<<<<<<< HEAD
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandMark } from "@/components/BrandMark"

const TEMA_STORAGE_KEY = "rutaestelar_tema"

function obtenerPreferenciaInicial() {
    const guardado = localStorage.getItem(TEMA_STORAGE_KEY)
    if (guardado === "light") return false
    if (guardado === "dark") return true
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true
}
// El navbar mantiene siempre el fondo "cielo nocturno"
// independiente del tema claro/oscuro elegido para el resto
// por eso sus estlos de texto/hover usan valores fijos mejoerar eso
function linkClasses({ isActive }) {
    return [
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
        isActive
            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
            : "text-slate-300 hover:bg-white/10 hover:text-white",
    ].join(" ")
}

export function Navbar() {
    const [darkMode, setDarkMode] = useState(obtenerPreferenciaInicial)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode)
        localStorage.setItem(TEMA_STORAGE_KEY, darkMode ? "dark" : "light")
    }, [darkMode])

    return (
        <header className="star-field sticky top-0 z-50 bg-[#090d18]">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
                <NavLink to="/" className="flex items-center gap-2.5 group">
                    <BrandMark className="h-6 w-6 text-primary transition-transform group-hover:scale-105" />
                    <span
                        className="text-lg tracking-tight text-[#ece7da] md:text-xl font-semibold"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ruta Estelar
                    </span>
                </NavLink>

                {/* Nav simplificado */}
                <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1 shadow-sm backdrop-blur-md">
                    <NavLink to="/" end className={linkClasses}>
                        Inicio
                    </NavLink>
                    <NavLink to="/servicios" className={linkClasses}>
                        Servicios
                    </NavLink>
                    <NavLink to="/servicios/nuevo" className={linkClasses}>
                        Nuevo servicio
                    </NavLink>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDarkMode((prev) => !prev)}
                        aria-label="Cambiar tema"
                        className="rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                </div>
            </nav>
            <div className="horizon-line h-px w-full" />
        </header>
    )
}
=======
import { useEffect, useState } from "react";
import { CalendarDays, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    function toggleTheme() {
        setDarkMode((prev) => !prev);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">

                    <h1 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                        <span className="text-primary">🌌 Ruta Estelar</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 p-1 shadow-sm">
                    <Button
                        variant="ghost"
                        className="rounded-full px-4 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                        Inicio
                    </Button>

                    <Button
                        variant="ghost"
                        className="rounded-full px-4 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                        Eventos
                    </Button>

                    <Button
                        variant="ghost"
                        className="rounded-full px-4 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                        Crear evento
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                        className="rounded-full border-border bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </nav>
        </header>
    );
}
>>>>>>> b2c166aa14a778dcaaaf27ccb47aadf87e1879ce
