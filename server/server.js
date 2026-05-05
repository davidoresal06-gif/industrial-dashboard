import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const app = express();
const PORT = process.env.PORT || 4000;
const DB_PATH = new URL("./db.json", import.meta.url);

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

async function readDatabase() {
  const raw = await readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeDatabase(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

function createTelemetry() {
  const vibration = Number((2.1 + Math.random() * 0.9).toFixed(2));
  const temperature = Math.round(68 + Math.random() * 13);
  const rpm = Math.round(1430 + Math.random() * 90);
  const riskScore = Math.round((vibration - 1.8) * 18 + (temperature - 65) * 0.35);

  return {
    rpm,
    vibration,
    temperature,
    riskScore,
    status: riskScore > 28 ? "critico" : riskScore > 20 ? "advertencia" : "estable",
    prediction:
      riskScore > 24
        ? "Riesgo medio: inspeccionar rodamientos y lubricacion."
        : "Operacion estable: no se detecta falla critica.",
    timestamp: new Date().toISOString(),
  };
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "indusvue-express-api", version: "2.0.0" });
});

app.post("/api/login", async (request, response) => {
  const { email, password } = request.body;
  const db = await readDatabase();
  const user = db.users.find((item) => item.email === email && item.password === password);

  if (!user) {
    response.status(401).json({ error: "Credenciales invalidas" });
    return;
  }

  const safeUser = { ...user };
  delete safeUser.password;
  response.json({ token: randomUUID(), user: safeUser });
});

app.get("/api/telemetry", (_request, response) => {
  response.json(createTelemetry());
});

app.get("/api/events", async (_request, response) => {
  const db = await readDatabase();
  response.json(db.events);
});

app.get("/api/reports", async (_request, response) => {
  const db = await readDatabase();
  response.json(db.reports || []);
});

app.post("/api/reports", async (request, response) => {
  const db = await readDatabase();
  const report = {
    id: randomUUID(),
    title: request.body.title || "Reporte ejecutivo",
    client: request.body.client || "Demo industrial",
    createdAt: new Date().toISOString(),
    status: "guardado",
  };

  db.reports = [report, ...(db.reports || [])].slice(0, 25);
  await writeDatabase(db);
  response.status(201).json(report);
});

app.use((_request, response) => {
  response.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`IndusVue Express API running on http://localhost:${PORT}`);
});
