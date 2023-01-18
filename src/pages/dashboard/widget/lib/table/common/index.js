import axios from 'axios'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  CustomPaging,
  IntegratedSelection,
  PagingState,
  RowDetailState,
  // SearchState,
  SelectionState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  PagingPanel,
  // SearchPanel,
  Toolbar,
  TableSelection,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  TableFixedColumns,
  ExportPanel,
  TableRowDetail,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-bootstrap4'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import {GridExporter} from '@devexpress/dx-react-grid-export'
import {Card, CardBody, Input} from 'reactstrap'
import saveAs from 'file-saver'
import CommonCardHeader from '../../CommonCardHeader'
import CardActionTableWidgetItem from './Action'
import {
  DEFAULT_PAGESIZES,
  DEFAULT_WIDTH_MULTIPLICATION,
} from '../../../../../../@core/components/grid-table/config'
import LinkNavigateProvider from '../../../../../../@core/components/grid-table/components/format/LinkNavigate'
import Loading from '../../../../../../@core/components/grid-table/components/loading/Loading'
import ToolbarFilterProvider from '../../../../../../@core/components/grid-table/components/filters'
import {useQuery} from 'react-query'
import {formatDate} from '../../../../../../utility/Utils'
import ModalSettingColumn from '../../modal/ModalSettingColumn'
import {useTranslation} from 'react-i18next'

