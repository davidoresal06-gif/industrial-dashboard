import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { getClientById, getClientSector, getRecommendedPlan } from "../Data/IndustrialData";

const phases = [
  {
    day: "30 dias",
    title: "Diagnostico e integracion",
    tasks: ["Levantamiento de activos criticos", "Conexion API/SCADA/CSV", "Dashboard ejecutivo inicial"],
  },
  {
    day: "60 dias",
    title: "Modelos predictivos",
    tasks: ["Entrenamiento de patrones", "Alertas por rol", "Reporte financiero de fallas evitadas"],
  },
  {
    day: "90 dias",
    title: "Escalamiento enterprise",
    tasks: ["Integracion CMMS/ERP", "Comite ejecutivo", "Plan multi-planta y soporte 24/7"],
  },
];

export default function ProposalPage({ clientId, user }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);
  const plan = getRecommendedPlan(sector);
  const savings = sector.metrics.find((metric) => metric.label === "Ahorro anual");
  const today = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page proposal-page">
      <header className="proposal-header">
        <div>
          <span className="eyebrow">Propuesta ejecutiva</span>
          <h1>IndusVue para {client.name}</h1>
          <p>{client.site} | Preparado para {client.audience}</p>
        </div>
        <button className="btn-primary" onClick={() => window.print()}>
          <ArrowDownTrayIcon />
          Generar PDF
        </button>
      </header>

      <section className="proposal-cover panel">
        <div>
          <span className="eyebrow">Resumen ejecutivo</span>
          <h2>{sector.headline}</h2>
          <p>{sector.commercialMessage}</p>
        </div>
        <div className="proposal-meta">
          <span>Fecha</span>
          <strong>{today}</strong>
          <span>Consultor</span>
          <strong>{user?.name || "IndusVue"}</strong>
        </div>
      </section>

      <section className="proposal-grid">
        <article className="panel">
          <SparklesIcon className="proposal-icon" />
          <h2>Problema del cliente</h2>
          <p>{client.commercialFocus}</p>
          <div className="alert-list">
            {sector.alerts.map((alert) => (
              <div className={`alert-item ${alert.severity}`} key={alert.title}>
                <strong>{alert.title}</strong>
                <span>{alert.detail}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <CheckCircleIcon className="proposal-icon" />
          <h2>Solucion IndusVue</h2>
          <p>
            Plataforma SaaS con IA predictiva, monitoreo por activos, reportes gerenciales,
            roles operativos, alertas y API industrial.
          </p>
          <div className="use-case-list">
            {sector.useCases.map((useCase) => (
              <span key={useCase}><CheckCircleIcon />{useCase}</span>
            ))}
          </div>
        </article>

        <article className="panel">
          <CurrencyDollarIcon className="proposal-icon" />
          <h2>Precio y ROI</h2>
          <dl className="ai-list">
            <div><dt>Plan recomendado</dt><dd>{plan.name}</dd></div>
            <div><dt>Precio</dt><dd>{sector.price}</dd></div>
            <div><dt>Ahorro anual</dt><dd>{savings.value}</dd></div>
            <div><dt>ROI</dt><dd>{sector.roi}</dd></div>
            <div><dt>Payback</dt><dd>{sector.payback}</dd></div>
          </dl>
        </article>

        <article className="panel">
          <SparklesIcon className="proposal-icon" />
          <h2>Prediccion IA incluida</h2>
          <dl className="ai-list">
            <div><dt>Probabilidad</dt><dd>{sector.aiPrediction.probability}</dd></div>
            <div><dt>Activo afectado</dt><dd>{sector.aiPrediction.asset}</dd></div>
            <div><dt>Causa probable</dt><dd>{sector.aiPrediction.cause}</dd></div>
            <div><dt>Accion</dt><dd>{sector.aiPrediction.action}</dd></div>
            <div><dt>Impacto evitado</dt><dd>{sector.aiPrediction.impact}</dd></div>
          </dl>
        </article>
      </section>

      <section className="timeline-section panel">
        <div className="section-heading">
          <span className="eyebrow">Implementacion 30 / 60 / 90</span>
          <h2>Plan de arranque controlado</h2>
        </div>
        <div className="timeline-grid">
          {phases.map((phase) => (
            <article key={phase.day}>
              <CalendarDaysIcon />
              <strong>{phase.day}</strong>
              <h3>{phase.title}</h3>
              {phase.tasks.map((task) => (
                <p key={task}>{task}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
