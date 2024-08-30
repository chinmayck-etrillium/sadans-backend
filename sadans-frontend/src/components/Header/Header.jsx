import React, { useEffect, useState } from "react";
import "./Header.css";
import Dropdown from "../Dropdown/Dropdown";
import { example } from "../Dropdown/Example";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Header() {
  const [selectedOption, setSelectedOption] = useState();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownChange = (value) => {
    console.log("Value: ", value);
    setSelectedOption(value);
  };

  async function handleExport() {
    try {
      await axios.get("http://localhost:3004/api/v1/export/csv");
      await axios.get("http://localhost:3004/api/v1/export/csv/clients");
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-logo">
        <Link to="/" style={{ textDecoration: "none", color: "#edefff" }}>
          <h1>Sadans-CrediLedger</h1>
        </Link>
      </div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item dropdown-item">
            <Dropdown
              datas={example}
              propKey="name"
              dropdownMenuTitle="EntityManager"
              onChange={(value) => handleDropdownChange(value)}
            />
          </li>
          <li className="navbar-item">
            <Link to="new-transaction">New Transaction</Link>
          </li>
          <li className="navbar-item">
            <Link to="get-transaction">Get Transaction Details</Link>
          </li>
          <li className="navbar-item">
            <a href="#upcoming-credit">Upcoming Credit Collection (TBD)</a>
          </li>
          <li className="navbar-item">
            <a href="#eghdh" onClick={handleExport}>
              Export as CSV
            </a>
          </li>
          <li className="navbar-item">
            <a href="#help">Help</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
