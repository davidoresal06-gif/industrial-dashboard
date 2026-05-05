import { clients } from "../data/industrialData";

export default function ClientSelector({ clientId, onClientChange }) {
  return (
    <label className="client-selector">
      <span>Modo cliente</span>
      <select value={clientId} onChange={(event) => onClientChange(event.target.value)}>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </label>
  );
}
