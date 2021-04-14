import http from "./httpService";

export function getEmployeeDaysTotal() {
	return http.get("/employee-yearly-days/total");
}

export function getEmployeeYearlyDaysById(id) {
	return http.get(`/employee-yearly-days/employee/${id}`);
}
