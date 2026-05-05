import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "1", carga: 60 },
  { name: "2", carga: 75 },
  { name: "3", carga: 82 },
  { name: "4", carga: 78 }
];

export default function Energia() {
  return (
    <div className="dashboard">
      <h1>Monitoreo Eléctrico</h1>

      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="carga" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}