export const rolePermissions = {
  director: ["sectores", "monitoreo", "activos", "roi", "propuesta", "soporte", "admin"],
  operador: ["monitoreo", "activos", "soporte"],
  tecnico: ["activos", "monitoreo", "soporte"],
  ventas: ["sectores", "roi", "propuesta", "monitoreo"],
};

export const users = [
  {
    email: "admin@indusvue.com",
    password: "IndusVue2026!",
    name: "Elian David",
    role: "Director",
    roleId: "director",
    title: "Director de operaciones",
  },
  {
    email: "operador@indusvue.com",
    password: "Operador2026!",
    name: "Operador Demo",
    role: "Operador",
    roleId: "operador",
    title: "Sala de control",
  },
  {
    email: "tecnico@indusvue.com",
    password: "Tecnico2026!",
    name: "Tecnico Demo",
    role: "Tecnico",
    roleId: "tecnico",
    title: "Mantenimiento predictivo",
  },
  {
    email: "ventas@indusvue.com",
    password: "Demo2026!",
    name: "Equipo Comercial",
    role: "Ventas",
    roleId: "ventas",
    title: "Consultor enterprise",
  },
];

export const clients = [
  {
    id: "cfe",
    name: "CFE",
    sectorId: "energia",
    site: "Central ciclo combinado Bajio",
    audience: "Director de generacion y confiabilidad",
    commercialFocus: "Reducir paros forzados, proteger transformadores y justificar mantenimiento por condicion.",
  },
  {
    id: "refineria",
    name: "Refineria",
    sectorId: "oil-gas",
    site: "Tren de bombeo y compresion",
    audience: "Gerencia de mantenimiento e integridad mecanica",
    commercialFocus: "Disminuir riesgo HSE, cavitacion, fugas y eventos de presion fuera de rango.",
  },
  {
    id: "automotriz",
    name: "Automotriz",
    sectorId: "manufactura",
    site: "Linea de estampado y ensamble",
    audience: "Gerencia de planta y mejora continua",
    commercialFocus: "Incrementar OEE, reducir scrap y anticipar fallas en prensas, robots y CNC.",
  },
  {
    id: "cedis",
    name: "CEDIS",
    sectorId: "logistica",
    site: "Centro de distribucion nacional",
    audience: "Direccion de supply chain",
    commercialFocus: "Cumplir SLA, evitar saturacion de andenes y mejorar disponibilidad de conveyors/flota.",
  },
  {
    id: "ptar",
    name: "PTAR",
    sectorId: "agua",
    site: "Planta de tratamiento municipal",
    audience: "Direccion tecnica de agua",
    commercialFocus: "Cumplir norma, reducir quimicos y estabilizar bombeo, sopladores y calidad de efluente.",
  },
];

