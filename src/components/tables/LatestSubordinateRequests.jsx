import React from "react";
import CommonTable from "../commonTable/CommonTable";

const LatestSubordinateRequests = ({requests, refresh, filters}) => {
	const rows = [];
	const columns = [
		{key: "fullName", title: "Full name"},
		{key: "departmentName", title: "Department name"},
		{key: "createdAt", title: "Date"},
		{key: "requestTypeName", title: "Request type"},
		{key: "validFrom", title: "Date from"},
		{key: "validTo", title: "Date to"},
		{key: "numOfDays", title: "Number of days"},
		{key: "requestStatus", title: "Request status"},
	];

	const createData = (
		fullName,
		departmentName,
		createdAt,
		requestTypeName,
		validFrom,
		validTo,
		numOfDays,
		requestStatus
	) => {
		return {
			fullName,
			departmentName,
			createdAt,
			requestTypeName,
			validFrom,
			validTo,
			numOfDays,
			requestStatus,
		};
	};

	console.log(requests);

	requests.map((req) => {
		rows.push(
			createData(
				req.employeeFirstName + " " + req.employeeLastName,
				req.departmentName,
				req.createdAt,
				req.requestTypeName,
				req.validFrom,
				req.validTo,
				req.numOfDays,
				req.requestStatusName
			)
		);
	});

	return (
		<div className="table-container" style={{marginTop: "30px"}}>
			<div className="table-header">
				<div className="table-title">Latest subordinate requests</div>
			</div>
			<CommonTable rows={rows} columns={columns} />
		</div>
	);
};

export default LatestSubordinateRequests;
