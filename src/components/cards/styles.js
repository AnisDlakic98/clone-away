import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
	root: {
		minWidth: 235,
		maxWidth: 100,
		backgroundColor: "var(--color-primary)",
		color: "#fff",
		borderRadius: 10,
		marginRight: 20,
		position: "relative",
		"&::before": {
			content: "",
			display: "inline-block",
			position: "absolute",
			width: 140,
			height: 140,
			backgroundColor: "red",
			borderRadius: "100%",
			bottom: "-50px",
			right: "-50px",
		},
	},
	number: {
		paddingLeft: 10,
	},
	cardContent: {
		paddingBottom: 0,
		display: "flex",
		justifyContent: "space-between",
	},
	h6: {
		fontSize: 15,
		fontWeight: "bold",
	},
});
