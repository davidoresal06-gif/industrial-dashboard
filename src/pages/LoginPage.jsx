import { useState } from "react";
import { BoltIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { users } from "../data/industrialData";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@indusvue.com");
  const [password, setPassword] = useState("IndusVue2026!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateLocalUser = () => {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) return null;
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales invalidas");
      const session = await response.json();
      onLogin(session.user);
    } catch {
      const localUser = validateLocalUser();
      if (localUser) {
        onLogin(localUser);
        return;
      }

      setError("Usuario o contrasena incorrectos. Prueba con los usuarios demo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-hero">
        <span className="eyebrow">Enterprise industrial intelligence</span>
        <h1>Monitoreo predictivo que se vende como solucion ejecutiva.</h1>
        <p>
          Demo con sectores, clientes, roles, IA predictiva, ROI, precios y propuesta comercial
          lista para presentar.
        </p>
        <div className="demo-users">
          {users.map((user) => (
            <button
              type="button"
              key={user.email}
              onClick={() => {
                setEmail(user.email);
                setPassword(user.password);
              }}
            >
              <strong>{user.role}</strong>
              <span>{user.email}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="login-card">
        <div className="login-brand">
          <BoltIcon />
          <div>
            <h2>INDUS-VUE</h2>
            <p>Secure Operations Portal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Correo corporativo
            <span className="input-shell">
              <UserIcon />
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </span>
          </label>

          <label>
            Contrasena
            <span className="input-shell">
              <LockClosedIcon />
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </span>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Validando..." : "Iniciar sesion"}
          </button>
        </form>

        <p className="login-footnote">
          Roles demo: Director, Operador, Tecnico y Ventas. Cada usuario representa una vista
          comercial distinta del producto.
        </p>
      </section>
    </main>
  );
}