const CommonTableWidgetItem = ({
  configs,
  item,
  isEdit,
  onDuplicateItem,
  onRemoveItem,
  onSaveItem,
  providerComponents = [],
  TableRowDetailComponent,
  columnExports = [],
  formatData = d => d,
}) => {
  // *** HOOKS ***
  const {t} = useTranslation()

  const {columns, path, fixedColumns, entries, urls} = configs

  // *** STATE CORE TABLE ***
  const [rows, setRows] = useState([])
  const [columnStates] = useState(
    columns.map(column => ({
      ...column,
      title: t(column.title),
      width: column.width || column.title.length * DEFAULT_WIDTH_MULTIPLICATION,
    })),
  )
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => setOpenModal(!openModal)

  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(() => {
    if (item && item.params) {
      return item.params.page
    }
    return 1
  })
  const [perPage, setPerPage] = useState(() => {
    if (item && item.params) {
      return item.params.limit
    }
    return 5
  })
  const [pageSizes] = useState(DEFAULT_PAGESIZES)
  useEffect(() => {
    onSaveItem({
      ...item,
      params: {
        page: currentPage,
        limit: perPage,
      },
    })
  }, [perPage, currentPage])

  const [rowSelected, setRowSelected] = useState([])
  const [columnWidths, setColumnWidths] = useState(() => {
    let widths = columnStates.map(col => ({
      columnName: col.name,
      width: col.width,
    }))
    if (item && item.columnWidths) {
      widths = item.columnWidths
    }
    return widths
  })
  useEffect(() => {
    onSaveItem({
      ...item,
      columnWidths,
    })
  }, [columnWidths])

  const [columnOrder, setColumnOrder] = useState(() => {
    let orders = columnStates.map(col => col.name)
    if (item && item.columnOrder) {
      orders = item.columnOrder
    }
    return orders
  })
  useEffect(() => {
    onSaveItem({
      ...item,
      columnOrder,
    })
  }, [columnOrder])

  const [hiddenColumnNames, setHiddenColumnNames] = useState(() => {
    let cols = []
    if (item && item.hiddenColumnNames) {
      cols = item.hiddenColumnNames
    }
    return cols
  })
  useEffect(() => {
    onSaveItem({
      ...item,
      hiddenColumnNames,
    })
  }, [hiddenColumnNames])

  const [filters, setFilters] = useState(() => {
    let f = []
    if (item && item.filters) {
      f = item.filters
    }
    return f
  })
  useEffect(() => {
    onSaveItem({
      ...item,
      filters,
    })
  }, [filters])

  const exporterRef = useRef(null)
  const startExport = useCallback(
    options => {
      exporterRef.current.exportGrid(options)
    },
    [exporterRef],
  )

  // *** REACT QUERY ***
  const {data: dataQuery, isLoading} = useQuery(
    [
      'CARD_WIDGET',
      entries,
      {
        page: currentPage,
        limit: perPage,
        f: filters.map(f => ({[f.key]: f.value})),
      },
    ],
    async () => {
      const d = filters.map(f => ({
        key: f.key,
        value: f.value,
        expr: f.condition,
      }))
      return await axios
        .post(`${urls.list}`, d, {
          params: {
            page: currentPage,
            limit: perPage,
          },
        })
        .then(res => res.data)
    },
  )

  useEffect(() => {
    if (dataQuery?.data) {
      let rows = dataQuery.data.map(d => ({
        ...d,
        updated_at: d.updated_at && formatDate(d.updated_at),
        created_at: d.created_at && formatDate(d.created_at),
      }))
      if (formatData) {
        rows = formatData(rows)
      }
      const total = dataQuery?.metadata?.total || 0
      setRows(rows)
      setTotal(total)
    }
  }, [dataQuery])

  // *** CALLBACKS ***
  const onSaveExport = useCallback(
    workbook => {
      workbook.xlsx.writeBuffer().then(buffer => {
        saveAs(
          new Blob([buffer], {type: 'application/octet-stream'}),
          `${entries}.xlsx`,
        )
      })
    },
    [entries],
  )
  const onSaveColumns = cols => {
    setColumnOrder(cols.map(col => col.name))
    setHiddenColumnNames(cols.filter(col => !col.checked).map(col => col.name))
  }

  const ExportButtonComponent = ({onToggle, buttonRef, ...restProps}) => (
    <div className="d-flex">
      <div>
        <button
          ref={buttonRef}
          className="btn btn-warning btn-sm"
          onClick={onToggle}
          {...restProps}
        >
          {t('Export')}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Card
        className={`w-100 h-100 overflow-hidden ${
          isEdit ? 'cursor-move' : ''
        } grid-table`}
      >
        <CommonCardHeader
          item={item}
          isEdit={isEdit}
          path={path}
          pageSizeComp={
            <div className="d-flex align-items-center me-1">
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={perPage}
                onChange={e => setPerPage(+e.target.value)}
                style={{width: '5rem'}}
              >
                {pageSizes.map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Input>
            </div>
          }
          isTable
        >
          <CardActionTableWidgetItem
            item={item}
            onDuplicateItem={onDuplicateItem}
            onRemoveItem={onRemoveItem}
            pathViewAll={path}
            onOpenModalSettingColumn={toggleModal}
          />
        </CommonCardHeader>
        <CardBody className="overflow-auto p-0">
          <Grid rows={rows} columns={columnStates}>
            <DragDropProvider />
            <LinkNavigateProvider
              for={columnStates.filter(col => col.isLink).map(col => col.name)}
            />
            {providerComponents.length > 0 &&
              providerComponents.map((Provider, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Provider key={idx} />
              ))}

            <SelectionState
              selection={rowSelected}
              onSelectionChange={rows => setRowSelected(rows)}
            />

            {TableRowDetailComponent && <RowDetailState />}
            <PagingState
              currentPage={currentPage - 1}
              onCurrentPageChange={val => {
                setRowSelected([])
                setCurrentPage(val + 1)
              }}
              pageSize={perPage}
              onPageSizeChange={val => setPerPage(val)}
            />
            <CustomPaging totalCount={total} />

            {/* INTEGRATED */}
            <IntegratedSelection />

            {/* TABLE */}
            <VirtualTable
              height="auto"
              columnExtensions={columns
                .filter(col => col.align)
                .map(col => ({columnName: col.name, align: col.align}))}
            />

            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
            />
            <TableColumnReordering
              order={columnOrder}
              onOrderChange={setColumnOrder}
            />
            <TableHeaderRow />
            {TableRowDetailComponent && (
              <TableRowDetail contentComponent={TableRowDetailComponent} />
            )}
            <TableColumnVisibility
              hiddenColumnNames={hiddenColumnNames}
              onHiddenColumnNamesChange={cols => setHiddenColumnNames(cols)}
            />

            <TableSelection showSelectAll selectByRowClick highlightRow />

            {/* PANEL */}
            <Toolbar />
            <ToolbarFilterProvider
              columns={columnStates}
              filters={filters}
              setFilters={f => setFilters(f)}
              filterColumns={columnStates.map(col => col.name)}
            />

            <PagingPanel />
            {/* <SearchPanel /> */}
            <ExportPanel
              startExport={startExport}
              toggleButtonComponent={ExportButtonComponent}
            />

            <TableFixedColumns
              leftColumns={fixedColumns.left || []}
              rightColumns={fixedColumns.right || []}
            />
          </Grid>
          <GridExporter
            ref={exporterRef}
            rows={rows}
            columns={columnExports.length > 0 ? columnExports : columnStates}
            selection={rowSelected}
            onSave={onSaveExport}
          />
          {isLoading && <Loading />}
        </CardBody>
      </Card>
      <ModalSettingColumn
        isOpen={openModal}
        close={toggleModal}
        columns={columnStates}
        columnOrders={columnOrder}
        columnHiddens={hiddenColumnNames}
        onSave={onSaveColumns}
        title={entries}
      />
    </>
  )
}

export default CommonTableWidgetItem
