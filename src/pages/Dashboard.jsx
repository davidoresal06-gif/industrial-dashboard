import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownTrayIcon,
  BellAlertIcon,
  BoltIcon,
  ClockIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { getClientById, getClientSector, smartAlerts } from "../Data/IndustrialData";

function createLivePoint(sector) {
  const baseRisk = Number.parseInt(sector.aiPrediction.probability, 10);
  return {
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    rpm: Math.round(1430 + Math.random() * 90),
    vibration: Number((2.1 + Math.random() * 0.9).toFixed(2)),
    temperature: Math.round(68 + Math.random() * 13),
    risk: Math.max(8, Math.round(baseRisk + Math.random() * 8 - 4)),
  };
}

function createInitialTelemetry(sector) {
  return sector.chart.map((point) => ({
    time: point.label,
    rpm: 1410 + point.production,
    vibration: Number((1.8 + point.risk / 20).toFixed(2)),
    temperature: 62 + Math.round(point.risk / 2),
    risk: point.risk,
  }));
}

function createFailurePoint() {
  return {
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    rpm: 1578,
    vibration: 4.9,
    temperature: 96,
    risk: 44,
  };
}

export default function Dashboard({ clientId }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);
  const [telemetry, setTelemetry] = useState(() => createInitialTelemetry(sector));
  const [now, setNow] = useState(() => new Date());
  const [failureMode, setFailureMode] = useState(false);
  const [dashboardAlerts, setDashboardAlerts] = useState(() => smartAlerts.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((current) => [...current.slice(-8), createLivePoint(sector)]);
    }, 2400);

    return () => clearInterval(interval);
  }, [sector]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const current = telemetry[telemetry.length - 1];
  const aiRisk = useMemo(() => {
    if (current.risk > 28) return { label: "Critico", color: "#fb7185" };
    if (current.risk > 20) return { label: "Alerta", color: "#fb923c" };
    return { label: "Operativo", color: "#4ade80" };
  }, [current.risk]);

  const simulateFailure = () => {
    setFailureMode(true);
    setTelemetry((currentData) => [...currentData.slice(-8), createFailurePoint()]);
    setDashboardAlerts([
      { type: "critical", title: "Falla detectada", detail: "Motor 03 excedio temperatura segura. Riesgo critico activo.", color: "rojo" },
      { type: "warning", title: "Mantenimiento pendiente", detail: "Recomendacion automatica: inspeccion inmediata y paro controlado.", color: "amarillo" },
      ...smartAlerts.slice(1, 4),
    ]);
  };

  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">{client.name} | {client.site}</span>
          <h1>{sector.name}</h1>
          <p>Monitorea rendimiento, consumo y alertas operativas del sector seleccionado.</p>
        </div>
        <div className="header-actions">
          <span className="clock-pill"><ClockIcon />{now.toLocaleTimeString("es-MX")}</span>
          <button className="btn-secondary" onClick={simulateFailure}>
            <BellAlertIcon />
            Simular falla
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            <ArrowDownTrayIcon />
            Reporte gerencial
          </button>
        </div>
      </header>

      <section className="kpi-grid">
        {sector.metrics.map((metric, index) => {
          const Icon = [BoltIcon, CpuChipIcon, ShieldCheckIcon, ExclamationTriangleIcon][index] || BoltIcon;
          const trend = ["+12.4%", "+4.8%", "+18.2%", failureMode ? "+26%" : "-3.1%"][index];
          return (
            <article className="kpi-card" key={metric.label}>
              <Icon className={`kpi-icon ${index === 3 ? "warning" : ""}`} />
              <div>
                <h3>{metric.label}</h3>
                <strong>{index === 3 && failureMode ? "44%" : metric.value}</strong>
                <span>{metric.detail}</span>
                <small className={`kpi-trend ${trend.startsWith("+") && index !== 3 ? "up" : "down"}`}>
                  {trend} vs ultimo ciclo
                </small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="status-strip">
        <article className="status-card stable">
          <strong>Operativo</strong>
          <span>{failureMode ? "3 activos estables" : "Todos los activos dentro de rango"}</span>
        </article>
        <article className={`status-card ${failureMode ? "warning" : "stable"}`}>
          <strong>Alerta</strong>
          <span>{failureMode ? "Motor 03 excedio temperatura segura" : "Sin advertencias criticas"}</span>
        </article>
        <article className={`status-card ${failureMode ? "critical" : "stable"}`}>
          <strong>Critico</strong>
          <span>{failureMode ? "Riesgo de paro no programado" : "0 fallas detectadas"}</span>
        </article>
      </section>

      <section className="analytics-grid">
        <article className="panel large-panel">
          <div className="panel-header">
            <div>
              <h2>Telemetria en vivo</h2>
              <p>{sector.plant}</p>
            </div>
            <span className="live-pill">Live</span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#101827", border: "1px solid rgba(255,255,255,0.16)" }} />
                <Line type="monotone" dataKey="rpm" stroke="#38bdf8" strokeWidth={3} dot={false} animationDuration={700} />
                <Line type="monotone" dataKey="temperature" stroke="#fb923c" strokeWidth={2} dot={false} animationDuration={700} />
                <Line type="monotone" dataKey="vibration" stroke="#4ade80" strokeWidth={2} dot={false} animationDuration={700} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel">
          <h2>Alertas inteligentes</h2>
          <div className="smart-alert-grid">
            {dashboardAlerts.map((alert) => (
              <div className={`smart-alert ${alert.type}`} key={`${alert.title}-${alert.detail}`}>
                <strong>{alert.title}</strong>
                <span>{alert.detail}</span>
                <small>{alert.color}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel ai-panel">
          <span className="eyebrow">Prediccion IA</span>
          <h2 style={{ color: aiRisk.color }}>{aiRisk.label}</h2>
          <dl className="ai-list">
            <div><dt>Probabilidad de falla</dt><dd>{failureMode ? "44%" : sector.aiPrediction.probability}</dd></div>
            <div><dt>Activo afectado</dt><dd>{failureMode ? "Motor 03" : sector.aiPrediction.asset}</dd></div>
            <div><dt>Causa probable</dt><dd>{failureMode ? "Temperatura y vibracion fuera de rango" : sector.aiPrediction.cause}</dd></div>
            <div><dt>Accion recomendada</dt><dd>{failureMode ? "Detener equipo de forma controlada e inspeccionar en sitio" : sector.aiPrediction.action}</dd></div>
            <div><dt>Impacto evitado</dt><dd>{failureMode ? "$92,000 USD" : sector.aiPrediction.impact}</dd></div>
          </dl>
        </article>

        <article className="panel">
          <h2>Riesgo predictivo</h2>
          <div className="chart-box compact">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#101827", border: "1px solid rgba(255,255,255,0.16)" }} />
                <Area dataKey="risk" stroke="#f472b6" fill="url(#riskGradient)" strokeWidth={3} animationDuration={700} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel">
          <h2>Produccion vs salud</h2>
          <div className="chart-box compact">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sector.chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#101827", border: "1px solid rgba(255,255,255,0.16)" }} />
                <Bar dataKey="production" fill={sector.color} radius={[6, 6, 0, 0]} animationDuration={800} />
                <Bar dataKey="health" fill="#4ade80" radius={[6, 6, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </div>
  );
}
