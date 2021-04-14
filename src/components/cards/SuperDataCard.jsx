import React, {useState, useEffect} from "react";
import "./cards.scss";
import {capitalizeFirstLetter} from "../../utils/helpers";

const SuperDataCard = ({title, data, optionsKey, dataKey}) => {
	const [selectedOption, setSelectedOption] = useState(null);
	const [optionsActive, setOptionsActive] = useState(false);

	useEffect(() => {
		if (data.length) {
			setSelectedOption(data[data.length - 1]);
		}
	}, [data]);

	const handleClick = () => {
		setOptionsActive(false);
	};

	const handleOptionSelect = (option) => {
		setSelectedOption(option);
	};

	useEffect(() => {
		if (optionsActive) document.addEventListener("click", handleClick);
		else document.removeEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [optionsActive]);

	return (
		<div className="custom-card data-card data-card-super">
			<div className="card-head">
				<span>{capitalizeFirstLetter(title)}</span>
				{!!data.length && (
					<div className={"extra-select " + (optionsActive && "active")}>
						<div
							className="current-extra"
							onClick={() => setOptionsActive(!optionsActive)}>
							{selectedOption && selectedOption[optionsKey]}{" "}
							<span className="arrow"></span>
						</div>
						<ul className="options">
							{data?.map((option, idx) => (
								<li
									key={idx}
									className={
										selectedOption &&
										selectedOption[optionsKey] === option[optionsKey]
											? "d-none"
											: ""
									}
									onClick={() => handleOptionSelect(option)}>
									{option[optionsKey]}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<div className="data-card-data">
				{data.length !== 0 ? selectedOption && selectedOption[dataKey] : 0}
			</div>
		</div>
	);
};

export default SuperDataCard;