export const sectors = [
  {
    id: "energia",
    name: "Generacion electrica",
    plant: "Turbinas, generadores, transformadores y balance de planta",
    headline: "Prediccion de fallas para activos que no pueden detenerse.",
    color: "#38bdf8",
    route: "/monitoreo",
    recommendedPlan: "Enterprise Ops",
    price: "$7,900 USD/mes",
    roi: "9.8x",
    payback: "4.2 meses",
    commercialMessage: "IndusVue ayuda a justificar mantenimiento por condicion y evitar paros forzados de alto costo.",
    metrics: [
      { label: "Disponibilidad", value: "99.4%", detail: "SLA objetivo 98.5%" },
      { label: "Carga estable", value: "482 MW", detail: "Variacion bajo control" },
      { label: "Ahorro anual", value: "$1.8M", detail: "Paros evitados" },
      { label: "Riesgo IA", value: "18%", detail: "Falla probable baja" },
    ],
    assets: [
      { id: "TG-01", name: "Turbina de gas", area: "Generacion", health: 94, status: "Operativo", signal: "Vibracion 2.4 mm/s" },
      { id: "G-04", name: "Generador principal", area: "Casa de maquinas", health: 88, status: "Revision", signal: "Deriva termica" },
      { id: "TR-02", name: "Transformador elevador", area: "Subestacion", health: 96, status: "Operativo", signal: "Aceite estable" },
      { id: "BOP-12", name: "Bomba de alimentacion", area: "Balance de planta", health: 91, status: "Operativo", signal: "Presion normal" },
    ],
    useCases: ["Vibracion en turbinas", "Temperatura de rodamientos", "Carga MW", "Calidad de energia"],
    stack: ["SCADA", "PLC", "Historian", "ISO 55000"],
    aiPrediction: {
      probability: "18%",
      asset: "Generador G-04",
      cause: "Deriva termica en devanado",
      action: "Inspeccion termografica en 96 horas",
      impact: "$126,000 USD",
      recommendation: "Programar ventana corta y validar ventilacion del generador.",
    },
    alerts: [
      { severity: "media", title: "G-04 con temperatura ascendente", detail: "Tendencia detectada durante carga pico." },
      { severity: "baja", title: "TG-01 vibracion estable", detail: "Sin resonancia fuera de rango." },
    ],
    chart: [
      { label: "Lun", health: 94, failures: 2, production: 88, risk: 16 },
      { label: "Mar", health: 95, failures: 1, production: 91, risk: 14 },
      { label: "Mie", health: 92, failures: 3, production: 86, risk: 22 },
      { label: "Jue", health: 97, failures: 1, production: 94, risk: 12 },
      { label: "Vie", health: 96, failures: 1, production: 93, risk: 15 },
      { label: "Sab", health: 98, failures: 0, production: 96, risk: 9 },
    ],
  },
  {
    id: "manufactura",
    name: "Manufactura pesada",
    plant: "Lineas robotizadas, hornos, prensas, CNC y utilities",
    headline: "OEE ejecutivo y mantenimiento predictivo para equipos de alto costo.",
    color: "#4ade80",
    route: "/monitoreo",
    recommendedPlan: "Enterprise Ops",
    price: "$6,400 USD/mes",
    roi: "7.1x",
    payback: "5.1 meses",
    commercialMessage: "Convierte datos de planta en decisiones de produccion: menos scrap, menos paros, mas OEE.",
    metrics: [
      { label: "OEE promedio", value: "86.8%", detail: "+6.2 pts vs base" },
      { label: "Scrap evitado", value: "$310K", detail: "Anual estimado" },
      { label: "Ahorro anual", value: "$920K", detail: "Paros y retrabajo" },
      { label: "Riesgo IA", value: "24%", detail: "Sobrecarga en prensa" },
    ],
    assets: [
      { id: "PR-18", name: "Prensa hidraulica", area: "Estampado", health: 82, status: "Revision", signal: "Pico de corriente" },
      { id: "RB-07", name: "Robot soldadura", area: "Body shop", health: 93, status: "Operativo", signal: "Ciclo estable" },
      { id: "CNC-11", name: "Centro CNC", area: "Maquinado", health: 90, status: "Operativo", signal: "Spindle normal" },
      { id: "CMP-03", name: "Compresor aire", area: "Utilities", health: 86, status: "Revision", signal: "Fuga probable" },
    ],
    useCases: ["OEE por linea", "Paros no programados", "Consumo por lote", "Control de scrap"],
    stack: ["MES", "OPC-UA", "CMMS", "Lean Six Sigma"],
    aiPrediction: {
      probability: "24%",
      asset: "Prensa PR-18",
      cause: "Sobrecarga hidraulica repetitiva",
      action: "Inspeccion de valvulas y aceite en 72 horas",
      impact: "$74,000 USD",
      recommendation: "Reducir velocidad de ciclo 3% hasta cierre de orden tecnica.",
    },
    alerts: [
      { severity: "media", title: "PR-18 supera corriente nominal", detail: "Tres eventos en los ultimos dos turnos." },
      { severity: "baja", title: "RB-07 estable", detail: "Sin desviacion de tiempo de ciclo." },
    ],
    chart: [
      { label: "Lun", health: 88, failures: 4, production: 82, risk: 26 },
      { label: "Mar", health: 91, failures: 3, production: 86, risk: 22 },
      { label: "Mie", health: 93, failures: 2, production: 89, risk: 18 },
      { label: "Jue", health: 90, failures: 3, production: 85, risk: 24 },
      { label: "Vie", health: 95, failures: 1, production: 92, risk: 14 },
      { label: "Sab", health: 96, failures: 1, production: 94, risk: 12 },
    ],
  },
  {
    id: "oil-gas",
    name: "Petroleo y gas",
    plant: "Refineria, bombas API 610, ductos, compresores y seguridad HSE",
    headline: "Integridad mecanica y riesgo operacional antes de que escale.",
    color: "#fb923c",
    route: "/monitoreo",
    recommendedPlan: "Mission Critical",
    price: "$9,800 USD/mes",
    roi: "11.2x",
    payback: "3.6 meses",
    commercialMessage: "Una alerta temprana puede evitar perdidas productivas, incidentes HSE y dano reputacional.",
    metrics: [
      { label: "Presion segura", value: "94.7%", detail: "Rangos dentro de limite" },
      { label: "Riesgo HSE", value: "Controlado", detail: "2 alertas preventivas" },
      { label: "Ahorro anual", value: "$2.4M", detail: "Eventos evitados" },
      { label: "Riesgo IA", value: "31%", detail: "Cavitacion temprana" },
    ],
    assets: [
      { id: "API-610-B22", name: "Bomba API 610", area: "Tren de bombeo", health: 79, status: "Critico", signal: "Cavitacion probable" },
      { id: "CMP-08", name: "Compresor centrifugo", area: "Compresion", health: 87, status: "Revision", signal: "Vibracion axial" },
      { id: "DCT-14", name: "Ducto presurizado", area: "Transferencia", health: 92, status: "Operativo", signal: "Presion estable" },
      { id: "SIS-03", name: "Sistema instrumentado", area: "Seguridad", health: 98, status: "Operativo", signal: "Prueba vigente" },
    ],
    useCases: ["Bombas API 610", "Presion de ductos", "Compresores", "Riesgo HSE", "Cavitacion o fuga"],
    stack: ["DCS", "SIS", "PI System", "API 580"],
    aiPrediction: {
      probability: "31%",
      asset: "Bomba API-610-B22",
      cause: "Cavitacion temprana por NPSH insuficiente",
      action: "Inspeccion en 72 horas y ajuste de valvula de succion",
      impact: "$186,000 USD",
      recommendation: "Activar orden prioritaria y monitoreo cada 15 minutos.",
    },
    alerts: [
      { severity: "alta", title: "Cavitacion probable en B22", detail: "Firma acustica y vibracion fuera de tendencia." },
      { severity: "media", title: "CMP-08 con vibracion axial", detail: "Revisar alineacion en siguiente ventana." },
    ],
    chart: [
      { label: "Lun", health: 92, failures: 2, production: 90, risk: 20 },
      { label: "Mar", health: 93, failures: 2, production: 91, risk: 18 },
      { label: "Mie", health: 89, failures: 4, production: 84, risk: 31 },
      { label: "Jue", health: 94, failures: 1, production: 92, risk: 17 },
      { label: "Vie", health: 95, failures: 1, production: 94, risk: 15 },
      { label: "Sab", health: 97, failures: 0, production: 95, risk: 11 },
    ],
  },
  {
    id: "logistica",
    name: "Logistica y almacen",
    plant: "Conveyors, montacargas, WMS, SLA y andenes",
    headline: "Trazabilidad y capacidad operativa para cumplir entregas sin sorpresas.",
    color: "#f472b6",
    route: "/monitoreo",
    recommendedPlan: "Starter Plant",
    price: "$4,900 USD/mes",
    roi: "6.4x",
    payback: "6.0 meses",
    commercialMessage: "La venta es simple: menos atrasos, menos saturacion y mas entregas dentro de SLA.",
    metrics: [
      { label: "SLA entregas", value: "97.2%", detail: "+4.8 pts vs base" },
      { label: "Pick rate", value: "184/h", detail: "Por zona critica" },
      { label: "Ahorro anual", value: "$610K", detail: "Demoras evitadas" },
      { label: "Riesgo IA", value: "22%", detail: "Saturacion anden 3" },
    ],
    assets: [
      { id: "CNV-06", name: "Conveyor principal", area: "Sortation", health: 84, status: "Revision", signal: "Motor caliente" },
      { id: "FLT-12", name: "Montacargas electrico", area: "Picking", health: 81, status: "Revision", signal: "Bateria degradada" },
      { id: "AND-03", name: "Anden de salida", area: "Despacho", health: 76, status: "Critico", signal: "Saturacion probable" },
      { id: "RFID-20", name: "Portal RFID", area: "Entrada", health: 97, status: "Operativo", signal: "Lectura estable" },
    ],
    useCases: ["Conveyors", "Montacargas", "Pick rate", "SLA de entregas", "Saturacion de andenes"],
    stack: ["WMS", "RFID", "IoT", "SLA Ops"],
    aiPrediction: {
      probability: "22%",
      asset: "Anden AND-03",
      cause: "Saturacion por baja disponibilidad de montacargas",
      action: "Reasignar 2 unidades y abrir ventana adicional en 45 minutos",
      impact: "$48,000 USD",
      recommendation: "Balancear oleadas de picking y priorizar pedidos SLA oro.",
    },
    alerts: [
      { severity: "media", title: "Saturacion probable en anden 3", detail: "Demanda supera capacidad disponible." },
      { severity: "media", title: "FLT-12 con bateria degradada", detail: "Autonomia 18% menor al promedio." },
    ],
    chart: [
      { label: "Lun", health: 87, failures: 5, production: 81, risk: 28 },
      { label: "Mar", health: 90, failures: 4, production: 86, risk: 24 },
      { label: "Mie", health: 92, failures: 3, production: 88, risk: 20 },
      { label: "Jue", health: 91, failures: 3, production: 87, risk: 22 },
      { label: "Vie", health: 94, failures: 2, production: 91, risk: 18 },
      { label: "Sab", health: 96, failures: 1, production: 93, risk: 12 },
    ],
  },
  {
    id: "agua",
    name: "Tratamiento de aguas",
    plant: "PTAR, bombeo, dosificacion, sopladores y calidad de efluente",
    headline: "Control predictivo para cumplir norma y reducir costo operativo.",
    color: "#2dd4bf",
    route: "/monitoreo",
    recommendedPlan: "Enterprise Ops",
    price: "$5,600 USD/mes",
    roi: "8.3x",
    payback: "4.8 meses",
    commercialMessage: "IndusVue reduce quimicos, energia y riesgo de incumplimiento ambiental.",
    metrics: [
      { label: "Cumplimiento", value: "99.1%", detail: "Calidad de efluente" },
      { label: "Energia evitada", value: "14.2%", detail: "Optimizacion sopladores" },
      { label: "Ahorro anual", value: "$740K", detail: "Energia y quimicos" },
      { label: "Riesgo IA", value: "16%", detail: "Soplador SB-02" },
    ],
    assets: [
      { id: "SB-02", name: "Soplador biologico", area: "Aireacion", health: 86, status: "Revision", signal: "Vibracion RMS" },
      { id: "PMP-04", name: "Bomba influente", area: "Bombeo", health: 93, status: "Operativo", signal: "Caudal estable" },
      { id: "DOS-07", name: "Dosificador quimico", area: "Tratamiento", health: 89, status: "Operativo", signal: "pH normal" },
      { id: "SEN-19", name: "Sensor turbidez", area: "Salida", health: 97, status: "Operativo", signal: "Lectura estable" },
    ],
    useCases: ["Bombeo", "pH y turbidez", "Sopladores", "Dosificacion quimica"],
    stack: ["SCADA", "Sensores IoT", "NOM", "CMMS"],
    aiPrediction: {
      probability: "16%",
      asset: "Soplador SB-02",
      cause: "Desgaste temprano de rodamiento",
      action: "Inspeccion en 5 dias y balanceo preventivo",
      impact: "$63,000 USD",
      recommendation: "Optimizar setpoint de aireacion hasta cierre de mantenimiento.",
    },
    alerts: [
      { severity: "baja", title: "SB-02 con vibracion creciente", detail: "Tendencia lenta, sin impacto inmediato." },
      { severity: "baja", title: "pH dentro de rango", detail: "Dosificacion estable durante 24 horas." },
    ],
    chart: [
      { label: "Lun", health: 93, failures: 2, production: 89, risk: 17 },
      { label: "Mar", health: 94, failures: 2, production: 91, risk: 16 },
      { label: "Mie", health: 96, failures: 1, production: 94, risk: 12 },
      { label: "Jue", health: 95, failures: 1, production: 93, risk: 14 },
      { label: "Vie", health: 97, failures: 0, production: 95, risk: 10 },
      { label: "Sab", health: 98, failures: 0, production: 96, risk: 8 },
    ],
  },
];

