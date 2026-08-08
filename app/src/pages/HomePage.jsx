export function HomePage() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-sm sm:p-12">
            <p
                className="text-xs font-medium uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                Observatorio · sesiones con reserva
            </p>

            <h2
                className="mt-3 max-w-xl text-3xl leading-tight text-foreground sm:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
            >
                Un punto de encuentro entre la ciudad y el cielo.
            </h2>

            <p className="mt-4 max-w-lg text-muted-foreground">
                Reserva observaciones guiadas, talleres de constelaciones y conferencias
                de astronomía con nuestro equipo. Cada cita se agenda a la medida del
                cielo de esa noche.
            </p>
        </section>
    )
}
