import React, {useEffect, useRef, useState} from 'react'

import {
  Template,
  // TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core'
import {DateRangePicker} from 'react-date-range'
import {addDays} from 'date-fns'
import {uid} from 'uid'
import moment from 'moment'

import './styles.scss'
import useClickOutside from '../../../../../utility/hooks/useClickOutside'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverBody,
} from 'reactstrap'
import {Plus, Search, XCircle} from 'react-feather'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const invisible = {
  opacity: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
}

const textConditionOptions = [
  {
    label: 'Contains',
    value: 'contains',
  },
  {
    label: 'Does not contain',
    value: 'not_contains',
  },
  {
    label: 'Equals',
    value: 'exact',
  },
  {
    label: 'Starts with',
    value: 'startswith',
  },
]

const numberConditionOptions = [
  {
    label: '>',
    value: 'gt',
  },
  {
    label: '>=',
    value: 'gte',
  },
  {
    label: '=',
    value: 'exact',
  },
  {
    label: 'Not equal',
    value: 'not_exact',
  },
  {
    label: '<',
    value: 'lt',
  },
  {
    label: '<=',
    value: 'lte',
  },
]

const DatePickerForm = ({onSave, onCancel, onClose, setting}) => {
  const [type, setType] = useState(setting ? setting.condition : 'between')
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    },
  ])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (setting) {
      if (setting.condition === 'between') {
        const [startDate, endDate] = setting.value
        setDateRange([
          {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: 'selection',
          },
        ])
      } else {
        setDate(new Date(setting.value))
      }
    }
  }, [setting])

  const handleSave = () => {
    let d = []
    if (type === 'between') {
      const {startDate, endDate} = dateRange[0]
      d = [
        moment(startDate).format('YYYY-MM-DD'),
        moment(endDate).format('YYYY-MM-DD'),
      ]
    } else {
      d = moment(date).format('YYYY-MM-DD')
    }
    onSave({type, date: d})
  }

  // console.log(item);

  const ref = useRef(null)

  useClickOutside(ref, () => onClose && onClose())

  return (
    <div
      className="d-flex flex-column align-item-center justify-content-center"
      ref={ref}
    >
      <div className="d-flex justify-content-center mt-1">
        <DateRangePicker
          onChange={item => setDateRange([item.selection])}
          months={2}
          ranges={dateRange}
          showSelectionPreview
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          // scroll={{enabled: true}}
          rangeColors={['#2c652f']}
          direction="horizontal"
        />
      </div>

      <div className="mt-1 d-flex justify-content-end">
        <Button
          color="secondary"
          className="me-50"
          outline
          size="sm"
          onClick={() => {
            if (onClose) {
              onClose()
            } else {
              onCancel()
            }
          }}
        >
          Cancel{' '}
        </Button>
        <Button
          size="sm"
          color={onClose ? 'primary' : 'info'}
          onClick={handleSave}
        >
          {onClose ? 'Save' : 'Add'}
        </Button>
      </div>
    </div>
  )
}

