import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {ReactComponent as Logo} from "./img/logo.svg";
import "./login.scss";
import {useStyles} from "./styles";
import {FormProvider, useForm} from "react-hook-form";
import InputText from "../../components/formFields/InputText";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {authenticate} from "../../services/authService";
import {useAuth} from "../../contexts/AuthContext";

const Login = () => {
	const classes = useStyles();

	const {authTokens, setAuthTokens} = useAuth();

	// const passwordMinChar = process.env.NODE_ENV === "production" ? 8 : 4;
	const passwordMinChar = 6;

	const schema = yup.object().shape({
		username: yup.string().min(2).max(20).required().label("Username"),
		password: yup
			.string()
			.required()
			.min(passwordMinChar)
			.max(20)
			.label("Password"),
	});

	const methods = useForm({resolver: yupResolver(schema)});
	const {register, setError} = methods;

	if (authTokens) return window.location.replace("/");

	const handleAuth = async (e) => {
		try {
			const {data} = await authenticate(e);
			if (data.id_token) {
				setAuthTokens(data.id_token);
			}
		} catch (err) {
			//   if (err.response.status === 401) {
			//     setError('password', {message: t('login.incorrect')});
			//     setError('username');
			//   }
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<div className="logo">
					<Logo />
				</div>

				<FormProvider {...methods}>
					<form
						id="loginForm"
						className={classes.form}
						onSubmit={methods.handleSubmit(handleAuth)}>
						<InputText
							name="username"
							className="form-control"
							label="Username"
						/>

						<InputText
							name="password"
							type="password"
							className="form-control"
							label="Password"
						/>

						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							size="large"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign In
						</Button>
					</form>
				</FormProvider>
			</div>
			<Box mt={8}>{/* <Copyright /> */}</Box>
		</Container>
	);
};

export default Login;
