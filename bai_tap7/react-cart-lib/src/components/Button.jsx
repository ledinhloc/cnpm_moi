// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Button = ({ children, onClick, variant = "primary" }) => {
  const styles = clsx(
    "px-4 py-2 rounded font-medium",
    variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
    variant === "secondary" && "bg-gray-200 text-black hover:bg-gray-300"
  );

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};
