import { useNavigate } from "react-router-dom";

export default function SectorCard({ sector }) {
  const navigate = useNavigate();

  return (
    <div className="industrial-card" onClick={() => navigate(sector.ruta)}>
      <h2>{sector.nombre}</h2>
      <p>Optimización, monitoreo y automatización avanzada</p>
      <button>Ver solución →</button>
    </div>
  );
}