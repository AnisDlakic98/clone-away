import * as axios from "axios";
import {BASE_URL, token} from "../utils/const.js";
import Swal from "sweetalert2";

const headers = {
	Authorization: `Bearer ${token}`,
	Accept: "*/*",
};

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers = headers;

axios.interceptors.response.use(null, (error) => {
	if (!error.response) {
		return Swal.fire({
			title: "Server greska",
			icon: "error",
			showCancelButton: false,
			showCloseButton: false,
			buttonsStyling: false,
			customClass: {
				header: "m-0 p-4 align-items-center",
				confirmButton: "btn btn-primary align-items-center d-flex",
				cancelButton: "btn border-0",
				actions: "modal-footer align-items-end",
				content: "modal-body text-center border-bottom-1 pb-4",
				popup: "p-0",
			},
			preConfirm: () => {
				if (window.location.pathname !== "/forbidden") {
					window.location.replace("/forbidden");
				}
			},
		});
	} else if (
		error.response.status === 401 &&
		error.response.detail !== "Bad credentials" &&
		token
	) {
		localStorage.clear("jwt-token");
		return Swal.fire({
			title: "Unauthorized",
			text: "loginToContinue",
			confirmButtonText: "common.login",
			showCancelButton: false,
			showCloseButton: false,
			buttonsStyling: false,
			customClass: {
				header: "m-0 p-4 align-items-center",
				confirmButton: "btn btn-primary align-items-center d-flex",
				cancelButton: "btn border-0",
				actions: "modal-footer align-items-end",
				content: "modal-body text-center border-bottom-1 pb-4",
				popup: "p-0",
			},
			preConfirm: () => window.location.replace("/login"),
		});
	}
	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};
