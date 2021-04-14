import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import RequestStatus from "../requestStatus/RequestStatus";

const CommonTable = ({rows, columns}) => {
	const useStyles = makeStyles({
		table: {
			minWidth: 650,
		},
		tableCell: {
			fontWeight: 700,
		},
	});

	const classes = useStyles();

	return (
		<div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							{columns.map((col) => {
								return (
									<TableCell className={classes.tableCell} align="left">
										{col.title}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows?.map((row, indx) => {
							return (
								<TableRow key={indx}>
									{columns?.map((col, indx1) => {
										return (
											<TableCell key={indx1} component="th" scope="row">
												{indx1 === columns.length - 1 ? (
													<RequestStatus
														status={{
															key: row[columns[indx1].key],
															title: row[columns[indx1].title],
														}}
													/>
												) : (
													row[columns[indx1].key]
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default CommonTable;
