import React, {useState, useEffect} from "react";
import RequestsTable from "../../components/tables/RequestsTable";
import {getSubordinateRequestsFiltered} from "../../services/requestsService";
import Calendar from "../../components/calendar/Calendar";
import {getEmployeeAbsencesCalendarData} from "../../services/calendarService";
import RequestsHeadFilters from "./headFilters/RequestsHeadFilters";
import format from "date-fns/format";
import "./requests.scss";

const Requests = () => {
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(0);
	const [absences, setAbsences] = useState([]);
	const [filters, setFilters] = useState();
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const size = 7;

	const fetchRequests = async (concat) => {
		setIsLoading(true);
		let query = `page=${page}&size=${size}`;
		if (filters) query += `&${filters}`;
		try {
			const {data} = await getSubordinateRequestsFiltered(query);
			if (concat) setRequests((requests) => [...requests, ...data.content]);
			else setRequests(data.content);
			setPage((page) => page + 1);
			setHasMore(data.content.length === size);
			setIsLoading(false);
		} catch (err) {}
	};

	useEffect(() => {
		fetchRequests();
	}, [filters, refresh]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data: absences} = await getEmployeeAbsencesCalendarData();
				setAbsences(absences);
			} catch (err) {}
		};
		fetchData();
	}, []);

	const onFiltersSubmit = async (data) => {
		console.log("anis");
		const parameters = [];

		if (data.employee) parameters.push(`employeeId=${data.employee.value}`);
		if (data.status) parameters.push(`requestStatusId=${data.status.value}`);
		if (data.type) parameters.push(`requestTypeId=${data.type.value}`);
		// if (data.validFrom)
		// 	parameters.push(`dateFrom=${format(data.validFrom, "yyyy-MM-dd")}`);
		// if (data.validTo)
		// 	parameters.push(`dateTo=${format(data.validTo, "yyyy-MM-dd")}`);
		// if (data.keyword) parameters.push(`description=${data.keyword}`);

		setPage(0);
		setFilters(parameters.join("&"));
		console.log(filters);
	};

	return (
		<div className="requests">
			<RequestsHeadFilters onSubmit={onFiltersSubmit} />
			<RequestsTable
				requests={requests}
				filters={filters}
				refresh={() => {
					setPage(0);
					setRefresh((prevState) => prevState + 1);
				}}
			/>
			<Calendar events={absences} title="Absences overview" />
		</div>
	);
};

export default Requests;
