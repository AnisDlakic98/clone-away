import React, {useEffect, useState} from "react";
import {useUserContext} from "../../contexts/UserContext";
import DashboardCards from "./dashboardCards/DashboardCards";
import LatestSubordinateRequests from "../../components/tables/LatestSubordinateRequests";
import {useShowToRoles} from "../../utils/showToRole";
import {
	getMyRequests,
	getSubordinateRequests,
	getUnassignedRequests,
} from "../../services/requestsService";

const Dashboard = () => {
	const context = useUserContext();
	const [departmentAbsences, setDepartmentAbsences] = useState([]);
	const [subordinateRequests, setSubordinateRequests] = useState([]);
	const [unassignedRequests, setUnassaignedRequests] = useState([]);
	const [refresh, setRefresh] = useState(0);
	const [myRequests, setMyRequests] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data: subordinateRequests} = await getSubordinateRequests();
				setSubordinateRequests(subordinateRequests.content);

				const {data: unassignedRequests} = await getUnassignedRequests();
				setUnassaignedRequests(unassignedRequests.content);

				const {data} = await getMyRequests();
				setMyRequests(data.content);
			} catch (err) {}
		};
		fetchData();
	}, [refresh]);

	return (
		<div>
			<DashboardCards />
			{useShowToRoles("hr", "ceo", "superior") && (
				<LatestSubordinateRequests
					requests={subordinateRequests}
					refresh={() => setRefresh((prevState) => prevState + 1)}
				/>
			)}
		</div>
	);
};

export default Dashboard;
