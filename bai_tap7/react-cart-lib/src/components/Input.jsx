// src/components/Input.jsx
import React from "react";
import PropTypes from "prop-types";

export const Input = ({ value, onChange, placeholder }) => (
  <input
    className="border px-3 py-2 rounded w-full"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
