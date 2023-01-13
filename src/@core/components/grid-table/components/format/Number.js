import { DataTypeProvider } from '@devexpress/dx-react-grid';
import React from 'react';

const numberFilterOperations = [
	'equal',
	'notEqual',
	'greaterThan',
	'greaterThanOrEqual',
	'lessThan',
	'lessThanOrEqual',
];

const NumberEditor = ({ value, onValueChange }) => {
	const handleChange = (event) => {
		const { value: targetValue } = event.target;
		if (targetValue.trim() === '') {
			onValueChange();
			return;
		}
		onValueChange(parseInt(targetValue, 10));
	};
	return (
		<input
			className='form-control text-right'
			type='number'
			placeholder='Filter...'
			value={value === undefined ? '' : value}
			min={0}
			onChange={handleChange}
		/>
	);
};

const NumberProvider = (props) => (
	<DataTypeProvider
		availableFilterOperations={numberFilterOperations}
		editorComponent={NumberEditor}
		{...props}
	/>
);

export default NumberProvider;