export const pricingPlans = [
  {
    name: "Starter Plant",
    price: "$2,900",
    scope: "1 planta / 25 activos",
    features: ["Dashboard ejecutivo", "Alertas por correo", "Reporte mensual ROI", "Historico 90 dias"],
  },
  {
    name: "Enterprise Ops",
    price: "$7,900",
    scope: "Multi-area / 150 activos",
    features: ["IA predictiva", "API industrial", "Soporte 24/7", "Integracion SCADA/PLC", "Roles por usuario"],
    featured: true,
  },
  {
    name: "Mission Critical",
    price: "A medida",
    scope: "Operaciones reguladas y 24/7",
    features: ["SLA dedicado", "Alta disponibilidad", "Ciberseguridad OT", "Data lake industrial", "Comite mensual"],
  },
];

export const addOns = [
  { name: "Integracion SCADA", price: "desde $6,500", detail: "OPC-UA, Modbus, Historian o PI System" },
  { name: "Alertas WhatsApp/SMS", price: "$490/mes", detail: "Twilio, CallMeBot o gateway corporativo" },
  { name: "API industrial", price: "$1,200/mes", detail: "Endpoints para ERP, CMMS, MES o WMS" },
  { name: "Soporte 24/7", price: "$2,100/mes", detail: "Mesa critica y escalamiento operativo" },
  { name: "Dashboards ejecutivos", price: "$950/mes", detail: "Vistas para direccion, finanzas y mantenimiento" },
];

