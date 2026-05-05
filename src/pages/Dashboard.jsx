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
  BoltIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { getClientById, getClientSector } from "../data/industrialData";

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

export default function Dashboard({ clientId }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);
  const [telemetry, setTelemetry] = useState(() => createInitialTelemetry(sector));

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((current) => [...current.slice(-8), createLivePoint(sector)]);
    }, 2400);

    return () => clearInterval(interval);
  }, [sector]);

  const current = telemetry[telemetry.length - 1];
  const aiRisk = useMemo(() => {
    if (current.risk > 28) return { label: "Critico", color: "#fb7185" };
    if (current.risk > 20) return { label: "Atencion", color: "#fb923c" };
    return { label: "Estable", color: "#4ade80" };
  }, [current.risk]);

  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">{client.name} | {client.site}</span>
          <h1>{sector.name}</h1>
          <p>{client.commercialFocus}</p>
        </div>
        <button className="btn-secondary" onClick={() => window.print()}>
          <ArrowDownTrayIcon />
          Reporte gerencial
        </button>
      </header>

      <section className="kpi-grid">
        {sector.metrics.map((metric, index) => {
          const Icon = [BoltIcon, CpuChipIcon, ShieldCheckIcon, ExclamationTriangleIcon][index] || BoltIcon;
          return (
            <article className="kpi-card" key={metric.label}>
              <Icon className={`kpi-icon ${index === 3 ? "warning" : ""}`} />
              <div>
                <h3>{metric.label}</h3>
                <strong>{metric.value}</strong>
                <span>{metric.detail}</span>
              </div>
            </article>
          );
        })}
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
                <Line type="monotone" dataKey="rpm" stroke="#38bdf8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="temperature" stroke="#fb923c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="vibration" stroke="#4ade80" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel ai-panel">
          <span className="eyebrow">Prediccion IA</span>
          <h2 style={{ color: aiRisk.color }}>{aiRisk.label}</h2>
          <dl className="ai-list">
            <div><dt>Probabilidad de falla</dt><dd>{sector.aiPrediction.probability}</dd></div>
            <div><dt>Activo afectado</dt><dd>{sector.aiPrediction.asset}</dd></div>
            <div><dt>Causa probable</dt><dd>{sector.aiPrediction.cause}</dd></div>
            <div><dt>Accion recomendada</dt><dd>{sector.aiPrediction.action}</dd></div>
            <div><dt>Impacto evitado</dt><dd>{sector.aiPrediction.impact}</dd></div>
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
                <Area dataKey="risk" stroke="#f472b6" fill="url(#riskGradient)" strokeWidth={3} />
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
                <Bar dataKey="production" fill={sector.color} radius={[6, 6, 0, 0]} />
                <Bar dataKey="health" fill="#4ade80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </div>
  );
}
