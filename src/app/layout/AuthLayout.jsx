import React, {useState} from "react";
import {useTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar"; // ne radi bez ovoga
import {useStyles} from "./styles";

import TopBar from "../../components/topBar/TopBar.jsx";
import NavDrawer from "../../components/navDrawer/NavDrawer";

const AuthLayout = ({pageTitle, children}) => {
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = useState(false);

	return (
		<div className={classes.root}>
			<TopBar
				pageTitle={pageTitle}
				classes={classes}
				open={open}
				setOpen={setOpen}
			/>

			<NavDrawer
				classes={classes}
				open={open}
				theme={theme}
				setOpen={setOpen}
			/>

			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
};

export default AuthLayout;
