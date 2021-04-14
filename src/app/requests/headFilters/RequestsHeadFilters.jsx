import React from "react";
import Form from "../../../components/Form";
import * as yup from "yup";
import RequestsHeadFiltersInner from "./RequestsHeadFiltersInner";

const RequestsHeadFilters = ({onSubmit}) => {
	const schema = yup.object().shape({
		type: yup.object().nullable(),
		status: yup.object().nullable(),
		employee: yup.object().nullable(),
	});

	return (
		<div className="head-filters">
			<Form onSubmit={onSubmit} schema={schema}>
				<RequestsHeadFiltersInner />
			</Form>
		</div>
	);
};

export default RequestsHeadFilters;
