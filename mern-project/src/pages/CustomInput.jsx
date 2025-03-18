import React from "react";

const CustomInput = ({ label, name, type, value, onChange, error, placeholder }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      
    
    </div>
  );
};

export default CustomInput;
