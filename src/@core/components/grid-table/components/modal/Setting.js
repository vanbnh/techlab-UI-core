import React, {useEffect, useState} from 'react'
import {Plus, Save, Trash, X} from 'react-feather'
import {useTranslation} from 'react-i18next'
import {ReactSortable} from 'react-sortablejs'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import CheckField from '../../../form-field/CheckField'
import SelectField from '../../../form-field/SelectField'
import ModalComponent from '../../../modal'

const serializerFixedColumns = (fixedColumns, columns) => {
  const d = {
    left: [],
    right: [],
  }
  const colNames = columns.map(c => c.name)
  const middleNumber = Math.round(columns.length / 2)
  fixedColumns.forEach(c => {
    const index = colNames.indexOf(c)
    if (index + 1 < middleNumber) {
      d.left.push(c)
    } else {
      d.right.push(c)
    }
  })
  return d
}

const SettingForm = ({values, setValues, options}) => {
  const {t} = useTranslation()
  const OPTIONS = options.map(op => ({...op, label: t(op.label)}))
  const VALUES = values.map(v => ({...v, label: t(v.label)}))
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle>{t('Permissions')}</CardTitle>
      </CardHeader>

      <CardBody>
        <SelectField
          placeholder={t('Select permissions...')}
          isMulti
          value={VALUES}
          options={OPTIONS}
          isClearable={false}
          onChange={ops => setValues(ops)}
        />
      </CardBody>
    </Card>
  )
}

