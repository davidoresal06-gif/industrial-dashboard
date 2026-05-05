export default function DashboardCard({ title, value, status }) {
  return (
    <div className="industrial-dash-card">
      <h3>{title}</h3>
      <h2>{value}</h2>
      <span className={`status-${status}`}> /</span>
    </div>
  );
}