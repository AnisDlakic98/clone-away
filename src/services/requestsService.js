import http from "./httpService";

export function getSubordinateRequestsFiltered(query) {
	return http.get(`/vacation-requests/subordinate-requests-filtered?${query}`);
}

export function getMyRequests() {
	return http.get("/vacation-requests/my-requests");
}

export function getSubordinateRequests() {
	return http.get("/vacation-requests/subordinate-requests");
}

export function getUnassignedRequests() {
	return http.get("/vacation-requests/unassigned");
}
