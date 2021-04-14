import React from "react";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const Form = ({children, schema, onSubmit, ...rest}) => {
	const methods = useForm({resolver: yupResolver(schema)});
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
				{children}
			</form>
		</FormProvider>
	);
};

export default Form;
