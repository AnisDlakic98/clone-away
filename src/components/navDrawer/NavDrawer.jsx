import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Navigation from "./Navigation";
import {ReactComponent as Logo} from "./img/logo.svg";
import "./styles.scss";

const NavDrawer = ({classes, open, setOpen, theme}) => {
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}>
			<div className={classes.toolbar}>
				<Logo className="drawer-logo" />
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</div>
			<Divider />
			<Navigation />
		</Drawer>
	);
};

export default NavDrawer;
