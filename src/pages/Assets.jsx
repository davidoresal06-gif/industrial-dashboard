import { CubeIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { getClientById, getClientSector } from "";

export default function Assets({ clientId }) {
  const client = getClientById(clientId);
  const sector = getClientSector(clientId);

  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">{client.name} | activos criticos</span>
          <h1>Inventario inteligente</h1>
          <p>{sector.plant}</p>
        </div>
      </header>

      <section className="asset-grid">
        {sector.assets.map((asset) => (
          <article key={asset.id} className="panel asset-card">
            <div className="asset-icon">
              {asset.status === "Operativo" ? <CubeIcon /> : <WrenchScrewdriverIcon />}
            </div>
            <div>
              <h2>{asset.name}</h2>
              <p>{asset.id} | {asset.area}</p>
              <small>{asset.signal}</small>
            </div>
            <strong>{asset.health}%</strong>
            <span className={asset.status === "Operativo" ? "status-ok" : "status-alert"}>
              {asset.status}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}
