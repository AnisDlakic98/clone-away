import http from "./httpService";

export function authenticate(body) {
	return http.post(`/authenticate`, body);
}
