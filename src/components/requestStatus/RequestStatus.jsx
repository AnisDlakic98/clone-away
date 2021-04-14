import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {getBadgeColor} from "../../utils/helpers.js";

const RequestStatus = ({status}) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
			},
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Badge badgeContent={status.key} color="success" />
		</div>
	);
};

export default RequestStatus;
