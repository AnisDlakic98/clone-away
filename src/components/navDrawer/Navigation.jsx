import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import ListIcon from "@material-ui/icons/List";
import {Link, NavLink, useLocation} from "react-router-dom";
import "./styles.scss";

const Navigation = () => {
	const navigation = [
		{
			name: "Dashboard",
			icon: <DesktopWindowsIcon />,
			link: "/dashboard",
		},
		{
			name: "Requests",
			icon: <ListIcon />,
			link: "/requests",
		},
	];
	const location = useLocation();

	return (
		<List>
			{navigation.map((item, index) => (
				<NavLink
					key={index}
					to={item.link}
					className="navigation-link"
					activeClassName="active">
					<ListItem
						button
						className={`navigation-item ${
							location.pathname === item.link ? "active" : ""
						}`}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItem>
				</NavLink>
			))}
		</List>
	);
};

export default Navigation;
