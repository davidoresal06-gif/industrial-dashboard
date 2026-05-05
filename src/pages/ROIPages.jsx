import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowTrendingUpIcon, BanknotesIcon, ChartPieIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { addOns, getClientById, getClientSector, getRecommendedPlan, pricingPlans, sectors } from "../Data/IndustrialData";

function savingsToNumber(value) {
  const clean = value.replace("$", "");
  if (clean.includes("M")) return Number(clean.replace("M", "")) * 1000;
  if (clean.includes("K")) return Number(clean.replace("K", ""));
  return Number(clean);
}

const roiData = sectors.map((sector) => ({
  sector: sector.name.split(" ")[0],
  savings: savingsToNumber(sector.metrics.find((metric) => metric.label === "Ahorro anual").value),
}));

export default function ROIPages({ clientId }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);
  const recommendedPlan = getRecommendedPlan(sector);
  const savings = sector.metrics.find((metric) => metric.label === "Ahorro anual");

  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">{client.name} | venta enterprise</span>
          <h1>ROI, precios y caso financiero</h1>
          <p>{sector.commercialMessage}</p>
        </div>
      </header>

      <section className="kpi-grid">
        <article className="kpi-card">
          <BanknotesIcon className="kpi-icon" />
          <div>
            <h3>Ahorro anual potencial</h3>
            <strong>{savings.value}</strong>
            <span>{savings.detail}</span>
          </div>
        </article>
        <article className="kpi-card">
          <ArrowTrendingUpIcon className="kpi-icon" />
          <div>
            <h3>ROI proyectado</h3>
            <strong>{sector.roi}</strong>
            <span>Recuperacion: {sector.payback}</span>
          </div>
        </article>
        <article className="kpi-card">
          <ChartPieIcon className="kpi-icon" />
          <div>
            <h3>Plan recomendado</h3>
            <strong>{recommendedPlan.name}</strong>
            <span>{recommendedPlan.price}</span>
          </div>
        </article>
      </section>

      <section className="analytics-grid">
        <article className="panel large-panel">
          <h2>Ahorro estimado por sector</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
                <XAxis dataKey="sector" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#101827", border: "1px solid rgba(255,255,255,0.16)" }} />
                <Bar dataKey="savings" fill={sector.color} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <div className="pricing-grid sidebar-pricing">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className={`pricing-card ${plan.name === recommendedPlan.name ? "featured" : ""}`}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <span>{plan.scope}</span>
              {plan.features.slice(0, 3).map((feature) => <p key={feature}>{feature}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="addon-grid">
        {addOns.map((addOn) => (
          <article className="panel addon-card" key={addOn.name}>
            <PlusCircleIcon />
            <div>
              <h2>{addOn.name}</h2>
              <strong>{addOn.price}</strong>
              <p>{addOn.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
