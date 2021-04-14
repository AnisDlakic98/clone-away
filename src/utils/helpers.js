export const getBadgeColor = (status) => {
	switch (status) {
		case 1:
			return "warning";
		case 2:
			return "warning";
		case 3:
			return "success";
		case 4:
			return "danger";
		case 5:
			return "danger";
		default:
			return "info";
	}
};

export const formatEmployee = (option) => {
	return `${option.firstName} ${option.lastName}`;
};

export const capitalizeFirstLetter = (string) => {
	return string && string.charAt(0).toUpperCase() + string.slice(1);
};
