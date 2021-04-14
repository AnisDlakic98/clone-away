import React from "react";
import "./cards.scss";
import {capitalizeFirstLetter} from "../../utils/helpers";

const DataCard = ({title, extra, data}) => {
	return (
		<div className="custom-card data-card">
			<div className="card-head">
				<span>{capitalizeFirstLetter(title)}</span>
				{extra && <span>{extra}</span>}
			</div>
			<div className="data-card-data">{data}</div>
		</div>
	);
};

export default DataCard;
