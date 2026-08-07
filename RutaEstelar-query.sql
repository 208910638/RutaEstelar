START TRANSACTION;

INSERT IGNORE INTO especialidades (id, nombre, descripcion, activo) VALUES
(2, 'Observación Astronómica', 'Actividades de observación del cielo nocturno y cuerpos celestes.', true),
(3, 'Astrofotografía', 'Captura y procesamiento de imágenes astronómicas profesionales.', true),
(4, 'Educación Espacial', 'Charlas, cursos y conferencias sobre astronomía y exploración espacial.', true);

INSERT IGNORE INTO servicios (id, nombre, descripcion, precioBase, duracionMinutos, especialidadId, activo, creadoEn, actualizadoEn) VALUES
(1, 'Observación de la Luna Llena', 'Observación guiada de la Luna Llena desde el Mirador Norte con telescopio profesional.', 15000.00, 60, 2, true, NOW(), NOW()),
(2, 'Taller de Astrofotografía Nocturna', 'Taller práctico de fotografía astronómica nocturna en el Laboratorio de Imagen.', 25000.00, 120, 3, true, NOW(), NOW()),
(3, 'Conferencia: Agujeros Negros', 'Conferencia interactiva sobre agujeros negros y fenómenos del espacio-tiempo en el Auditorio Estelar.', 10000.00, 90, 4, true, NOW(), NOW()),
(4, 'Tour Guiado por el Cielo de Invierno', 'Recorrido guiado identificando constelaciones y estrellas del cielo invernal en el Observatorio Principal.', 20000.00, 120, 2, true, NOW(), NOW()),
(5, 'Charla sobre la Estación Espacial Internacional', 'Charla educativa sobre la vida y experimentos en la EEI en la Sala de Proyecciones.', 8000.00, 60, 4, true, NOW(), NOW()),
(6, 'Noche de Estrellas Fugaces', 'Velada especial para la observación de lluvias de estrellas y meteoros en Campo Abierto.', 18000.00, 90, 2, true, NOW(), NOW()),
(7, 'Curso de Constelaciones Básicas', 'Curso introductorio para aprender a identificar las constelaciones en el Aula Magna.', 12000.00, 60, 4, true, NOW(), NOW()),
(8, 'Observación del Planeta Marte', 'Sesión especial de observación de Marte en su punto más cercano a la Tierra en el Mirador Sur.', 22000.00, 90, 2, true, NOW(), NOW());

INSERT IGNORE INTO servicios_adicionales (id, nombre, descripcion, precio, activo, creadoEn, actualizadoEn) VALUES
(1, 'Renta de Telescopio', 'Uso de telescopio profesional durante toda la actividad.', 5000.00, true, NOW(), NOW()),
(2, 'Coffee Break Espacial', 'Café, té y bocadillos temáticos durante la actividad.', 3000.00, true, NOW(), NOW()),
(3, 'Material Didáctico', 'Guía impresa y mapa estelar personalizado.', 2000.00, true, NOW(), NOW()),
(4, 'Fotografía Profesional', 'Fotografía de la experiencia con equipo especializado.', 8000.00, true, NOW(), NOW()),
(5, 'Transporte al Mirador', 'Traslado ida y vuelta desde el punto de encuentro.', 6000.00, true, NOW(), NOW()),
(6, 'Guía Personalizado', 'Acompañamiento exclusivo de un guía astrónomo.', 7000.00, true, NOW(), NOW()),
(7, 'Certificado de Participación', 'Certificado digital conmemorativo.', 1500.00, true, NOW(), NOW()),
(8, 'Snack Estelar', 'Snacks astronómicos y bebida hidratante.', 2500.00, true, NOW(), NOW());

INSERT IGNORE INTO horarios_atencion (id, diaSemanaId, horaInicio, horaFin, activo) VALUES
(1, 1, '08:00', '12:00', true), (2, 1, '14:00', '18:00', true),
(3, 2, '08:00', '12:00', true), (4, 2, '14:00', '18:00', true),
(5, 3, '08:00', '12:00', true), (6, 3, '14:00', '18:00', true),
(7, 4, '08:00', '12:00', true), (8, 4, '14:00', '18:00', true),
(9, 5, '08:00', '12:00', true), (10, 5, '14:00', '18:00', true),
(11, 6, '09:00', '13:00', true),
(12, 7, '10:00', '14:00', true);

