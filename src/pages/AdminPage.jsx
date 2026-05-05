import {
  ChartBarIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { adminMetrics, clients, databaseOptions, users } from "";

export default function AdminPage() {
  return (
    <div className="page container">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Panel admin</span>
          <h1>Control comercial y operativo</h1>
          <p>Vista de administracion para usuarios, clientes demo, modulos y arquitectura de datos.</p>
        </div>
      </header>

      <section className="kpi-grid">
        {adminMetrics.map((metric, index) => {
          const Icon = [UserGroupIcon, ChartBarIcon, Cog6ToothIcon, ShieldCheckIcon][index];
          return (
            <article className="kpi-card" key={metric.label}>
              <Icon className="kpi-icon" />
              <div>
                <h3>{metric.label}</h3>
                <strong>{metric.value}</strong>
                <span>{metric.detail}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-grid">
        <article className="panel">
          <h2>Usuarios y roles</h2>
          <div className="admin-table">
            {users.map((user) => (
              <div key={user.email}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
                <small>{user.email}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Clientes demo</h2>
          <div className="admin-table">
            {clients.map((client) => (
              <div key={client.id}>
                <strong>{client.name}</strong>
                <span>{client.site}</span>
                <small>{client.audience}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Base de datos recomendada</h2>
          <div className="admin-table">
            {databaseOptions.map((option) => (
              <div key={option.name}>
                <CircleStackIcon />
                <strong>{option.name}</strong>
                <span>{option.fit}</span>
                <small>{option.detail}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
