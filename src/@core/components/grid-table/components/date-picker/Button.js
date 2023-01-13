import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../bootstrap/Button';
import { dataTableActions } from '../../store';

const ButtonDatePicker = () => {
	const dispatch = useDispatch();
	// *** CORE TABLES ***
	const { datePickerSchema } = useSelector((state) => state.gridTables);
	const { data, visible } = datePickerSchema;
	const { setVisibleDatePicker } = dataTableActions;

	const startDate = moment(data.startDate).format('MMM Do YY');
	const endDate = moment(data.endDate).format('MMM Do YY');

	const showDatePicker = () => dispatch(setVisibleDatePicker(!visible));

	return (
		<Button color='dark' isLight onClick={showDatePicker}>
			{`${startDate} - ${endDate}`}
		</Button>
	);
};

export default ButtonDatePicker;
