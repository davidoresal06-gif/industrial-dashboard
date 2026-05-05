import { useState } from "react";
import { ChatBubbleLeftRightIcon, CircleStackIcon, ExclamationTriangleIcon, WifiIcon } from "@heroicons/react/24/outline";
import { databaseOptions, getClientById, getClientSector } from "../Data/IndustrialData";

export default function Support({ clientId }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const sendWhatsAppAlert = (event) => {
    event.preventDefault();
    if (!phone.trim()) {
      setStatus("Ingresa un numero valido.");
      return;
    }

    setStatus(`Alerta demo enviada para ${client.name}: ${sector.aiPrediction.asset}.`);
    setTimeout(() => setStatus(""), 4500);
  };

  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">{client.name} | operaciones 24/7</span>
          <h1>Centro de soporte, API y datos</h1>
          <p>{sector.aiPrediction.recommendation}</p>
        </div>
      </header>

      <section className="kpi-grid">
        <article className="kpi-card">
          <ExclamationTriangleIcon className="kpi-icon warning" />
          <div>
            <h3>Alertas activas</h3>
            <strong>{sector.alerts.length}</strong>
            <span>{sector.alerts[0].title}</span>
          </div>
        </article>
        <article className="kpi-card">
          <WifiIcon className="kpi-icon" />
          <div>
            <h3>Estado API</h3>
            <strong>Online</strong>
            <span>localhost:4000/api</span>
          </div>
        </article>
      </section>

      <section className="analytics-grid">
        <article className="panel support-panel">
          <ChatBubbleLeftRightIcon />
          <div>
            <h2>Probar alerta WhatsApp/SMS</h2>
            <p>En produccion, esta accion debe salir del backend para proteger API keys.</p>
            <form onSubmit={sendWhatsAppAlert} className="inline-form">
              <input
                type="text"
                placeholder="+524641234567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <button type="submit" className="btn-primary">Enviar prueba</button>
            </form>
            {status && <span className="form-status">{status}</span>}
          </div>
        </article>

        <article className="panel">
          <h2>Alertas IA del sector</h2>
          <div className="alert-list">
            {sector.alerts.map((alert) => (
              <div key={alert.title} className={`alert-item ${alert.severity}`}>
                <strong>{alert.title}</strong>
                <span>{alert.detail}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="addon-grid">
        {databaseOptions.map((option) => (
          <article className="panel addon-card" key={option.name}>
            <CircleStackIcon />
            <div>
              <h2>{option.name}</h2>
              <strong>{option.fit}</strong>
              <p>{option.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
