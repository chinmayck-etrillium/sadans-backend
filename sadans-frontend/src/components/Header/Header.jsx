import React, { useEffect, useState } from "react";
import "./Header.css";
import Dropdown from "../Dropdown/Dropdown";
import { example } from "../Dropdown/Example";
import axios from "axios";

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
  console.log("navigated to", selectedOption);

  async function handleExport() {
    try {
      await axios.get("http://localhost:3004/api/v1/export/csv");
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-logo">
        <h1>Sadans-CrediLedger</h1>
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
            <a href="#new-transaction">New Transaction</a>
          </li>
          <li className="navbar-item">
            <a href="#get-transaction-details">Get Transaction Details</a>
          </li>
          <li className="navbar-item">
            <a href="#upcoming-credit">Upcoming Credit Collection (TBD)</a>
          </li>
          <li className="navbar-item">
            <a href="" onClick={handleExport}>
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
