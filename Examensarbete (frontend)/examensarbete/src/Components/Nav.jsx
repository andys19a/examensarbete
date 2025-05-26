import React, { useState, useEffect, useRef } from "react";
import "../Styling/Nav.css";
import { Link } from "react-router-dom";

export function Navbar({ cartCount }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const categoryRef = useRef(null);
  const blogRef = useRef(null);

  // Stäng dropdowns om man klickar utanför
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (blogRef.current && !blogRef.current.contains(event.target)) {
        setBlogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem"><Link to="/">Hem</Link></li>

        {/* Kategorier */}
        <li
          className={`navItem dropdown ${categoryOpen ? "active" : ""}`}
          ref={categoryRef}
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <span className="navLink">Kategorier ▾</span>
          <ul className="dropdownMenu">
            <li><Link to="/kategorier/casa-de-papel">Casa de Papel</Link></li>
            <li><Link to="/kategorier/dexter">Dexter</Link></li>
            <li><Link to="/kategorier/prison-break">Prison Break</Link></li>
          </ul>
        </li>

        {/* Blogg */}
        <li
          className={`navItem dropdown ${blogOpen ? "active" : ""}`}
          ref={blogRef}
          onClick={() => setBlogOpen(!blogOpen)}
        >
          <span className="navLink">Blogg ▾</span>
          <ul className="dropdownMenu">
            <li><Link to="/blogg/casa-de-papel">Casa de Papel</Link></li>
            <li><Link to="/blogg/dexter">Dexter</Link></li>
            <li><Link to="/blogg/prison-break">Prison Break</Link></li>
          </ul>
        </li>

        <li className="navItem"><Link to="/kontakt">Kontakta oss</Link></li>
        <li className="navItem"><Link to="/om-oss">Om oss</Link></li>
        <li className="navItem">
          <Link to="/varukorg">🛒 Varukorg ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
}
