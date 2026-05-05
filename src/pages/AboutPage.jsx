import { CpuChipIcon, ShieldCheckIcon, SignalIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <main className="sales-page about-page">
      <section className="about-hero panel">
        <span className="eyebrow">Sobre el sistema</span>
        <h1>IndusVue centraliza informacion operativa para detectar anomalias y decidir mejor.</h1>
        <p>
          Este sistema fue disenado para ayudar a empresas industriales a centralizar informacion
          operativa, detectar anomalias y mejorar la toma de decisiones mediante dashboards
          inteligentes.
        </p>
      </section>

      <section className="benefit-grid about-grid">
        <article className="panel benefit-card">
          <CpuChipIcon />
          <h3>Monitoreo industrial</h3>
          <p>Visualiza activos, rendimiento, consumo, temperatura, vibracion y salud operacional.</p>
        </article>
        <article className="panel benefit-card">
          <SignalIcon />
          <h3>Alertas inteligentes</h3>
          <p>Clasifica eventos como estable, advertencia o critico para priorizar acciones.</p>
        </article>
        <article className="panel benefit-card">
          <ShieldCheckIcon />
          <h3>Decision ejecutiva</h3>
          <p>Conecta riesgo tecnico con impacto financiero, ROI y reportes listos para venta.</p>
        </article>
      </section>
    </main>
  );
}
