import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>INDUSTRIAL TECH</h2>
      <Link to="/">Inicio</Link>
    </nav>
  );
}