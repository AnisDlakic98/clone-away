import React, {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {AsyncPaginate} from "react-select-async-paginate";
import http from "../../services/httpService";
import PropTypes from "prop-types";

const SelectInfinite = ({
	name,
	defaultValue = null,
	options,
	api,
	apiAddon = null,
	filterApi,
	defaultOptions = true,
	valueKey = "id",
	labelKey = "name",
	formatLabel,
	className,
	queryKeys = ["name.contains"],
	placeholder = "Select",
	pagination = true,
	simpleFilter = false,
	onChange = () => {},
	...rest
}) => {
	const [list, setList] = useState([]);
	if (!useFormContext())
		throw new Error('Smart components must be in "Form" wrapper component!');
	if (options && api)
		throw new Error(
			'Select component cannot have both "options" and "api" props'
		);
	if (!name) {
		throw new Error('"name" field is required for SelectInfinite component');
	}
	if (!api && !options) {
		throw new Error(
			'"api" or "options" field is required for SelectInfinite component'
		);
	}

	const filterByLabel = (query) => {
		return list.filter((item) => {
			return item.label.toLowerCase().includes(query.toLowerCase());
		});
	};

	const {control, errors} = useFormContext();

	const getData = async (query, loadedOptions, {page}) => {
		if (!api) return {options: [], hasMore: false};

		let selectOptions = [];
		let hasMore;
		let options = [];

		try {
			if (simpleFilter && query) {
				options = filterByLabel(query);
				hasMore = selectOptions.length > 0;
			} else {
				let url = `${(query && filterApi) || api}?page=${page}${
					apiAddon ? `&${apiAddon}` : ""
				}`;
				if (query) {
					for (let key of queryKeys) {
						url += `&${key}=${query}`;
					}
				}
				const {data} = await http.get(url);
				const formattedData = data.map((option) => ({
					value: option[valueKey],
					label: option[labelKey] || formatLabel(option),
					data: option,
				}));
				setList(formattedData);
				selectOptions = data;
				hasMore = selectOptions.length > 0;
				options = selectOptions.map((option) => ({
					value: option[valueKey],
					label: option[labelKey] || formatLabel(option),
					data: option,
				}));
			}
		} catch (err) {
			hasMore = false;
			options = [];
		}

		return {
			options,
			hasMore: pagination === false ? false : hasMore,
			additional: {page: page + 1},
		};
	};

	return (
		<>
			<Controller
				control={control}
				name={name}
				as={AsyncPaginate}
				loadOptions={getData}
				defaultOptions={!!api && defaultOptions}
				defaultValue={defaultValue}
				options={options}
				additional={{page: 0}}
				className={`${className} ${errors[name] && "error-field"}`}
				classNamePrefix={"select-infinite"}
				components={{IndicatorSeparator: () => null}}
				isClearable={true}
				debounceTimeout={300}
				placeholder={placeholder}
				noOptionsMessage={() => "No options"}
				loadingMessage={() => "Loading..."}
				onChange={onChange}
				{...rest}
			/>
			{errors[name] && (
				<span className="error-message">{errors[name].message}</span>
			)}
		</>
	);
};

export default SelectInfinite;

SelectInfinite.propTypes = {
	name: PropTypes.string.isRequired,
	endpoint: PropTypes.string,
	options: PropTypes.array,
	defaultOptions: PropTypes.bool,
	defaultValue: PropTypes.object,
};
