import React, {useEffect, useRef, useState} from 'react'

import {Template, Plugin, TemplateConnector} from '@devexpress/dx-react-core'
import {DateRangePicker} from 'react-date-range'
import {enUS, ja} from 'react-date-range/dist/locale'
import {addDays, format, isWeekend} from 'date-fns'
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
import {Filter, Plus, Search, XCircle} from 'react-feather'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {useTranslation} from 'react-i18next'
import {useMedia} from 'react-use'
import {getInputRanges, getStaticRanges} from './func'
import {SelectField} from '../../../form-field'
import axios from 'axios'

const invisible = {
  opacity: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
}

const textConditionOptions = [
  {
    label: 'Contain',
    value: 'contains',
  },
  {
    label: 'Does not contain',
    value: 'not_contains',
  },
  {
    label: 'Equal',
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

const FilterChipContent = ({item, onClick}) => {
  const {t} = useTranslation()
  const renderValue = () => {
    let content = item.value
    if (Array.isArray(item.value)) {
      content = `${item.value[0]} to ${item.value[1]}`
    }
    return content
  }
  return (
    <span onClick={() => onClick && onClick()}>
      {t(item.title)}:{' '}
      <span className="mx-25 text-muted fst-italic">
        {item.conditionName}:{' '}
      </span>
      {renderValue()}
    </span>
  )
}

const LOCATES = {
  en: enUS,
  jp: ja,
}

const DatePickerFieldForm = ({onSave, onCancel, onClose, setting}) => {
  const {t, i18n} = useTranslation()
  const isMedium = useMedia('(max-width: 768px)')
  const [type] = useState(setting ? setting.condition : 'between')
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

  const ref = useRef(null)

  useClickOutside(ref, () => onClose && onClose())

  useEffect(() => {
    if (isMedium) {
      const defineRange = document.querySelector('.rdrDefinedRangesWrapper')
      if (defineRange) {
        defineRange.style.display = 'none'
      }
    }
  }, [isMedium])

  return (
    <div
      className="d-flex flex-column align-item-center justify-content-center"
      ref={ref}
    >
      <div className="d-flex justify-content-center mt-1">
        <DateRangePicker
          locale={LOCATES[i18n.language]}
          onChange={item => setDateRange([item.selection])}
          months={2}
          ranges={dateRange}
          showSelectionPreview
          editableDateInputs
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          scroll={{enabled: isMedium}}
          rangeColors={['#2c652f']}
          direction={isMedium ? 'vertical' : 'horizontal'}
          staticRanges={getStaticRanges(t)}
          inputRanges={getInputRanges(t)}
          dayContentRenderer={day => {
            return (
              <div>
                <span className={isWeekend(day) ? 'text-danger' : ''}>
                  {format(day, 'd')}
                </span>
              </div>
            )
          }}
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
          {t('Cancel')}
        </Button>
        <Button
          size="sm"
          color={onClose ? 'primary' : 'info'}
          onClick={handleSave}
        >
          {t(onClose ? 'Save' : 'Add')}
        </Button>
      </div>
    </div>
  )
}

const StringFieldForm = ({
  type = 'text',
  selectCondition,
  selectValue,
  onReset,
  onSave,
  onClose,
  isEdit,
}) => {
  const ref = useRef(null)
  const {t} = useTranslation()
  const [opt, setOpt] = useState(selectCondition)
  const [val, setVal] = useState(selectValue)

  useClickOutside(ref, () => onClose && onClose())

  let options =
    type === 'number' ? numberConditionOptions : textConditionOptions

  options = options.map(op => ({...op, label: t(op.label)}))

  const handleSave = () => onSave({condition: opt, value: val})

  return (
    <div ref={ref}>
      <InputGroup>
        <InputGroupText>{t('Condition')}</InputGroupText>
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
        <InputGroupText>{t('Value')}</InputGroupText>
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
          {t('Cancel')}
        </Button>
        <Button
          color={isEdit ? 'primary' : 'info'}
          isDisable={val.length === 0}
          onClick={handleSave}
          size="sm"
        >
          {t(isEdit ? 'Save' : 'Add')}
        </Button>
      </div>
    </div>
  )
}

const OptionFieldForm = ({
  id,
  value,
  isEdit,
  onReset,
  onClose,
  onSave,
  fetchOption,
  filterKey,
  mapOptions,
}) => {
  // *** HOOKS ***
  const {t} = useTranslation()

  // *** STATE ***
  // const [options, setOptions] = useState([])
  const [clientSelects, setClientSelects] = useState([])

  const fetchOptions = async v => {
    let data = []
    const options = await axios
      .post(
        fetchOption,
        v
          ? [
              {
                expr: 'contains',
                key: filterKey,
                value: v,
              },
            ]
          : [],
        {
          params: {
            page: 1,
            limit: 8,
          },
        },
      )
      .then(res => res.data)
    if (options.data.length > 0) {
      data = (mapOptions && mapOptions(options.data)) || []
    }

    return data
  }

  // *** FUNCTIONS ***
  const handleSave = () => {
    onSave(clientSelects, isEdit)
    setClientSelects([])
  }

  useEffect(() => {
    if (value) {
      setClientSelects([{value, label: value}])
    }
  }, [value])

  return (
    <>
      <div style={isEdit ? {minWidth: '300px'} : {}}>
        <SelectField
          name={id}
          value={clientSelects}
          onChange={setClientSelects}
          isClearable
          isMulti={!isEdit}
          required
          placeholder={t('Select...')}
          type="async"
          loadOptions={fetchOptions}
          cacheOptions
          defaultOptions
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
              onReset()
            }
          }}
        >
          {t('Cancel')}
        </Button>
        <Button
          color={isEdit ? 'primary' : 'info'}
          onClick={handleSave}
          size="sm"
        >
          {t(isEdit ? 'Save' : 'Add')}
        </Button>
      </div>
    </>
  )
}

