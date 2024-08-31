import React, { useEffect, useState } from "react";
import "./Dropdown.css";

export default function Dropdown({
  datas,
  propKey,
  propHref,
  onChange,
  dropdownMenuTitle,
}) {
  const [valueChange, setValueChange] = useState(null);

  const handleChange = (event) => {
    setValueChange(event.target.getAttribute("value"));
  };

  useEffect(() => {
    if (valueChange) {
      onChange(valueChange);
    }
  }, [valueChange]);

  return (
    <div className="dropdown-container">
      <span>{dropdownMenuTitle}</span> {/* Trigger element */}
      <ul className="dropdown">
        {datas.map((data, index) => (
          <li key={index} value={data[propKey]} onClick={handleChange}>
            <a href={data[propHref]}>{data[propKey]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