export const databaseOptions = [
  {
    name: "SQLite",
    fit: "Proyecto local serio",
    detail: "Ideal para demo escolar o prototipo instalable sin servidor externo.",
  },
  {
    name: "PostgreSQL",
    fit: "Nivel empresa",
    detail: "Base robusta para multi-planta, auditoria, historicos e integraciones.",
  },
  {
    name: "Supabase",
    fit: "Login real rapido",
    detail: "Auth, Postgres y APIs listas para lanzar una demo SaaS.",
  },
];

export const businessProof = [
  { value: "30%", label: "menos fallas no programadas" },
  { value: "4.6 meses", label: "recuperacion promedio" },
  { value: "24/7", label: "alertamiento operativo" },
  { value: "$1.29M", label: "ahorro anual potencial" },
];

export const testimonials = [
  {
    quote: "La plataforma nos permitio explicar mantenimiento predictivo en terminos financieros, no solo tecnicos.",
    author: "Gerencia de confiabilidad",
    company: "Energia",
  },
  {
    quote: "La demo por sector acelera la conversacion con direccion porque muestra impacto, riesgo y ROI en la misma pantalla.",
    author: "Consultoria industrial",
    company: "Manufactura",
  },
  {
    quote: "El valor esta en convertir telemetria en decisiones accionables antes de que el paro ocurra.",
    author: "Operacion critica",
    company: "Oil & Gas",
  },
];

