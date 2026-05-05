import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BeakerIcon,
  BoltIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import ClientSelector from "../components/ClientSelector";
import { clients, getClientById, getClientSector, getRecommendedPlan, sectors } from "";

const icons = {
  energia: BoltIcon,
  manufactura: BuildingOffice2Icon,
  "oil-gas": BeakerIcon,
  logistica: TruckIcon,
  agua: GlobeAltIcon,
};

export default function SectorHub({ clientId, onClientChange }) {
  const navigate = useNavigate();
  const client = getClientById(clientId);
  const clientSector = getClientSector(clientId);
  const [selectedId, setSelectedId] = useState(clientSector.id);
  const selectedSector = useMemo(
    () => sectors.find((sector) => sector.id === selectedId) || clientSector,
    [clientSector, selectedId],
  );
  const recommendedPlan = getRecommendedPlan(selectedSector);

  const openSector = (sector) => {
    const matchingClient = clients.find((item) => item.sectorId === sector.id);
    if (matchingClient) onClientChange(matchingClient.id);
    localStorage.setItem("selectedSectorId", sector.id);
    navigate(sector.route);
  };

  return (
    <div className="hub-page">
      <section className="hero-shell">
        <div className="hero-copy">
          <span className="eyebrow">IndusVue Enterprise OS</span>
          <h1>Una demo personalizada para vender por industria.</h1>
          <p>
            Cliente activo: <strong>{client.name}</strong>. {client.commercialFocus}
          </p>
          <div className="hero-actions">
            <ClientSelector clientId={clientId} onClientChange={onClientChange} />
            <button className="btn-primary" onClick={() => openSector(selectedSector)}>
              Ver demo operacional
            </button>
            <button className="btn-ghost" onClick={() => navigate("/propuesta")}>
              Generar propuesta
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Vista ejecutiva de telemetria industrial">
          <div className="signal-grid">
            {selectedSector.chart.map((point) => (
              <span
                key={point.label}
                style={{
                  "--bar-height": `${point.production}%`,
                  "--bar-color": selectedSector.color,
                }}
              />
            ))}
          </div>
          <div className="hero-panel">
            <CpuChipIcon />
            <div>
              <strong>{selectedSector.aiPrediction.asset}</strong>
              <span>{selectedSector.aiPrediction.recommendation}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sector-selector">
        <div className="section-heading">
          <span className="eyebrow">Seleccionar sector operativo</span>
          <h2>El producto cambia por industria, cliente y caso financiero</h2>
        </div>

        <div className="sector-grid">
          {sectors.map((sector) => {
            const Icon = icons[sector.id] || ShieldCheckIcon;
            const active = sector.id === selectedId;

            return (
              <button
                key={sector.id}
                className={`sector-card ${active ? "is-active" : ""}`}
                onClick={() => setSelectedId(sector.id)}
                style={{ "--accent-color": sector.color }}
              >
                <Icon className="sector-icon" />
                <span>{sector.name}</span>
                <small>{sector.plant}</small>
              </button>
            );
          })}
        </div>

        <article className="sector-detail" style={{ "--accent-color": selectedSector.color }}>
          <div>
            <span className="eyebrow">{selectedSector.name}</span>
            <h3>{selectedSector.headline}</h3>
            <p>{selectedSector.commercialMessage}</p>
            <div className="chip-row">
              {selectedSector.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="sector-metrics">
            {selectedSector.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>

          <div className="use-case-list">
            {selectedSector.useCases.map((item) => (
              <span key={item}>
                <CheckCircleIcon />
                {item}
              </span>
            ))}
          </div>

          <div className="proposal-strip">
            <div>
              <span>Plan recomendado</span>
              <strong>{recommendedPlan.name} | {selectedSector.price}</strong>
              <small>ROI {selectedSector.roi} con recuperacion en {selectedSector.payback}</small>
            </div>
            <button className="btn-primary" onClick={() => openSector(selectedSector)}>
              Abrir demo
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
