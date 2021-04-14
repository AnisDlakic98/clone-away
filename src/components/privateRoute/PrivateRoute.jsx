import React from "react";
import {useAuth} from "../../contexts/AuthContext";
import {Route, Redirect} from "react-router-dom";
import AuthLayout from "../../app/layout/AuthLayout";
import {useShowToRoles} from "../../utils/showToRole";
import {useUserContext} from "../../contexts/UserContext";

const PrivateRoute = ({
	component: Component,
	pageTitle,
	authorizedRoles = [],
	...rest
}) => {
	const {authTokens: isAuthenticated} = useAuth();
	const authorized = useShowToRoles(...authorizedRoles);
	const {user} = useUserContext();

	// if (user && !!authorizedRoles.length && !authorized) {
	// 	return <Redirect to="/forbidden" />;
	// }

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<AuthLayout pageTitle={pageTitle}>
						<Component {...props} />
					</AuthLayout>
				) : (
					<Redirect
						to={{pathname: "/login", state: {referer: props.location}}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
