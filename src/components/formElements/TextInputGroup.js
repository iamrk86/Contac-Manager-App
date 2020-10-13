import React from "react";
import classnames from "classnames";

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={classnames("form-control", {
          "is-invalid": error,
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextInputGroup.defaultProps = {
  type: "text",
};
export default TextInputGroup;
