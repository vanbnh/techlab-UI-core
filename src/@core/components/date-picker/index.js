import {addDays} from 'date-fns'
import moment from 'moment'
import React, {useRef, useState} from 'react'
import {DateRangePicker} from 'react-date-range'
import {Clock} from 'react-feather'
import {useMedia} from 'react-use'
import {Button, Popover, PopoverBody} from 'reactstrap'
import useClickOutside from '../../../utility/hooks/useClickOutside'

const DatePickerComponent = ({datePicker, setDatePicker}) => {
  const pickerRef = useRef()
  const isSmall = useMedia('(max-width: 480px)')
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(datePicker.start_date),
      endDate: addDays(new Date(datePicker.end_date), 3),
      key: 'selection',
    },
  ])
  const [openPicker, setOpenPicker] = useState(false)
  const startDate = moment(datePicker.start_date).format('MMM Do YY')
  const endDate = moment(datePicker.end_date).format('MMM Do YY')
  useClickOutside(pickerRef, () => setOpenPicker(false))

  const onSaveDatePicker = () => {
    const date = {
      start_date: moment(dateRange[0].startDate).format('YYYY-MM-DD'),
      end_date: moment(dateRange[0].endDate).format('YYYY-MM-DD'),
    }
    setDatePicker(date)
    setOpenPicker(false)
  }

  return (
    <>
      <Button.Ripple color="primary" outline id="datePicker">
        <Clock size={14} />
        <span className="align-middle ms-25 mt-25">{`${startDate} - ${endDate}`}</span>
      </Button.Ripple>
      <Popover
        placement="bottom"
        target="datePicker"
        isOpen={openPicker}
        toggle={() => setOpenPicker(!openPicker)}
      >
        <PopoverBody>
          <div ref={pickerRef}>
            <DateRangePicker
              onChange={item => setDateRange([item.selection])}
              months={2}
              ranges={dateRange}
              showSelectionPreview
              editableDateInputs
              moveRangeOnFirstSelection={false}
              retainEndDateOnFirstSelection={false}
              scroll={{enabled: isSmall}}
              rangeColors={['#2c652f']}
              direction={isSmall ? 'vertical' : 'horizontal'}
            />
            <div className="d-flex justify-content-end mt-1">
              <Button
                color="secondary"
                className="me-50"
                outline
                size="sm"
                onClick={() => setOpenPicker(false)}
              >
                Cancel
              </Button>
              <Button color="relief-info" size="sm" onClick={onSaveDatePicker}>
                Save
              </Button>
            </div>
          </div>
        </PopoverBody>
      </Popover>
    </>
  )
}

export default DatePickerComponent
