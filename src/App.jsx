import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SectorHub from "./pages/SectorHub";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Support from "./pages/Support";
import ROIPages from "./pages/ROIPages";
import ProposalPage from "./pages/ProposalPage";
import AdminPage from "./pages/AdminPage";
import Sidebar from "./components/Sidebar";
import { canAccess, getDefaultPathForUser } from "./data/industrialData";
import "./styles/Dashboard.css";

const MainLayout = ({ children, user, clientId, onClientChange }) => (
  <div className="app-container">
    <Sidebar user={user} clientId={clientId} onClientChange={onClientChange} />
    <main className="main-content">{children}</main>
  </div>
);

const ProtectedPage = ({ permission, user, clientId, onClientChange, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (!canAccess(user, permission)) return <Navigate to={getDefaultPathForUser(user)} />;
  return <MainLayout user={user} clientId={clientId} onClientChange={onClientChange}>{children}</MainLayout>;
};

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("indusvue_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [clientId, setClientId] = useState(() => localStorage.getItem("selectedClientId") || "cfe");

  const handleLogin = (sessionUser) => {
    setUser(sessionUser);
    sessionStorage.setItem("indusvue_user", JSON.stringify(sessionUser));
  };

  const handleClientChange = (nextClientId) => {
    setClientId(nextClientId);
    localStorage.setItem("selectedClientId", nextClientId);
  };

  const isAuthenticated = Boolean(user);
  const guardProps = { user, clientId, onClientChange: handleClientChange };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={getDefaultPathForUser(user)} /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/sectores"
          element={
            <ProtectedPage permission="sectores" {...guardProps}>
              <SectorHub clientId={clientId} onClientChange={handleClientChange} />
            </ProtectedPage>
          }
        />
        <Route
          path="/monitoreo"
          element={
            <ProtectedPage permission="monitoreo" {...guardProps}>
              <Dashboard key={clientId} clientId={clientId} />
            </ProtectedPage>
          }
        />
        <Route
          path="/activos"
          element={
            <ProtectedPage permission="activos" {...guardProps}>
              <Assets clientId={clientId} />
            </ProtectedPage>
          }
        />
        <Route
          path="/soporte"
          element={
            <ProtectedPage permission="soporte" {...guardProps}>
              <Support clientId={clientId} />
            </ProtectedPage>
          }
        />
        <Route
          path="/roi"
          element={
            <ProtectedPage permission="roi" {...guardProps}>
              <ROIPages clientId={clientId} />
            </ProtectedPage>
          }
        />
        <Route
          path="/propuesta"
          element={
            <ProtectedPage permission="propuesta" {...guardProps}>
              <ProposalPage clientId={clientId} user={user} />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage permission="admin" {...guardProps}>
              <AdminPage />
            </ProtectedPage>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? getDefaultPathForUser(user) : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
