import React, { useEffect, useState } from "react";

export default function Dropdown({ datas, propKey, onChange }) {
  const [valueChange, setValueChange] = useState(null);

  const handleChange = (event) => {
    setValueChange(event.target.value);
  };

  useEffect(() => {
    if (valueChange) {
      onChange(valueChange);
    }
  }, [valueChange]);

  return (
    <>
      <select onChange={handleChange}>
        {datas.map((data, index) => (
          <option key={index} value={data[propKey]}>
            {data[propKey]}
          </option>
        ))}
      </select>
    </>
  );
}
