export function HomePage() {
    return (
        <section className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Inicio</h2>
            <p className="text-muted-foreground">
                Bienvenido a <strong className="text-foreground">Ruta Estelar</strong>, tu observatorio astronómico de confianza.
                Explora el cosmos a través de nuestras observaciones, talleres y conferencias.
            </p>
            <p className="text-muted-foreground mt-2">
                Consulta nuestros próximos eventos y únete a la aventura estelar.
            </p>
        </section>
    )
}