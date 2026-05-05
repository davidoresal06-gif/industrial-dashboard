import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  BellAlertIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { businessProof, pricingPlans, sectors, testimonials, useCaseCards } from "../Data/IndustrialData";

const outcomes = [
  "Controla operaciones desde un solo panel",
  "Detecta fallas antes del paro",
  "Visualiza metricas de eficiencia",
  "Genera reportes ejecutivos",
];

export default function LandingPage({ isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <main className="sales-page">
      <nav className="sales-nav">
        <button className="sales-brand nav-logo-button" onClick={() => navigate("/")}>
          <CpuChipIcon />
          <span>INDUS-VUE</span>
        </button>
        <div className="sales-links">
          <a href="#inicio">Inicio</a>
          <a href="#soluciones">Soluciones</a>
          <button className="nav-link-button" onClick={() => navigate(isAuthenticated ? "/monitoreo" : "/login")}>Dashboard</button>
          <a href="#precios">Precios</a>
          <a href="#contacto">Contacto</a>
          <button className="nav-link-button" onClick={() => navigate("/sobre")}>Sobre</button>
          <button className="btn-primary" onClick={() => navigate("/login")}>Solicitar demo</button>
        </div>
      </nav>

      <section className="sales-hero" id="inicio">
        <div className="sales-copy">
          <span className="eyebrow">Para empresas, talleres, plantas y operaciones</span>
          <h1>Sistema inteligente para monitoreo industrial en tiempo real</h1>
          <p>
            Visualiza operaciones, detecta fallas y toma decisiones desde un solo panel.
            Controla alertas, metricas, eficiencia, activos y reportes sin perder visibilidad operativa.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate(isAuthenticated ? "/sectores" : "/login")}>
              Ver demo
              <ArrowRightIcon />
            </button>
            <button className="btn-ghost" onClick={() => navigate("/login")}>Solicitar implementacion</button>
          </div>
          <div className="proof-row">
            {businessProof.map((proof) => (
              <div key={proof.label}>
                <strong>{proof.value}</strong>
                <span>{proof.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sales-product">
          <div className="product-topline">
            <span className="live-pill">Actualizacion en vivo</span>
            <strong>Estado: Operativo</strong>
          </div>
          <div className="product-wave">
            {sectors[0].chart.map((point) => (
              <span key={point.label} style={{ "--bar-height": `${point.production}%` }} />
            ))}
          </div>
          <div className="product-alert">
            <BellAlertIcon />
            <div>
              <strong>Notificacion inteligente</strong>
              <span>Motor 03 excedio temperatura segura. Recomendacion: inspeccion preventiva.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sales-section" id="soluciones">
        <div className="section-heading">
          <span className="eyebrow">Beneficios claros en 5 segundos</span>
          <h2>Control, alertas, metricas y eficiencia para operaciones industriales.</h2>
        </div>
        <div className="benefit-grid">
          {outcomes.map((item, index) => {
            const Icon = [ShieldCheckIcon, ChartBarSquareIcon, CpuChipIcon, CheckCircleIcon][index];
            return (
              <article className="panel benefit-card" key={item}>
                <Icon />
                <h3>{item}</h3>
                <p>Disenado para que gerencia, mantenimiento y operacion entiendan riesgo, impacto y accion inmediata.</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sales-section" id="casos">
        <div className="section-heading">
          <span className="eyebrow">Casos de uso</span>
          <h2>La solucion se adapta al problema real de cada operacion.</h2>
        </div>
        <div className="usecase-grid">
          {useCaseCards.map((item) => (
            <article className="panel usecase-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <button className="btn-ghost" onClick={() => navigate("/login")}>Analizar rendimiento operativo</button>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-section" id="sectores">
        <div className="section-heading">
          <span className="eyebrow">Sectores industriales</span>
          <h2>Monitorea rendimiento, consumo y alertas operativas del sector seleccionado.</h2>
        </div>
        <div className="landing-sector-grid">
          {sectors.map((sector) => (
            <article className="panel" key={sector.id} style={{ "--accent-color": sector.color }}>
              <span className="eyebrow">{sector.name}</span>
              <h3>{sector.headline}</h3>
              <p>{sector.commercialMessage}</p>
              <strong>{sector.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-section" id="precios">
        <div className="section-heading">
          <span className="eyebrow">Precios</span>
          <h2>Planes simples para vender desde demo hasta implementacion empresarial.</h2>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <span>{plan.scope}</span>
              {plan.features.map((feature) => <p key={feature}>{feature}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="sales-section">
        <div className="section-heading">
          <span className="eyebrow">Confianza comercial</span>
          <h2>Mensajes que ayudan a cerrar, no solo a impresionar.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="panel testimonial-card" key={item.author}>
              <p>"{item.quote}"</p>
              <strong>{item.author}</strong>
              <span>{item.company}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-contact panel" id="contacto">
        <div>
          <span className="eyebrow">Contacto</span>
          <h2>Solicita una implementacion</h2>
          <p>Presenta IndusVue como sistema SaaS industrial con IA, roles, reportes y propuesta comercial.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/login")}>Solicitar demo</button>
      </section>

      <a className="whatsapp-float" href="https://wa.me/524641234567?text=Hola,%20quiero%20cotizar%20el%20sistema%20industrial" target="_blank" rel="noreferrer">
        Cotizar sistema
      </a>
    </main>
  );
}
