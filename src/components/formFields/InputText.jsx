import React from "react";
import {useFormContext} from "react-hook-form";
import PropTypes from "prop-types";
import "./styles.scss";

const InputText = ({name, className = "form-control", label, ...rest}) => {
	const {register, errors} = useFormContext();
	return (
		<>
			<div className="form-group">
				<input
					type="text"
					className={`${className} ${errors[name] && "error-field"}`}
					ref={register}
					name={name}
					{...rest}
				/>
				<label htmlFor="input" className="control-label">
					{label}
				</label>
				<i className="bar"></i>

				{errors[name] && (
					<span className="error-message">{errors[name].message}</span>
				)}
			</div>
		</>
	);
};

export default InputText;

InputText.propTypes = {
	name: PropTypes.string.isRequired,
};
