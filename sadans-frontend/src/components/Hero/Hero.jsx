import React from "react";
import "./Hero.css";

export default function Hero({ children }) {
  return (
    <div className="split-screen">
      <div className="left-pane">
        <ul className="menu-list">
          <li className="menu-item">Staff Attendance</li>
          <li className="menu-item">To do</li>
          <li className="menu-item">Business Analytics</li>
          <li className="menu-item">Option 1</li>
          <li className="menu-item">Option 2</li>
        </ul>
      </div>
      <div className="right-pane">{children}</div>
    </div>
  );
}
