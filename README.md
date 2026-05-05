# IndusVue | Sistema inteligente de monitoreo industrial

IndusVue es una plataforma tipo dashboard industrial para visualizar operaciones, detectar fallas, revisar metricas de eficiencia y generar propuestas comerciales para empresas, talleres, plantas y operaciones criticas.

## Descripcion

Este sistema fue disenado para ayudar a empresas industriales a centralizar informacion operativa, detectar anomalias y mejorar la toma de decisiones mediante dashboards inteligentes.

## Funcionalidades

- Landing page comercial con propuesta de valor clara.
- Login con usuarios demo y validacion visual.
- Roles: Director, Operador, Tecnico y Ventas.
- Modo cliente: CFE, Refineria, Automotriz, CEDIS y PTAR.
- Dashboard con telemetria en vivo, graficas animadas y reloj.
- Simulador de fallas con alerta roja y recomendacion automatica.
- Alertas inteligentes: estable, advertencia y critico.
- Activos criticos por sector.
- Pagina de precios en MXN.
- Pagina de propuesta comercial con opcion de generar PDF.
- Panel admin para usuarios, clientes y arquitectura de datos.
- Boton fijo para cotizar por WhatsApp.
- Backend Node.js + Express con rutas API.

## Tecnologias

- React
- Vite
- React Router
- Recharts
- Heroicons
- Node.js
- Express
- JSON como base de datos local demo

## Usuarios demo

```txt
admin@industrial.com    / admin123
admin@indusvue.com      / IndusVue2026!
operador@indusvue.com   / Operador2026!
tecnico@indusvue.com    / Tecnico2026!
ventas@indusvue.com     / Demo2026!
```

## Instalacion

```bash
npm install
```

## Ejecutar backend

```bash
npm.cmd run api
```

API local:

```txt
http://localhost:4000/api/health
```

## Ejecutar frontend

```bash
npm.cmd run dev
```

App local:

```txt
http://localhost:5173
```

## Rutas principales

- `/` Landing page
- `/login` Acceso
- `/sectores` Demo por sector
- `/monitoreo` Dashboard operativo
- `/activos` Activos criticos
- `/roi` Precios y retorno
- `/propuesta` Propuesta comercial
- `/admin` Panel administrador
- `/sobre` Sobre el sistema

## Mejoras futuras

- Migrar de JSON local a PostgreSQL, MongoDB o Supabase.
- Registro real de usuarios.
- Recuperacion de contrasena.
- Reportes PDF con plantilla dedicada.
- Integracion con sensores, PLC, SCADA o API industrial.
- Historial real de eventos y mantenimientos.
- Deploy en Vercel, Render, Railway o VPS.

## Objetivo comercial

IndusVue esta pensado como base de un producto SaaS industrial: una herramienta que no solo muestra datos, sino que comunica valor de negocio, reduce riesgo operativo y ayuda a vender implementaciones de monitoreo industrial.

## Contacto comercial

```txt
+52 464 157 4591
```