INSERT IGNORE INTO usuarios (id, nombre, primerApellido, segundoApellido, correo, telefono, passwordHash, activo, rolId, creadoEn, actualizadoEn) VALUES
(2, 'Carlos', 'Mora', 'Rojas', 'carlos.mora@rutaestelar.com', '8888-1001', '$2b$10$Gl6T6nnYj4gHmvTnSpRBAeFR53S352OBcZghtDT3cBKglVv4FFEm6', true, 2, NOW(), NOW()),
(3, 'Ana', 'Jiménez', 'Pérez', 'ana.jimenez@rutaestelar.com', '8888-1002', '$2b$10$Gl6T6nnYj4gHmvTnSpRBAeFR53S352OBcZghtDT3cBKglVv4FFEm6', true, 2, NOW(), NOW()),
(4, 'Luis', 'Vargas', 'Solano', 'luis.vargas@rutaestelar.com', '8888-1003', '$2b$10$Gl6T6nnYj4gHmvTnSpRBAeFR53S352OBcZghtDT3cBKglVv4FFEm6', true, 2, NOW(), NOW()),
(5, 'Sofía', 'Martínez', 'López', 'sofia.martinez@rutaestelar.com', '8888-2001', '$2b$10$rRUIWQX6czzOooD036x3uejOa65IjTAAH450hj60Vs25KPSB72Ne2', true, 3, NOW(), NOW()),
(6, 'Diego', 'Hernández', 'Ruiz', 'diego.hernandez@rutaestelar.com', '8888-2002', '$2b$10$rRUIWQX6czzOooD036x3uejOa65IjTAAH450hj60Vs25KPSB72Ne2', true, 3, NOW(), NOW());

INSERT IGNORE INTO empleados (id, usuarioId, especialidadId, codigoEmpleado, descripcion, activo, creadoEn, actualizadoEn) VALUES
(1, 2, 2, 'EMP-001', 'Especialista en observación astronómica y guía de tours celestes.', true, NOW(), NOW()),
(2, 3, 3, 'EMP-002', 'Fotógrafa astronómica profesional y tallerista de astrofotografía.', true, NOW(), NOW()),
(3, 4, 4, 'EMP-003', 'Educador espacial, conferencista y profesor de astronomía.', true, NOW(), NOW());

INSERT IGNORE INTO `_EmpleadoServicios` (A, B) VALUES
(1, 1), (1, 4), (1, 6), (1, 8),
(2, 2), (2, 5), (2, 7),
(3, 3), (3, 5), (3, 7);

INSERT IGNORE INTO restricciones_horario (id, tipoRestriccionId, empleadoId, fecha, horaInicio, horaFin, todoElDia, motivo, activo, creadoEn, actualizadoEn) VALUES
(1, 1, NULL, '2026-08-15', NULL, NULL, true, 'Mantenimiento general de instalaciones del observatorio.', true, NOW(), NOW()),
(2, 1, NULL, '2026-08-20', '08:00', '12:00', false, 'Capacitación institucional obligatoria.', true, NOW(), NOW()),
(3, 2, 1, '2026-08-10', NULL, NULL, true, 'Congreso Nacional de Astronomía (Carlos).', true, NOW(), NOW()),
(4, 2, 2, '2026-08-12', '08:00', '12:00', false, 'Taller de edición fotográfica avanzada (Ana).', true, NOW(), NOW()),
(5, 2, 3, '2026-08-14', '14:00', '18:00', false, 'Reunión de planificación académica (Luis).', true, NOW(), NOW()),
(6, 3, NULL, '2026-08-18', '08:00', '10:00', false, 'Sesión de fotografía institucional.', true, NOW(), NOW()),
(7, 3, NULL, '2026-08-21', '15:00', '17:00', false, 'Inventario de equipos ópticos.', true, NOW(), NOW()),
(8, 4, NULL, '2026-08-25', NULL, NULL, true, 'Feriado: Día Nacional de la Astronomía.', true, NOW(), NOW());

