import React, {useEffect, useState} from "react";
import {useUserContext} from "../../../contexts/UserContext";
import DataCard from "../../../components/cards/DataCard";
import SuperDataCard from "../../../components/cards/SuperDataCard";
import "./dasboardCards.scss";

const Dashboard = () => {
	const {remainingDays} = useUserContext();

	return (
		<div id="dashboardCards">
			<SuperDataCard
				title="Days left"
				data={remainingDays}
				optionsKey="year"
				dataKey="remainingDays"
			/>
			<DataCard title="Granted requests" data="0" />
			<DataCard title="Rejected requests" data="0" />
		</div>
	);
};

export default Dashboard;
