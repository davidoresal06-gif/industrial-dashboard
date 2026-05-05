import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const PORT = process.env.PORT || 4000;
const DB_PATH = new URL("./db.json", import.meta.url);

async function readDatabase() {
  const raw = await readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

function sendJson(request, response, status, data) {
  const origin = request.headers.origin || "http://localhost:5173";

  response.writeHead(status, {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(data));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
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
    prediction:
      riskScore > 24
        ? "Riesgo medio: inspeccionar rodamientos y lubricacion."
        : "Operacion estable: no se detecta falla critica.",
    timestamp: new Date().toISOString(),
  };
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(request, response, 204, {});
    return;
  }

  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/api/health") {
      sendJson(request, response, 200, { ok: true, service: "indusvue-api", version: "1.0.0" });
      return;
    }

    if (url.pathname === "/api/login" && request.method === "POST") {
      const { email, password } = await readBody(request);
      const db = await readDatabase();
      const user = db.users.find((item) => item.email === email && item.password === password);

      if (!user) {
        sendJson(request, response, 401, { error: "Credenciales invalidas" });
        return;
      }

      const safeUser = { ...user };
      delete safeUser.password;
      sendJson(request, response, 200, { token: randomUUID(), user: safeUser });
      return;
    }

    if (url.pathname === "/api/telemetry") {
      sendJson(request, response, 200, createTelemetry());
      return;
    }

    if (url.pathname === "/api/events") {
      const db = await readDatabase();
      sendJson(request, response, 200, db.events);
      return;
    }

    sendJson(request, response, 404, { error: "Ruta no encontrada" });
  } catch (error) {
    sendJson(request, response, 500, { error: "Error interno", detail: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`IndusVue API running on http://localhost:${PORT}`);
});
