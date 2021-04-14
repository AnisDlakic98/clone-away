import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./styles.scss";

const Calendar = ({events, title}) => {
	const formatedEvents = events?.map((event) => {
		const formatedEvent = {
			id: event.id,
			title: `${event.employeeFirstName} ${event.employeeLastName}${
				event.vacationRequestTypeName !== null
					? event.vacationRequestTypeName !== undefined
						? ` - ${event.vacationRequestTypeName}`
						: ` - Vacations plan`
					: `- Unpaid absence`
			}`,
			allDay: true,
			type: event.type || "vacation",
			imgSrc: event.image,
			extendedProps: {
				firstName: event.employeeFirstName,
				lastName: event.employeeLastName,
				id: event.id,
				...event,
			},
		};
		if (event.validFrom !== event.validTo) {
			formatedEvent.startRecur = new Date(event.validFrom);
			formatedEvent.endRecur = new Date(event.validTo);
		} else {
			formatedEvent.start = new Date(event.validFrom);
			formatedEvent.end = new Date(event.validTo);
		}
		return formatedEvent;
	});

	return (
		<div id="calendarWrapp">
			<div className="calendar-header">
				<div className="calendar-title">{title}</div>
			</div>
			<FullCalendar
				navLinks={false}
				firstDay={1}
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={formatedEvents}
			/>
		</div>
	);
};

export default Calendar;
