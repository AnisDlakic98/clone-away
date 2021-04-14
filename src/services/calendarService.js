import http from "./httpService";

export function getEmployeeAbsencesCalendarData() {
	return http.get("/calendar/employee-absences");
}
