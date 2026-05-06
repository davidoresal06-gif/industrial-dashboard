import { useState } from "react";
import { BoltIcon, ExclamationCircleIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { users } from "../Data/IndustrialData";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@industrial.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateLocalUser = () => {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) return null;
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  };

 const handleSubmit = (event) => {
  event.preventDefault();
  setError("");
  setLoading(true);

  const localUser = validateLocalUser();

  setTimeout(() => {
    if (localUser) {
      onLogin(localUser);
    } else {
      setError("Credenciales inválidas");
    }
    setLoading(false);
  }, 600);
};

    try {
      // const response = await fetch("http://localhost:4000/api/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email, password }),
// });

// if (!response.ok) throw new Error("Credenciales inválidas");
// const session = await response.json();
// onLogin(session.user);
    } catch {
      const localUser = validateLocalUser();
      if (localUser) {
        onLogin(localUser);
        return;
      }

      setError("Usuario o contrasena incorrectos. Selecciona un usuario demo o revisa tus datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page premium-login">
      <section className="login-hero">
        <span className="eyebrow">Portal industrial seguro</span>
        <h1>Acceso profesional al sistema de monitoreo</h1>
        <p>
          Inicia sesion para ver dashboards, sectores, reportes, alertas inteligentes y simulacion de fallas.
        </p>
        <div className="demo-credential">
          <strong>Usuario demo: admin@industrial.com</strong>
          <span>Contrasena: admin123</span>
        </div>
        <div className="demo-users">
          {users.map((user) => (
            <button
              type="button"
              key={user.email}
              onClick={() => {
                setError("");
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

      <section className={`login-card ${error ? "has-error" : ""}`}>
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
            <span className={`input-shell ${error ? "input-error" : ""}`}>
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
            <span className={`input-shell ${error ? "input-error" : ""}`}>
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

          {error && (
            <p className="form-error visual-error">
              <ExclamationCircleIcon />
              {error}
            </p>
          )}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Validando..." : "Iniciar sesion"}
          </button>
        </form>

        <p className="login-footnote">
          Roles demo: Director, Operador, Tecnico y Ventas. Cada usuario representa una vista comercial distinta.
        </p>
      </section>
    </main>
  );

