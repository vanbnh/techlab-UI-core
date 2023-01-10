import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../utility/utils';
import DatePickerComponent from '../../../date-picker';
import { dataTableActions } from '../../store';

const DatePickerFilter = ({ params, onGetAll }) => {
	const dispatch = useDispatch();

	// *** REDUCER ***
	const { datePickerSchema } = useSelector((state) => state.gridTables);

	const { data, visible } = datePickerSchema;
	// *** ACTION ***
	const { setVisibleDatePicker, setDataDatePicker } = dataTableActions;

	// *** DISPATCH ***
	const onChangeDatePicker = (picker) => dispatch(setDataDatePicker(picker));
	const onHideDatePicker = () => dispatch(setVisibleDatePicker(false));

	const onSubmit = () => {
		let { startDate, endDate } = data;
		startDate = formatDate(startDate);
		endDate = formatDate(endDate);
		if (startDate !== params.start_date || endDate !== params.end_date) {
			onGetAll({ start_date: startDate, end_date: endDate });
		}
		onHideDatePicker();
	};

	if (!visible) return null;

	return (
		<DatePickerComponent
			data={data}
			onHideDatePicker={onHideDatePicker}
			onChangeDatePicker={onChangeDatePicker}
			onSubmit={onSubmit}
		/>
	);
};

export default DatePickerFilter;