export const adminMetrics = [
  { label: "Usuarios activos", value: "4", detail: "Director, operador, tecnico y ventas" },
  { label: "Clientes demo", value: "5", detail: "CFE, refineria, automotriz, CEDIS y PTAR" },
  { label: "Modelos IA", value: "5", detail: "Uno por sector operativo" },
  { label: "Leads abiertos", value: "12", detail: "Pipeline comercial simulado" },
];

export function getSectorById(id) {
  return sectors.find((sector) => sector.id === id) || sectors[0];
}

export function getClientById(id) {
  return clients.find((client) => client.id === id) || clients[0];
}

export function getClientSector(clientId) {
  const client = getClientById(clientId);
  return getSectorById(client.sectorId);
}

export function getRecommendedPlan(sector) {
  return pricingPlans.find((plan) => plan.name === sector.recommendedPlan) || pricingPlans[1];
}

export function canAccess(user, permission) {
  if (!user?.roleId) return false;
  return rolePermissions[user.roleId]?.includes(permission) || false;
}

export function getDefaultPathForUser(user) {
  const permissions = rolePermissions[user?.roleId] || [];
  if (permissions.includes("sectores")) return "/sectores";
  if (permissions.includes("monitoreo")) return "/monitoreo";
  if (permissions.includes("activos")) return "/activos";
  if (permissions.includes("roi")) return "/roi";
  return "/login";
}
