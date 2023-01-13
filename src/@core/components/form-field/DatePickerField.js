import {FormFeedback, Label} from 'reactstrap'
// ** Third Party Components
import DatePicker, {Calendar} from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'

// ** Styles
import classnames from 'classnames'

import './DatePicker.style.scss'

const gregorian_vn_lowercase = {
  name: 'gregorian_en_lowercase',
  months: [
    ['Tháng 1', 'jan'],
    ['Tháng 2', 'feb'],
    ['Tháng 3', 'mar'],
    ['Tháng 4', 'apr'],
    ['Tháng 5', 'may'],
    ['Tháng 6', 'jun'],
    ['Tháng 7', 'jul'],
    ['Tháng 8', 'aug'],
    ['Tháng 9', 'sep'],
    ['Tháng 10', 'oct'],
    ['Tháng 11', 'nov'],
    ['Tháng 12', 'dec'],
  ],
  weekDays: [
    ['saturday', 'T7'],
    ['sunday', 'CN'],
    ['monday', 'T2'],
    ['tuesday', 'T3'],
    ['wednesday', 'T4'],
    ['thursday', 'T5'],
    ['friday', 'T6'],
  ],
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  meridiems: [
    ['AM', 'am'],
    ['PM', 'pm'],
  ],
}

const DatePickerField = ({
  id,
  name,
  label,
  required,
  className = '',
  invalid = false,
  feedback,
  format = 'DD/MM/YYYY',
  time = false,
  value = [],
  onChange = () => {},
  inline = false,
  range = false,
  plugins = [],
  ...rest
}) => {
  const Picker = inline ? Calendar : DatePicker

  return (
    <>
      {label && (
        <Label className="form-label fw-bolder" for={id || name}>
          {label}{' '}
          {required && (
            <sup
              style={{
                color: '#FF0000',
                fontSize: '1rem',
                top: '0',
              }}
            >
              *
            </sup>
          )}
        </Label>
      )}
      <div className="w-100">
        <Picker
          inputClass={classnames('form-control form-date-picker', className, {
            'is-invalid': invalid,
          })}
          id={name || id}
          locale={gregorian_vn_lowercase}
          format={`${format} ${time ? 'HH:mm:ss' : ''}`}
          range={range}
          plugins={[...plugins].concat(
            time ? <TimePicker position="bottom" /> : [],
          )}
          {...rest}
          value={
            value.length > 0 ? (value.length === 1 ? value[0] : value) : ''
          }
          onChange={date => {
            if (range) {
              onChange(date.map(d => new Date(d)))
            } else {
              if (date?.isValid) {
                onChange([new Date(date)])
              } else {
                onChange([])
              }
            }
          }}
        />
        {feedback && <FormFeedback>{feedback}</FormFeedback>}
      </div>
    </>
  )
}

export default DatePickerField
