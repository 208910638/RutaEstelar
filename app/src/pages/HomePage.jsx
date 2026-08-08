export function HomePage() {
    return (
        <div className="space-y-6">
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


            <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Bienvenido a Ruta Estelar</h2>
                <p className="text-muted-foreground">
                    Tu observatorio astronómico de confianza. Explora el cosmos a través de nuestras
                    observaciones, talleres y conferencias.
                </p>
                <p className="text-muted-foreground mt-2">
                    Consulta nuestros próximos eventos y únete a la aventura estelar.
                </p>
            </section>
        </div>
    )
}