INSERT IGNORE INTO citas (id, clienteId, empleadoId, servicioId, estadoCitaId, creadoPorUsuarioId, fecha, horaInicio, horaFin, duracionMinutos, precioServicio, costoAdicionales, costoTotal, observaciones, creadoEn, actualizadoEn) VALUES
(1, 5, 1, 1, 1, 1, '2026-07-28', '09:00', '10:00', 60, 15000.00, 5000.00, 20000.00, 'Cliente solicita telescopio.', NOW(), NOW()),
(2, 6, 2, 2, 1, 1, '2026-07-29', '09:00', '11:00', 120, 25000.00, 0, 25000.00, NULL, NOW(), NOW()),
(3, 5, 3, 3, 1, 1, '2026-07-30', '14:00', '15:30', 90, 10000.00, 0, 10000.00, 'Interesado en viajes en el tiempo.', NOW(), NOW()),
(4, 6, 1, 4, 1, 1, '2026-07-31', '09:00', '11:00', 120, 20000.00, 0, 20000.00, NULL, NOW(), NOW()),
(5, 5, 3, 5, 2, 1, '2026-07-28', '14:00', '15:00', 60, 8000.00, 3000.00, 11000.00, 'Incluir Coffee Break.', NOW(), NOW()),
(6, 6, 1, 6, 2, 1, '2026-07-29', '14:00', '15:30', 90, 18000.00, 0, 18000.00, NULL, NOW(), NOW()),
(7, 5, 2, 7, 2, 1, '2026-07-30', '10:00', '11:00', 60, 12000.00, 0, 12000.00, 'Traerá su cámara.', NOW(), NOW()),
(8, 6, 3, 3, 2, 1, '2026-07-31', '14:00', '15:30', 90, 10000.00, 0, 10000.00, NULL, NOW(), NOW()),
(9, 5, 1, 1, 4, 1, '2026-07-22', '09:00', '10:00', 60, 15000.00, 7500.00, 22500.00, 'Experiencia excelente.', NOW(), NOW()),
(10, 6, 2, 2, 4, 1, '2026-07-23', '10:00', '12:00', 120, 25000.00, 0, 25000.00, 'Fotos de la Vía Láctea.', NOW(), NOW()),
(11, 5, 3, 5, 4, 1, '2026-07-24', '14:00', '15:00', 60, 8000.00, 0, 8000.00, 'Charla muy participativa.', NOW(), NOW()),
(12, 6, 1, 4, 5, 1, '2026-07-24', '09:00', '11:00', 120, 20000.00, 7000.00, 27000.00, NULL, NOW(), NOW()),
(13, 5, 2, 7, 5, 1, '2026-07-25', '10:00', '11:00', 60, 12000.00, 0, 12000.00, NULL, NOW(), NOW());

INSERT IGNORE INTO `_CitaAdicionales` (A, B) VALUES
(1, 1), (5, 2), (9, 1), (9, 8), (12, 6);

INSERT IGNORE INTO servicios (id, nombre, descripcion, precioBase, duracionMinutos, especialidadId, activo, creadoEn, actualizadoEn) VALUES
(1, 'Observación de la Luna Llena', 'Observación guiada de la Luna Llena desde el Mirador Norte con telescopio profesional.', 15000.00, 60, 2, true, NOW(), NOW()),
(2, 'Taller de Astrofotografía Nocturna', 'Taller práctico de fotografía astronómica nocturna en el Laboratorio de Imagen.', 25000.00, 120, 3, true, NOW(), NOW()),
(3, 'Conferencia: Agujeros Negros', 'Conferencia interactiva sobre agujeros negros y fenómenos del espacio-tiempo en el Auditorio Estelar.', 10000.00, 90, 4, true, NOW(), NOW()),
(4, 'Tour Guiado por el Cielo de Invierno', 'Recorrido guiado identificando constelaciones y estrellas del cielo invernal en el Observatorio Principal.', 20000.00, 120, 2, true, NOW(), NOW()),
(5, 'Charla sobre la Estación Espacial Internacional', 'Charla educativa sobre la vida y experimentos en la EEI en la Sala de Proyecciones.', 8000.00, 60, 4, true, NOW(), NOW()),
(6, 'Noche de Estrellas Fugaces', 'Velada especial para la observación de lluvias de estrellas y meteoros en Campo Abierto.', 18000.00, 90, 2, true, NOW(), NOW()),
(7, 'Curso de Constelaciones Básicas', 'Curso introductorio para aprender a identificar las constelaciones en el Aula Magna.', 12000.00, 60, 4, true, NOW(), NOW()),
(8, 'Observación del Planeta Marte', 'Sesión especial de observación de Marte en su punto más cercano a la Tierra en el Mirador Sur.', 22000.00, 90, 2, true, NOW(), NOW());

-- Servicios
UPDATE servicios SET imagen = 'observacion-luna-llena.jpg' WHERE id = 1;
UPDATE servicios SET imagen = 'astrofotografia.jpg' WHERE id = 2;
UPDATE servicios SET imagen = 'conferencia-agujeros-negros.jpg' WHERE id = 3;
UPDATE servicios SET imagen = 'cielo-invierno.jpg' WHERE id = 4;
UPDATE servicios SET imagen = 'estacion-espacial.jpg' WHERE id = 5;
UPDATE servicios SET imagen = 'estrellas-fugaces.jpg' WHERE id = 6;
UPDATE servicios SET imagen = 'curso-constelaciones.jpg' WHERE id = 7;
UPDATE servicios SET imagen = 'planeta-marte.jpg' WHERE id = 8;

COMMIT;