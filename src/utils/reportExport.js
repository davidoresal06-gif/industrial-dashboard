function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function metricRows(metrics = []) {
  return metrics
    .map((metric) => `
      <article class="metric">
        <span>${escapeHtml(metric.label)}</span>
        <strong>${escapeHtml(metric.value)}</strong>
        <small>${escapeHtml(metric.detail)}</small>
      </article>
    `)
    .join("");
}

function alertRows(alerts = []) {
  return alerts
    .map((alert) => `
      <article class="alert ${escapeHtml(alert.type || alert.severity || "stable")}">
        <strong>${escapeHtml(alert.title)}</strong>
        <span>${escapeHtml(alert.detail)}</span>
      </article>
    `)
    .join("");
}

function assetRows(assets = []) {
  return assets
    .map((asset) => `
      <tr>
        <td>${escapeHtml(asset.id)}</td>
        <td>${escapeHtml(asset.name)}</td>
        <td>${escapeHtml(asset.area)}</td>
        <td>${escapeHtml(asset.health)}%</td>
        <td>${escapeHtml(asset.status)}</td>
        <td>${escapeHtml(asset.signal)}</td>
      </tr>
    `)
    .join("");
}

function chartRows(points = []) {
  return points
    .map((point) => `
      <tr>
        <td>${escapeHtml(point.time || point.label)}</td>
        <td>${escapeHtml(point.rpm || point.production)}</td>
        <td>${escapeHtml(point.temperature || point.health)}</td>
        <td>${escapeHtml(point.vibration || point.failures)}</td>
        <td>${escapeHtml(point.risk)}</td>
      </tr>
    `)
    .join("");
}

export function buildExecutiveReport({ client, sector, user, telemetry, alerts, title = "Reporte ejecutivo IndusVue" }) {
  const generatedAt = new Date().toLocaleString("es-MX");
  const ai = sector.aiPrediction;

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
    main { max-width: 1100px; margin: 0 auto; padding: 38px; }
    header { background: linear-gradient(135deg, #08111f, #132235); color: white; border-radius: 28px; padding: 34px; margin-bottom: 22px; }
    .brand { letter-spacing: .16em; text-transform: uppercase; color: #38bdf8; font-weight: 800; font-size: 12px; }
    h1 { font-size: 44px; line-height: .98; margin: 10px 0 12px; }
    h2 { margin: 0 0 14px; font-size: 22px; }
    p { line-height: 1.6; color: #475569; }
    header p { color: #cbd5e1; }
    .meta, .grid, .alerts { display: grid; gap: 14px; }
    .meta { grid-template-columns: repeat(4, 1fr); margin-top: 22px; }
    .grid { grid-template-columns: repeat(4, 1fr); margin-bottom: 22px; }
    .metric, section, .alert { background: white; border: 1px solid #e2e8f0; border-radius: 18px; padding: 18px; box-shadow: 0 16px 45px rgba(15, 23, 42, .06); }
    .metric span, .meta span { display: block; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 800; }
    .metric strong, .meta strong { display: block; font-size: 24px; margin: 5px 0; }
    .metric small { color: #64748b; }
    section { margin-bottom: 22px; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .alerts { grid-template-columns: repeat(2, 1fr); }
    .alert { border-left: 6px solid #22c55e; }
    .alert.warning, .alert.media { border-left-color: #f59e0b; }
    .alert.critical, .alert.alta { border-left-color: #ef4444; }
    .alert span { display: block; color: #64748b; margin-top: 6px; }
    table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 14px; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 11px; text-align: left; font-size: 13px; }
    th { background: #0f172a; color: white; }
    footer { color: #64748b; font-size: 12px; text-align: center; margin-top: 30px; }
    @media print {
      body { background: white; }
      main { padding: 0; }
      section, .metric, .alert { box-shadow: none; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <span class="brand">INDUS-VUE | Sistema industrial de monitoreo</span>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(client.name)} | ${escapeHtml(client.site)} | ${escapeHtml(sector.name)}</p>
      <div class="meta">
        <div><span>Fecha</span><strong>${escapeHtml(generatedAt)}</strong></div>
        <div><span>Usuario</span><strong>${escapeHtml(user?.name || "Demo")}</strong></div>
        <div><span>Rol</span><strong>${escapeHtml(user?.role || "Operacion")}</strong></div>
        <div><span>Plan sugerido</span><strong>${escapeHtml(sector.recommendedPlan)}</strong></div>
      </div>
    </header>

    <div class="grid">${metricRows(sector.metrics)}</div>

    <div class="two">
      <section>
        <h2>Prediccion IA</h2>
        <p><strong>Probabilidad:</strong> ${escapeHtml(ai.probability)}</p>
        <p><strong>Activo afectado:</strong> ${escapeHtml(ai.asset)}</p>
        <p><strong>Causa probable:</strong> ${escapeHtml(ai.cause)}</p>
        <p><strong>Accion recomendada:</strong> ${escapeHtml(ai.action)}</p>
        <p><strong>Impacto evitado:</strong> ${escapeHtml(ai.impact)}</p>
      </section>
      <section>
        <h2>Resumen de negocio</h2>
        <p>${escapeHtml(sector.commercialMessage)}</p>
        <p><strong>ROI:</strong> ${escapeHtml(sector.roi)} | <strong>Payback:</strong> ${escapeHtml(sector.payback)}</p>
        <p><strong>Enfoque:</strong> ${escapeHtml(client.commercialFocus)}</p>
      </section>
    </div>

    <section>
      <h2>Alertas inteligentes</h2>
      <div class="alerts">${alertRows(alerts)}</div>
    </section>

    <section>
      <h2>Activos criticos</h2>
      <table>
        <thead><tr><th>ID</th><th>Activo</th><th>Area</th><th>Salud</th><th>Estado</th><th>Senal</th></tr></thead>
        <tbody>${assetRows(sector.assets)}</tbody>
      </table>
    </section>

    <section>
      <h2>Telemetria y riesgo</h2>
      <table>
        <thead><tr><th>Tiempo</th><th>RPM/Produccion</th><th>Temperatura/Salud</th><th>Vibracion/Fallas</th><th>Riesgo</th></tr></thead>
        <tbody>${chartRows(telemetry)}</tbody>
      </table>
    </section>

    <footer>Reporte generado automaticamente por IndusVue. Guardar como PDF desde el dialogo de impresion.</footer>
  </main>
</body>
</html>`;
}

export function exportExecutiveReport(payload) {
  const reportHtml = buildExecutiveReport(payload);
  const fileName = `reporte-indusvue-${payload.client.name}-${new Date().toISOString().slice(0, 10)}.html`
    .toLowerCase()
    .replaceAll(" ", "-");
  const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  const printWindow = window.open("", "_blank", "width=1100,height=800");
  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(reportHtml);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 350);
}