const PagingForm = ({pageSizeValues, setPageSizeValues}) => {
  const {t} = useTranslation()
  const [pageIdx, setEditNum] = useState(-1)
  const [numVal, setNumVal] = useState(-1)
  const [invalidText, setInvalidText] = useState('')

  const onSetValue = idx => {
    setNumVal(pageSizeValues[idx])
    setEditNum(idx)
  }

  const onReset = () => {
    setNumVal(-1)
    setEditNum(-1)
    setInvalidText('')
  }

  const onAddNew = () => {
    setEditNum(pageSizeValues.length)
    setNumVal(pageSizeValues[pageSizeValues.length - 1] * 2)
  }

  const onSave = () => {
    const newValues = [...pageSizeValues]
    if (pageIdx === pageSizeValues.length) {
      newValues.push(numVal)
    } else {
      newValues[pageIdx] = numVal
    }
    setPageSizeValues(newValues.map(v => +v))
    onReset()
  }

  const onDelete = () => {
    const newValues = [...pageSizeValues]
    newValues.splice(pageIdx, 1)
    setPageSizeValues(newValues)
    onReset()
  }

  // *** VALIDATION ***
  useEffect(() => {
    let message = ''
    if (pageIdx === 0 && pageSizeValues.length > 1) {
      const max = pageSizeValues[1]
      if (numVal >= max) {
        message = `${t('The value must be less than')} ${max}`
      }
    }
    if (pageIdx > 0 && pageIdx < pageSizeValues.length - 1) {
      const min = pageSizeValues[pageIdx - 1]
      const max = pageSizeValues[pageIdx + 1]
      if (numVal <= min) {
        message = `${t('The value must be greater than')} ${min}`
      } else if (numVal >= max) {
        message = `${t('The value must be less than')} ${max}`
      }
    }
    if (pageIdx === pageSizeValues.length) {
      const min = pageSizeValues[pageSizeValues.length - 1]
      if (numVal <= min) {
        message = `${t('The value must be greater than')} ${min}`
      }
    }

    setInvalidText(message)
  }, [numVal, pageIdx, pageSizeValues])

  return (
    <Card stretch>
      <CardHeader className="pb-1">
        <CardTitle>{t('Pagings')}</CardTitle>
      </CardHeader>

      <CardBody>
        <div className="d-flex overflow-auto">
          {pageSizeValues.map((v, i) => (
            <Button
              key={v}
              outline={pageIdx !== i}
              className="me-1"
              color="primary"
              onClick={() => onSetValue(i)}
              size="sm"
            >
              {v}
            </Button>
          ))}
          <div>
            <Button.Ripple
              className="btn-icon"
              color="primary"
              onClick={onAddNew}
            >
              <Plus size={16} />
            </Button.Ripple>
          </div>
        </div>

        {pageIdx > -1 && (
          <div className="row mt-1">
            <div className="col-8 d-flex">
              <div>
                <Input
                  type="number"
                  min={0}
                  autoComplete="custom-page-size-number"
                  value={numVal}
                  onChange={e => setNumVal(e.target.value)}
                  // required
                />
              </div>

              <div className="d-flex ms-1 mt-25">
                <div>
                  <Button.Ripple
                    color="flat-secondary"
                    className="btn-icon"
                    size="sm"
                    onClick={onReset}
                  >
                    <X size={16} />
                  </Button.Ripple>
                </div>
                <div>
                  <Button.Ripple
                    color="flat-danger"
                    className="btn-icon"
                    size="sm"
                    onClick={onDelete}
                  >
                    <Trash size={16} />
                  </Button.Ripple>
                </div>
                <div>
                  <Button.Ripple
                    color="flat-success"
                    className="btn-icon"
                    size="sm"
                    onClick={onSave}
                  >
                    <Save size={16} />
                  </Button.Ripple>
                </div>
              </div>
            </div>
            {invalidText && (
              <div className="text-danger mt-25 ms-25">{invalidText}</div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

const ColumnForm = ({
  customizerValue,
  setCustomizerValue,
  resizingModeValue,
  setResizingModeValue,
  columnDisplayValues,
  setColumnDisplayValues,
  fixedColumnValues,
  setFixedColumnValues,
  columnVisibilities,
  setColumnVisibilities,
  filterCols,
  setFilterCols,
}) => {
  const {t} = useTranslation()
  const onChangeCustomizer = e => {
    const {name, checked} = e.target
    setCustomizerValue(prev => {
      if (checked) {
        return [...prev, name]
      }
      return prev.filter(v => v !== name)
    })
  }

  const onChangeResizingMode = e => {
    setResizingModeValue(e.target.value)
  }

  const onChangeTitle = (e, name) =>
    setColumnDisplayValues(prev =>
      prev.map(r => (r.name === name ? {...r, title: e.target.value} : r)),
    )

  const onChangeFixed = (e, name) => {
    const {checked} = e.target
    if (checked) {
      setFixedColumnValues(prev => [...prev, name])
    } else {
      setFixedColumnValues(prev => prev.filter(v => v !== name))
    }
  }

  const onChangeVisibility = (e, name) => {
    const {checked} = e.target
    if (!checked) {
      setColumnVisibilities(prev => [...prev, name])
    } else {
      setColumnVisibilities(prev => prev.filter(v => v !== name))
    }
  }

  const onChangeFilterCol = (e, name) => {
    const {checked} = e.target
    if (checked) {
      setFilterCols(prev => [...prev, name])
    } else {
      setFilterCols(prev => prev.filter(v => v !== name))
    }
  }

  return (
    <Card stretch>
      <CardHeader className="pb-1">
        <CardTitle>{t('Columns')}</CardTitle>
      </CardHeader>

      <CardBody className="overflow-auto">
        <FormGroup>
          <Label className="fw-bolder">{t('Customizers')}:</Label>
          <div className="d-flex gap-2">
            <CheckField
              type="switch"
              id="reordering"
              label={t('Column Reordering')}
              name="reordering"
              onChange={onChangeCustomizer}
              checked={customizerValue.includes('reordering')}
            />
            <CheckField
              type="switch"
              id="visibility"
              label={t('Column Visibility')}
              name="visibility"
              onChange={onChangeCustomizer}
              checked={customizerValue.includes('visibility')}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label className="fw-bolder">{t('Resizing Mode')}:</Label>
          <div className="d-flex gap-2">
            <CheckField
              type="radio"
              id="widget"
              label={t('Widget')}
              name="widget"
              value="widget"
              onChange={onChangeResizingMode}
              checked={resizingModeValue === 'widget'}
            />
            <CheckField
              type="radio"
              id="nextColumn"
              label={t('Next Column')}
              name="nextColumn"
              value="nextColumn"
              onChange={onChangeResizingMode}
              checked={resizingModeValue === 'nextColumn'}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label>{t('Display')}:</Label>
          <table className="table table-responsive table-bordered table-sm table-hover table-setting">
            <thead>
              <tr>
                <th scope="col">{t('No')}</th>
                <th scope="col">{t('KEY')}</th>
                <th scope="col">
                  {t('TITLE')}
                  {/* <small className="text-muted ms-1">({t('can edit')})</small> */}
                </th>
                <th scope="col" style={{textAlign: 'left'}}>
                  {t('FIXED')}
                </th>
                <th scope="col" style={{textAlign: 'left'}}>
                  {t('VISIBILITIES')}
                </th>
                <th scope="col" style={{textAlign: 'left'}}>
                  {t('FILTERS')}
                </th>
              </tr>
            </thead>
            <ReactSortable
              tag="tbody"
              list={columnDisplayValues}
              setList={setColumnDisplayValues}
            >
              {columnDisplayValues.map((column, idx) => (
                <tr key={column.name} className="cursor-pointer">
                  <td className="text-muted">{idx + 1}</td>
                  <td className="text-muted">{column.name}</td>
                  <td className="input-cell">
                    <input
                      name={column.name}
                      type="text"
                      value={column.title}
                      onChange={e => onChangeTitle(e, column.name)}
                      disabled
                    />
                  </td>
                  <td className="text-left">
                    <CheckField
                      type="checkbox"
                      id={`${column.name}_fixed`}
                      onChange={e => onChangeFixed(e, column.name)}
                      checked={fixedColumnValues.includes(column.name)}
                      className="fs-5 cursor-pointer"
                    />
                  </td>
                  <td className="text-left">
                    <CheckField
                      type="checkbox"
                      id={`${column.name}_visibility`}
                      onChange={e => onChangeVisibility(e, column.name)}
                      checked={!columnVisibilities.includes(column.name)}
                      className="fs-5 cursor-pointer"
                    />
                  </td>
                  <td className="text-left">
                    <CheckField
                      type="checkbox"
                      id={`${column.name}_filter`}
                      onChange={e => onChangeFilterCol(e, column.name)}
                      checked={filterCols.includes(column.name)}
                      className="fs-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </ReactSortable>
          </table>
        </FormGroup>
      </CardBody>
    </Card>
  )
}

const FormBody = ({setDataSave, config}) => {
  const {
    columns,
    fixedColumns,
    settings,
    hiddenColumnNames,
    filterColumns,
    columnOrders,
    permissions,
    columnCustomizer,
    columnResizingMode,
    pageSizes,
  } = config

  // *** PERMISSIONS ***
  const permissionOptions = settings.map(op => ({value: op, label: op}))
  const [permissionValues, setPermissionValues] = useState(
    permissionOptions.filter(op => permissions.includes(op.value)),
  )

  // *** PAGE SIZE ***
  const [pageSizeValues, setPageSizeValues] = useState(pageSizes)

  // *** COLUMN CUSTOMIZER ***
  const [columnCustomizerValues, setColumnCustomizerValues] =
    useState(columnCustomizer)

  // *** COLUMN RESIZING MODE ***
  const [columnResizingModeValue, setColumnResizingModeValue] =
    useState(columnResizingMode)

  // *** COLUMN DISPLAY ***
  const [columnDisplayValues, setColumnDisplayValues] = useState(() =>
    columnOrders.map(col => {
      const column = columns.find(c => c.name === col)
      return column
    }),
  )

  // *** FIXED COLUMNS ***
  const [fixedColumnValues, setFixedColumnValues] = useState(() => {
    let d = []
    if (fixedColumns.left) {
      d = [...d, ...fixedColumns.left]
    }
    if (fixedColumns.right) {
      d = [...d, ...fixedColumns.right]
    }
    return d
  })
  const [newFixedColumns, setNewFixedColumns] = useState({
    left: [],
    right: [],
  })

  useEffect(() => {
    setNewFixedColumns(serializerFixedColumns(fixedColumnValues, columns))
  }, [fixedColumnValues, columns])

  // *** COLUMN VISIBILITIES ***
  const [columnVisibilities, setColumnVisibilities] =
    useState(hiddenColumnNames)

  // *** FILTER COLUMNS ***
  const [filterCols, setFilterCols] = useState(filterColumns)

  useEffect(
    () =>
      setDataSave({
        permissions: permissionValues.map(op => op.value),
        columnCustomizer: columnCustomizerValues,
        columnResizingMode: columnResizingModeValue,
        columns: columnDisplayValues,
        fixedColumns: newFixedColumns,
        pageSizes: pageSizeValues,
        hiddenColumnNames: columnVisibilities,
        filterColumns: filterCols,
      }),
    [
      permissionValues,
      columnCustomizerValues,
      columnResizingModeValue,
      columnDisplayValues,
      newFixedColumns,
      pageSizeValues,
      columnVisibilities,
      filterCols,
    ],
  )

  return (
    <Row>
      <Col sm={6} xs={12}>
        <SettingForm
          values={permissionValues}
          setValues={setPermissionValues}
          options={permissionOptions}
        />
      </Col>
      <Col sm={6} xs={12}>
        <PagingForm
          pageSizeValues={pageSizeValues}
          setPageSizeValues={setPageSizeValues}
        />
      </Col>
      <Col sm={12}>
        <ColumnForm
          customizerValue={columnCustomizerValues}
          setCustomizerValue={setColumnCustomizerValues}
          resizingModeValue={columnResizingModeValue}
          setResizingModeValue={setColumnResizingModeValue}
          columnDisplayValues={columnDisplayValues}
          setColumnDisplayValues={setColumnDisplayValues}
          fixedColumnValues={fixedColumnValues}
          setFixedColumnValues={setFixedColumnValues}
          columnVisibilities={columnVisibilities}
          setColumnVisibilities={setColumnVisibilities}
          filterCols={filterCols}
          setFilterCols={setFilterCols}
        />
      </Col>
    </Row>
  )
}

const ModalSettingGridTable = ({
  isOpen,
  close,
  entries,
  config,
  saveConfig,
}) => {
  const {t} = useTranslation()
  const [dataSave, setDataSave] = useState({})

  const onSave = () => {
    saveConfig(dataSave)
    close()
  }

  return (
    <ModalComponent
      isOpen={isOpen}
      toggle={close}
      title={t('Configs')}
      size="xl"
      scrollable
      Body={
        <FormBody close={close} setDataSave={setDataSave} config={config} />
      }
      Footer={
        <div className="d-flex justify-content-end">
          <Button
            color="secondary"
            className="border-0 me-50"
            onClick={close}
            outline
          >
            {t('Cancel')}
          </Button>
          <Button color="primary" onClick={onSave}>
            {t('Save')}
          </Button>
        </div>
      }
    />
  )
}

export default ModalSettingGridTable
