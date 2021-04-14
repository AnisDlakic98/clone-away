import React, {useState, useEffect, useReducer} from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import {AuthContext} from "./contexts/AuthContext";
import {UserContext} from "./contexts/UserContext";
import {token} from "./utils/const";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./utils/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./app/dashboard/Dashboard";
import Requests from "./app/requests/Requests";
import Login from "./app/login/Login";
import {getAccount} from "./services/accountService";
import {getEmployeeDaysTotal} from "./services/daysService";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
	const existingTokens = localStorage.getItem("jwt-token");
	const [authTokens, setAuthTokens] = useState(existingTokens);
	const [user, setUser] = useState();
	const [remainingDays, setRemainingDays] = useState([]);

	const setTokens = (data) => {
		localStorage.setItem("jwt-token", data);
		setAuthTokens(data);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await getAccount();
				setUser(data);
				const {data: remainingDays} = await getEmployeeDaysTotal();
				setRemainingDays(remainingDays);
			} catch (err) {}
		};
		if (token) {
			fetchData();
		} else {
		}
	}, []);

	return (
		<AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
			<UserContext.Provider
				value={{
					user,
					remainingDays,
					roleCode: user?.roleCode,
				}}>
				<ThemeProvider theme={theme}>
					<CssBaseline />

					<div className="App">
						<Router>
							<Switch>
								<Route path="/login" exact component={Login} />

								<PrivateRoute
									path="/dashboard"
									exact
									component={Dashboard}
									pageTitle="Dashboard title"
								/>

								<PrivateRoute
									path="/requests"
									exact
									component={Requests}
									pageTitle="Requests"
								/>

								<Route path="/requests" exact component={Dashboard} />

								<Redirect from="/" exact to="/dashboard" />
							</Switch>
						</Router>
						{/* <Dashboard /> */}
					</div>
				</ThemeProvider>
			</UserContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