//  *** Main Component ***
const ToolbarFilterProvider = ({
  columns,
  filters,
  setFilters,
  filterColumns = [],
}) => {
  // *** HOOKS ***
  const {t} = useTranslation()
  const pluginDependencies = [{name: 'Toolbar'}]
  const refFillterAll = useRef(null)

  const [filterTemps, setFilterTemps] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectField, setSelectField] = useState('')
  const [selectFieldOptionId, setSelectFieldOptionId] = useState('')
  const [selectCondition, setSelectCondition] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [popoverTargetId, setPopoverTargetId] = useState(null)
  const [popoverTargetAll, setPopoverTargetAll] = useState(false)
  useClickOutside(refFillterAll, () => setPopoverTargetAll(false))
  const [showPickerForm, setShowPickerForm] = useState(false)
  const [showOptionForm, setShowOptionForm] = useState(false)
  const [filterResult, setFilterResults] = useState([])

  // *** CONSTANTS ***
  const columnSelect = columns.find(col => col.name === selectField)

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

  const onSaveOptions = (options, isEdit) => {
    if (isEdit) {
      const filter = options[0]
      setFilters(
        filters.map(f => {
          const newFilter = {...f}
          if (newFilter.id === selectFieldOptionId) {
            newFilter.value = filter.label
          }
          return newFilter
        }),
      )
      setShowOptionForm(false)
    } else {
      const d = options.map(o => {
        const col = columns.find(c => c.name === selectField)
        const key = col?.filterKey ? col?.filterKey : selectField
        return {
          id: uid(),
          key,
          condition: 'exact',
          conditionName: 'Equal',
          value: o.label,
          title: col.title,
          type: 'option',
          name: col.name,
        }
      })
      setFilterTemps(fts => [...fts, ...d])
      setSelectField('')
    }
  }

  const onDelete = id => setFilters(filters.filter(f => f.id !== id))

  const renderStringField = () => (
    <Accordion
      open={selectField}
      toggle={id => {
        if (selectField === id) {
          setSelectField('')
        } else {
          setSelectField(id)
        }
      }}
      className="accordion-margin mt-3"
    >
      {filterResult
        .filter(f => !f.isDate && !f.isOption)
        .map(item => (
          <AccordionItem key={item.name} className="bg-light-primary">
            <AccordionHeader targetId={item.name}>
              {t(item.title)}
            </AccordionHeader>
            <AccordionBody accordionId={item.name}>
              <StringFieldForm
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

  const renderDatePickerField = () => (
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
      className="accordion-margin mt-3"
    >
      {filterResult
        .filter(f => f.isDate)
        .map(item => (
          <AccordionItem key={item.name}>
            <AccordionHeader targetId={item.name}>
              {t(item.title)}
            </AccordionHeader>
          </AccordionItem>
        ))}
    </Accordion>
  )

  const renderOptionField = () => {
    return (
      <Accordion
        open={selectField}
        toggle={id => {
          if (selectField === id) {
            setSelectField('')
          } else {
            setSelectField(id)
          }
        }}
        className="accordion-margin"
      >
        {filterResult
          .filter(f => f.isOption)
          .map(item => (
            <AccordionItem key={item.name} className="bg-light-primary">
              <AccordionHeader targetId={item.name}>
                {t(item.title)}
              </AccordionHeader>
              <AccordionBody accordionId={item.name}>
                <OptionFieldForm
                  id={item.name}
                  onReset={onReset}
                  onSave={onSaveOptions}
                  fetchOption={item.fetchOption}
                  filterKey={item.optionField}
                  mapOptions={item.mapOptions}
                />
              </AccordionBody>
            </AccordionItem>
          ))}
      </Accordion>
    )
  }

  return (
    <>
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
                          >
                            <FilterChipContent
                              item={f}
                              onClick={() => {
                                if (f.type === 'option') {
                                  setSelectFieldOptionId(f.id)
                                  setSelectField(f.name)
                                  setSelectValue(f.value)
                                  setShowOptionForm(!showOptionForm)
                                } else {
                                  setPopoverTargetId(f.id)
                                  setSelectField(f.key)
                                  setSelectCondition(f.condition)
                                  setSelectValue(f.value)
                                }
                              }}
                            />

                            <XCircle
                              className="cursor-pointer ms-50"
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
                                  <DatePickerFieldForm
                                    onSave={onSaveDatePicker}
                                    onCancel={() => setShowPickerForm(false)}
                                    onClose={() => {
                                      setPopoverTargetId(null)
                                    }}
                                    setting={f}
                                  />
                                ) : (
                                  <StringFieldForm
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
                        className="ms-50 text-decoration-underline"
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
                        <Filter size={14} />
                        <span className="align-middle ms-25">
                          {t('Add filter')}
                        </span>
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
                    {t('Settings')}
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <InputGroup className="mb-2">
                        <InputGroupText>
                          <Search size={14} />
                        </InputGroupText>
                        <Input
                          placeholder={t('Search...')}
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
                          {renderOptionField()}
                          {renderStringField()}
                          {renderDatePickerField()}
                        </>
                      ) : (
                        <div className="mt-1">
                          <td>
                            {t('No result found for query')}: {searchValue}
                          </td>
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
                        {t('Cancel')}
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => {
                          setFilters([...filters, ...filterTemps])
                          setShowFilters(false)
                          setFilterTemps([])
                        }}
                      >
                        {t('Apply')}
                      </Button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal
                  isOpen={showPickerForm}
                  className="modal-dialog-centered modal-xl"
                  scrollable
                >
                  <ModalHeader toggle={() => setShowPickerForm(false)}>
                    {t(columnSelect?.title || 'Date Picker')}
                  </ModalHeader>
                  <ModalBody>
                    <DatePickerFieldForm
                      onSave={onSaveDatePicker}
                      onCancel={() => setShowPickerForm(false)}
                    />
                  </ModalBody>
                </Modal>

                <Modal
                  isOpen={showOptionForm}
                  className="modal-dialog-centered"
                >
                  <ModalHeader toggle={() => setShowOptionForm(false)}>
                    {t('Select a client')}
                  </ModalHeader>
                  <ModalBody>
                    <OptionFieldForm
                      isEdit
                      value={selectValue}
                      onSave={onSaveOptions}
                      onClose={() => setShowOptionForm(false)}
                      fetchOption={columnSelect?.fetchOption}
                      filterKey={columnSelect?.optionField}
                      mapOptions={columnSelect?.mapOptions}
                    />
                  </ModalBody>
                </Modal>
              </>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    </>
  )
}

export default ToolbarFilterProvider
