// src/components/Input.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Input = ({ value, onChange, placeholder, type = "text", className }) => (
  <input
    type={type}
    className={clsx("border px-3 py-2 rounded", className)}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
