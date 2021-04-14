const hostname =
	process.env.NODE_ENV === "production"
		? "130.61.135.242" // ovo mijenjati
		: "window.location.hostname";

const port = "8080"; // ovo mijenjati

// export const BASE_URL = window.location.protocol
// 	.concat("//")
// 	.concat(hostname)
// 	.concat(`:${port}/api`);

export const BASE_URL = "https://awaytest-api.amplitudo.me/api";

export const token = localStorage.getItem("jwt-token");
