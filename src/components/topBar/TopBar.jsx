import React from "react";
import clsx from "clsx";
import {NavLink, useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {useAuth} from "../../contexts/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";

import "./topBar.scss";

const TopBar = ({classes, open, setOpen, pageTitle}) => {
	let history = useHistory();
	const menuId = "primary-search-account-menu";
	const [anchorEl, setAnchorEl] = React.useState(null);
	const {setAuthTokens} = useAuth();
	const menuOpen = Boolean(anchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.removeItem("jwt-token");
		setAuthTokens("");
		history.push("/");
	};

	const changeLanguageHandler = () => {
		console.log("Izmjena jezika");
	};

	return (
		<div>
			<AppBar
				id="appBar"
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuIcon />
					</IconButton>
					<Typography className="logo" variant="h6" noWrap>
						{pageTitle}
					</Typography>
					<IconButton aria-label="show 4 new mails" color="inherit">
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</IconButton>
					<IconButton aria-label="show 17 new notifications" color="inherit">
						<Badge badgeContent={17} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit">
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={menuOpen}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={"mne"}
						onChange={changeLanguageHandler}>
						<MenuItem value={"mne"}>Montenegrin</MenuItem>
						<MenuItem value={"en"}>English</MenuItem>
					</Select>
				</MenuItem>
				<Divider />
				<MenuItem onClick={logout}>
					<ExitToAppIcon /> Logout
				</MenuItem>
			</Menu>
		</div>
	);
};

export default TopBar;
