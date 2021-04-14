import React from "react";
import SelectInfinite from "../../../components/formFields/SelectInfinite";
import {useFormContext} from "react-hook-form";
import {formatEmployee} from "../../../utils/helpers";
import Button from "@material-ui/core/Button";

const RequestsHeadFiltersInner = () => {
	const {watch} = useFormContext();

	return (
		<div className="request-filters-wrapp">
			<SelectInfinite
				name="type"
				api="/request-types"
				placeholder="Choose type"
				defaultOptions={false}
			/>
			<SelectInfinite
				name="status"
				api="/request-statuses"
				placeholder="Choose status"
				defaultOptions={false}
			/>
			<SelectInfinite
				name="employee"
				api="/employees/subordinate"
				placeholder="Choose employee"
				formatLabel={formatEmployee}
				queryKeys={["firstName.contains"]}
				defaultOptions={false}
				pagination={false}
				simpleFilter
			/>
			<Button type="submit" variant="contained" color="primary">
				Search
			</Button>
		</div>
	);
};

export default RequestsHeadFiltersInner;