const FilterItemForm = ({
  type = 'text',
  selectCondition,
  selectValue,
  onReset,
  onSave,
  onClose,
  isEdit,
}) => {
  const ref = useRef(null)
  const [opt, setOpt] = useState(selectCondition)
  const [val, setVal] = useState(selectValue)

  useClickOutside(ref, () => onClose && onClose())

  const options =
    type === 'number' ? numberConditionOptions : textConditionOptions

  const handleSave = () => onSave({condition: opt, value: val})

  return (
    <div ref={ref}>
      <InputGroup>
        <InputGroupText>Condition</InputGroupText>
        <Input
          type="select"
          name="condition"
          id="condition-basic"
          value={opt}
          onChange={e => setOpt(e.target.value)}
        >
          {options.map(op => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </Input>
      </InputGroup>

      <InputGroup className="mt-1">
        <InputGroupText>Value</InputGroupText>
        <Input type={type} value={val} onChange={e => setVal(e.target.value)} />
      </InputGroup>
      <div className="mt-1 d-flex justify-content-end">
        <Button
          color="secondary"
          className="me-50"
          outline
          size="sm"
          onClick={() => {
            if (onClose) {
              onClose()
            } else {
              onReset()
            }
          }}
        >
          Cancel{' '}
        </Button>
        <Button
          color={isEdit ? 'primary' : 'info'}
          isDisable={val.length === 0}
          onClick={handleSave}
          size="sm"
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </div>
    </div>
  )
}

const FilterChipContent = ({item}) => {
  const renderValue = () => {
    let content = item.value
    if (Array.isArray(item.value)) {
      content = `${item.value[0]} to ${item.value[1]}`
    }
    return content
  }
  return (
    <>
      {item.title}:{' '}
      <span className="mx-25 text-muted fst-italic">
        {item.conditionName}:{' '}
      </span>
      {renderValue()}
    </>
  )
}

const ToolbarFilterProvider = ({
  columns,
  filters,
  setFilters,
  filterColumns = [],
  entries = '',
}) => {
  const pluginDependencies = [{name: 'Toolbar'}]
  const refFillterAll = useRef(null)

  const [filterTemps, setFilterTemps] = useState([])

  const [showFilters, setShowFilters] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectField, setSelectField] = useState('')
  const [selectCondition, setSelectCondition] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [popoverTargetId, setPopoverTargetId] = useState(null)
  const [popoverTargetAll, setPopoverTargetAll] = useState(false)
  useClickOutside(refFillterAll, () => setPopoverTargetAll(false))
  const [showPickerForm, setShowPickerForm] = useState(false)
  const [filterResult, setFilterResults] = useState([])

  useEffect(() => {
    setFilterResults(
      columns.filter(
        col =>
          !col.isDetailHidden &&
          filterColumns.includes(col.name) &&
          col.title
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
      ),
    )
  }, [searchValue, filterColumns, columns])

  const onReset = () => {
    setPopoverTargetId(null)
    setSelectField('')
    setSelectCondition('')
    setSelectValue('')
  }

  const onSave = ({value, condition}) => {
    if (popoverTargetId) {
      setFilters(
        filters.map(ft => {
          const newFilter = {...ft}
          if (newFilter.id === popoverTargetId) {
            let conditionVal = ''
            if (condition === '') {
              conditionVal = newFilter.type === 'number' ? 'gt' : 'contains'
            } else {
              conditionVal = condition
            }
            const options =
              newFilter.type === 'number'
                ? numberConditionOptions
                : textConditionOptions
            const conditionName = options.find(op => op.value === conditionVal)
            newFilter.condition = conditionVal
            newFilter.conditionName = conditionName.label.toLowerCase()
            newFilter.value = value
          }
          return newFilter
        }),
      )
      setPopoverTargetId(null)
    } else {
      const column = [...columns].find(col => col.name === selectField)
      const options = column.isNumber
        ? numberConditionOptions
        : textConditionOptions
      let conditionVal = ''
      if (condition === '') {
        conditionVal = column.isNumber ? 'gt' : 'contains'
      } else {
        conditionVal = condition
      }
      const conditionName = options.find(op => op.value === conditionVal)

      const key = column?.filterKey ? column?.filterKey : selectField

      setFilterTemps(fts => [
        ...fts,
        {
          id: uid(),
          key,
          condition: conditionVal,
          conditionName: conditionName.label.toLowerCase(),
          value,
          title: column.title,
          type: column.isNumber ? 'number' : 'text',
        },
      ])
    }
    onReset()
  }

  const onSaveDatePicker = d => {
    if (popoverTargetId) {
      setFilters(
        filters.map(ft => {
          const newFilter = {...ft}
          if (newFilter.id === popoverTargetId) {
            newFilter.condition = d.type
            newFilter.conditionName = d.type
            newFilter.value = d.date
          }
          return newFilter
        }),
      )
      setPopoverTargetId(null)
    } else {
      const column = [...columns].find(col => col.name === selectField)

      const key = column?.filterKey ? column?.filterKey : selectField
      setFilterTemps(fts => [
        ...fts,
        {
          id: uid(),
          key,
          condition: d.type,
          conditionName: d.type,
          value: d.date,
          title: column.title,
          type: 'date',
        },
      ])
      setShowPickerForm(false)
      setShowFilters(true)
    }
  }

  const onDelete = id => setFilters(filters.filter(f => f.id !== id))

  const renderFilterField = () => (
    <Accordion
      open={selectField}
      toggle={id => {
        if (selectField === id) {
          setSelectField('')
        } else {
          setSelectField(id)
        }
      }}
      className="accordion-border"
    >
      {filterResult
        .filter(f => !f.isDate)
        .map(item => (
          <AccordionItem key={item.name}>
            <AccordionHeader targetId={item.name}>{item.title}</AccordionHeader>
            <AccordionBody accordionId={item.name}>
              <FilterItemForm
                type={item.isNumber ? 'number' : 'text'}
                selectValue={selectValue}
                selectCondition={selectCondition}
                onReset={onReset}
                onSave={onSave}
              />
            </AccordionBody>
          </AccordionItem>
        ))}
    </Accordion>
  )

  const renderFilterDateField = () => (
    <Accordion
      open={selectField}
      toggle={id => {
        if (selectField === id) {
          setSelectField('')
        } else {
          setSelectField(id)
          setShowFilters(false)
          setShowPickerForm(true)
        }
      }}
      className="accordion-border mt-1"
    >
      {filterResult
        .filter(f => f.isDate)
        .map(item => (
          <AccordionItem key={item.name}>
            <AccordionHeader targetId={item.name}>{item.title}</AccordionHeader>
          </AccordionItem>
        ))}
    </Accordion>
  )

  return (
    <Plugin name="ToolbarFilterProvider" dependencies={pluginDependencies}>
      <Template name="toolbarContent">
        <TemplateConnector>
          {() => (
            <>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  overflow: 'clip',
                  textOverflow: 'ellipsis',
                }}
              >
                {filters.length > 0 && (
                  <div className="col-auto position-relative">
                    <div>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-primary"
                        size="sm"
                        onClick={() => setPopoverTargetAll(true)}
                        id="popoverTargetAll"
                      >
                        <span className="align-middle ms-25">
                          {filters.length}
                        </span>
                        <Plus size={16} />
                      </Button.Ripple>
                    </div>

                    <Popover
                      placement="bottom"
                      isOpen={popoverTargetAll}
                      target="popoverTargetAll"
                      toggle={() => setPopoverTargetAll(!popoverTargetAll)}
                    >
                      <PopoverBody>
                        <div
                          className="d-flex flex-column overflow-auto"
                          ref={refFillterAll}
                        >
                          <ListGroup tag="div">
                            {filters.map(f => (
                              <ListGroupItem
                                key={f.id}
                                tag="a"
                                href="#"
                                onClick={e => {
                                  e.preventDefault()
                                  setPopoverTargetAll(false)
                                  setSelectField(f.key)
                                  setPopoverTargetId(f.id)
                                  setSelectCondition(f.condition)
                                  setSelectValue(f.value)
                                }}
                              >
                                <FilterChipContent item={f} />
                              </ListGroupItem>
                            ))}
                          </ListGroup>
                        </div>
                      </PopoverBody>
                    </Popover>
                  </div>
                )}
                <div className="w-100 mt-25 d-lex align-items-center justify-content-center flex-nowrap mx-auto">
                  {filters.length > 0 &&
                    filters.map(f => (
                      <span
                        className="mx-25 position-relative cursor-pointer"
                        key={f.id}
                      >
                        <Badge
                          className="p-50 mb-50"
                          outline
                          size="sm"
                          color="light-primary"
                          id={`f_${f.id}`}
                          onClick={() => {
                            setPopoverTargetId(f.id)
                            setSelectField(f.key)
                            setSelectCondition(f.condition)
                            setSelectValue(f.value)
                          }}
                        >
                          <FilterChipContent item={f} />
                          <XCircle
                            className="cursor-pointer ms-1"
                            size={14}
                            onClick={() => onDelete(f.id)}
                          />
                        </Badge>
                        <Popover
                          placement="bottom"
                          isOpen={popoverTargetId === f.id}
                          target={`f_${f.id}`}
                          toggle={() => setPopoverTargetId('')}
                        >
                          <PopoverBody>
                            <div
                              className="d-flex flex-column overflow-auto"
                              ref={refFillterAll}
                            >
                              {f.type === 'date' ? (
                                <DatePickerForm
                                  onSave={onSaveDatePicker}
                                  onCancel={() => setShowPickerForm(false)}
                                  onClose={() => {
                                    setPopoverTargetId(null)
                                  }}
                                  setting={f}
                                />
                              ) : (
                                <FilterItemForm
                                  type={f.type}
                                  selectValue={selectValue}
                                  selectCondition={selectCondition}
                                  onClose={() => setPopoverTargetId(null)}
                                  isEdit
                                  onReset={onReset}
                                  onSave={onSave}
                                />
                              )}
                            </div>
                          </PopoverBody>
                        </Popover>
                      </span>
                    ))}
                  <span className="position-relative ms-50">
                    <Button
                      color="flat-primary"
                      // className="ms-1"
                      onClick={() => {
                        onReset()
                        setShowFilters(true)
                      }}
                      style={
                        showFilters
                          ? invisible
                          : {
                              outline: 'none',
                              border: 'none',
                              backgroundColor: 'transparent',
                              padding: 0,
                            }
                      }
                    >
                      Add filter
                    </Button>
                  </span>
                </div>
              </div>
              <Modal
                isOpen={showFilters}
                scrollable
                className="modal-dialog-centered modal-lg"
              >
                <ModalHeader toggle={() => setShowFilters(false)}>
                  Filter {entries}
                </ModalHeader>
                <ModalBody>
                  <div>
                    <InputGroup className="mb-2">
                      <InputGroupText>
                        <Search size={14} />
                      </InputGroupText>
                      <Input
                        placeholder="Search..."
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                    </InputGroup>
                  </div>
                  <div
                    className="position-sticky overflow-auto"
                    style={{top: -13}}
                  >
                    {filterTemps.length > 0 && (
                      <div className="d-flex mb-50">
                        {filterTemps.map(f => (
                          <Badge
                            className="mx-25 cursor-pointer"
                            key={f.id}
                            color="light-primary"
                            pill
                          >
                            <FilterChipContent item={f} />
                            <XCircle
                              className="cursor-pointer ms-1"
                              size={14}
                              onClick={() =>
                                setFilterTemps(fts =>
                                  fts.filter(ft => ft.id !== f.id),
                                )
                              }
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="d-flex flex-column mb-0">
                    {filterResult.length > 0 ? (
                      <>
                        {renderFilterField()}
                        {renderFilterDateField()}
                      </>
                    ) : (
                      <div className="mt-1">
                        <td>No result found for query: {searchValue}</td>
                      </div>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="mt-1 d-flex justify-content-end">
                    <Button
                      color="secondary"
                      className="me-50"
                      outline
                      onClick={() => {
                        setFilterTemps([])
                        setShowFilters(false)
                      }}
                    >
                      Cancel{' '}
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        setFilters([...filters, ...filterTemps])
                        setShowFilters(false)
                        setFilterTemps([])
                      }}
                    >
                      Apply{' '}
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={showPickerForm}
                className="modal-dialog-centered modal-xl"
                scrollable
              >
                <ModalBody>
                  <DatePickerForm
                    onSave={onSaveDatePicker}
                    onCancel={() => setShowPickerForm(false)}
                  />
                </ModalBody>
              </Modal>
            </>
          )}
        </TemplateConnector>
      </Template>
    </Plugin>
  )
}

export default ToolbarFilterProvider
