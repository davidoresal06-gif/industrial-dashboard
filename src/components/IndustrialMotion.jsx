export default function IndustrialMotion({ compact = false }) {
  return (
    <div className={`industrial-motion ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="motion-radar">
        <span />
        <i />
        <b />
      </div>
      <div className="motion-pipeline">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="motion-nodes">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="motion-scan" />
    </div>
  );
}
