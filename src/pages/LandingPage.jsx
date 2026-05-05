import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  BellAlertIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { businessProof, pricingPlans, sectors, testimonials } from "../data/industrialData";

const outcomes = [
  "Detecta fallas antes del paro",
  "Convierte telemetria en ROI",
  "Prioriza mantenimiento por impacto",
  "Genera reportes ejecutivos en PDF",
];

export default function LandingPage({ isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <main className="sales-page">
      <nav className="sales-nav">
        <div className="sales-brand">
          <CpuChipIcon />
          <span>INDUS-VUE</span>
        </div>
        <div className="sales-links">
          <a href="#beneficios">Beneficios</a>
          <a href="#sectores">Sectores</a>
          <a href="#precios">Precios</a>
          <button className="btn-secondary" onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      <section className="sales-hero">
        <div className="sales-copy">
          <span className="eyebrow">Sistema inteligente para monitoreo industrial</span>
          <h1>Reduce fallas hasta 30% con IA predictiva en tiempo real.</h1>
          <p>
            IndusVue conecta activos industriales, detecta anomalias, prioriza riesgos y genera
            reportes ejecutivos para vender mantenimiento predictivo con impacto financiero.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate(isAuthenticated ? "/sectores" : "/login")}>
              Ver demo
              <ArrowRightIcon />
            </button>
            <button className="btn-ghost" onClick={() => navigate("/login")}>Entrar al dashboard</button>
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
            <span className="live-pill">IA activa</span>
            <strong>Riesgo: 18%</strong>
          </div>
          <div className="product-wave">
            {sectors[0].chart.map((point) => (
              <span key={point.label} style={{ "--bar-height": `${point.production}%` }} />
            ))}
          </div>
          <div className="product-alert">
            <BellAlertIcon />
            <div>
              <strong>Prediccion IA</strong>
              <span>Generador G-04 requiere inspeccion termografica en 96 horas.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sales-section" id="beneficios">
        <div className="section-heading">
          <span className="eyebrow">Beneficios claros en 5 segundos</span>
          <h2>Una plataforma para direccion, operaciones, mantenimiento y ventas.</h2>
        </div>
        <div className="benefit-grid">
          {outcomes.map((item, index) => {
            const Icon = [ShieldCheckIcon, ChartBarSquareIcon, CpuChipIcon, CheckCircleIcon][index];
            return (
              <article className="panel benefit-card" key={item}>
                <Icon />
                <h3>{item}</h3>
                <p>Diseñado para que el cliente vea dinero, riesgo y accion recomendada sin leer documentacion tecnica.</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sales-section" id="sectores">
        <div className="section-heading">
          <span className="eyebrow">Casos de uso por industria</span>
          <h2>El discurso cambia segun el cliente, no es una demo generica.</h2>
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
          <span className="eyebrow">Precios enterprise</span>
          <h2>Planes para vender piloto, operacion enterprise o mision critica.</h2>
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

      <section className="sales-contact panel">
        <div>
          <span className="eyebrow">Contacto</span>
          <h2>Agenda una demo ejecutiva</h2>
          <p>Presenta IndusVue como sistema SaaS industrial con IA, roles, reportes y propuesta comercial.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/login")}>Entrar a la demo</button>
      </section>
    </main>
  );
}
