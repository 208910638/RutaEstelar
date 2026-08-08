import { Routes, Route } from "react-router-dom"
import { MainLayout } from "@/layouts/MainLayout"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { RegistroPage } from "@/pages/RegistroPage"
import { PerfilPage } from "@/pages/PerfilPage"
import { ServiciosPage } from "@/pages/ServiciosPage"
import { ServicioDetailPage } from "@/pages/ServicioDetailPage"
import { CreateServicioPage } from "@/pages/CreateServicioPage"
import { EditServicioPage } from "@/pages/EditServicioPage"
import { ComingSoonPage } from "@/pages/ComingSoonPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Acceso al sistema */}
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registro" element={<RegistroPage />} />

                {/* Cualquier usuario autenticado */}
                <Route
                    path="perfil"
                    element={
                        <ProtectedRoute>
                            <PerfilPage />
                        </ProtectedRoute>
                    }
                />

                {/* Servicios */}
                <Route path="servicios" element={<ServiciosPage />} />
                <Route path="servicios/nuevo" element={<CreateServicioPage />} />
                <Route path="servicios/:id" element={<ServicioDetailPage />} />
                <Route path="servicios/:id/editar" element={<EditServicioPage />} />
                
                <Route
                    path="adicionales"
                    element={
                        <ProtectedRoute roles={["Administrador", "Empleado"]}>
                            <ComingSoonPage titulo="Servicios adicionales" />
                        </ProtectedRoute>
                    }
                />

                {/* Solo Administrador */}
                <Route
                    path="empleados"
                    element={
                        <ProtectedRoute roles={["Administrador"]}>
                            <ComingSoonPage titulo="Empleados" />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="agenda"
                    element={
                        <ProtectedRoute roles={["Administrador"]}>
                            <ComingSoonPage titulo="Agenda diaria del establecimiento" />
                        </ProtectedRoute>
                    }
                />

                {/* Citas */}
                <Route
                    path="citas"
                    element={
                        <ProtectedRoute roles={["Administrador", "Empleado", "Cliente"]}>
                            <ComingSoonPage titulo="Citas" />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
