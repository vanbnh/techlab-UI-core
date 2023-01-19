import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardFooter,
  Input,
} from 'reactstrap'
import {
  IntegratedSelection,
  IntegratedSummary,
  RowDetailState,
  SelectionState,
  SummaryState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  Toolbar,
  TableSelection,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  TableFixedColumns,
  ExportPanel,
  GroupingPanel,
  TableGroupRow,
  TableSummaryRow,
  TableRowDetail,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-bootstrap4'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import {GridExporter} from '@devexpress/dx-react-grid-export'
import LinkNavigateProvider from './format/LinkNavigate'
import NumberProvider from './format/Number'
import {
  getDataLocalStorage,
  renderTotalItems,
  saveDataLocalStorage,
} from './func'
import {toast} from 'react-hot-toast'
import saveAs from 'file-saver'
import {ArrowDownCircle, ArrowUpCircle, Settings} from 'react-feather'
import {
  DEFAULT_WIDTH_MULTIPLICATION,
  LOCAL_COLUMN_TABLES,
  LOCAL_FILTERS,
  LOCAL_FILTER_SETTINGS,
  LOCAL_FIXED_COLUMNS,
  LOCAL_PARAM_PAGE_SIZES,
  LOCAL_PARAM_PER_PAGE,
  LOCAL_REORDER_COLUMNS,
  LOCAL_RESIZE_COLUMNS,
} from './config'
import {Link, useLocation} from 'react-router-dom'
import {useQuery, useQueryClient} from 'react-query'
import axios from 'axios'
import {formatDate} from '../../../utility/Utils'
import LoadingGridTable from './components/loading/Loading'
import ModalSettingGridTable from './components/modal/Setting'
import ToolbarFilterProvider from './components/filters'
import ReactPaginate from 'react-paginate'
import {useTranslation} from 'react-i18next'

const GridTableComponent = ({
  providerComponents = [],
  TableRowDetailComponent,
  columns = [],
  columnExports = [],
  onExport,
  query = {
    key: '',
    url: '',
    params: {},
  },
  formatData,
  entries = 'data',
  settings = [],
  fixedCols = {
    left: [],
    right: [],
  },
  loading = false,
}) => {
  const groupCols = columns.filter(col => col.isGroup)
  const isGrouping = groupCols.length > 0

  // *** HOOKS ***
  const {pathname} = useLocation()
  const {t} = useTranslation()

  // *** STATE CORE ***
  const [dataRows, setDataRows] = useState([])
  const [columnStates, setColumnStates] = useState([])
  const [totalPage, setTotalPage] = useState(1)

  // *** CONTROLS ***
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [pageSizes, setPageSizes] = useState([10, 20, 50, 100])

  const [rowSelects, setRowSelects] = useState([])
  const [columnOrders, setColumnOrders] = useState([])
  const [columnWidths, setColumnWidths] = useState([])
  const [filters, setFilters] = useState([])
  const [filterColumns, setFilterColumns] = useState([])
  const [columnResizingMode, setColumnResizingMode] = useState('widget')
  const [fixedColumns, setFixedColumns] = useState(fixedCols)
  const [permissionState, setPermissionState] = useState(settings)
  const [hiddenColumnNames, setHiddenColumnNames] = useState([])
  const [columnCustomizer, setColumnCustomizer] = useState([
    'reordering',
    'visibility',
  ])
  const exporterRef = useRef(null)
  const startExport = useCallback(
    options => {
      exporterRef.current.exportGrid(options)
    },
    [exporterRef],
  )

  // *** REACT QUERY ***
  const queryClient = useQueryClient()
  const handleCallApi = async page => {
    const params = {
      ...query.params,
      page: page + 1,
      limit: perPage,
    }
    const data = filters.map(f => ({
      key: f.key,
      value: f.value,
      expr: f.condition,
    }))

    return await axios.post(query.url, data, {params}).then(res => res.data)
  }

  const {data: dataQuery, isLoading} = useQuery(
    [
      query.key,
      {
        page: currentPage,
        limit: perPage,
        f: filters.map(f => ({[f.key]: f.value})),
      },
      query.params,
    ],
    () => handleCallApi(currentPage),
  )
  // *** Prefetch
  useEffect(() => {
    if (dataQuery && dataQuery.metadata && dataQuery.metadata.has_next) {
      const maxPostPage = Number(
        Math.ceil(dataQuery?.metadata?.total / perPage),
      )
      if (currentPage < maxPostPage) {
        const nextPage = currentPage + 1
        queryClient.prefetchQuery(
          [
            query.key,
            {
              page: nextPage,
              limit: perPage,
              f: filters.map(f => ({[f.key]: f.value})),
            },
            query.params,
          ],
          () => handleCallApi(nextPage),
        )
      }
    }
  }, [dataQuery])

  // *** SET DATA ROWS ***
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
      const totalPage = dataQuery?.metadata?.total_page || 0
      setDataRows(rows)
      setTotalPage(totalPage)
    }
  }, [dataQuery])

  // *** ================================ START LOCAL STORAGE ==================================== ***
  // *** CORE COLUMN *** //
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_COLUMN_TABLES,
      pathname,
      columns.map(column => ({
        ...column,
        width:
          column.width || column.title.length * DEFAULT_WIDTH_MULTIPLICATION,
      })),
    )

    const mergeColumns = columns.map(col => {
      const find = init.find(i => i.name === col.name)
      const d = {...col, ...find}
      d.width = d.width || d.title.length * DEFAULT_WIDTH_MULTIPLICATION
      return d
    })
    setColumnStates(mergeColumns)
  }, [columns, pathname])
  useEffect(() => {
    const dataSaveLocalStorage = columns.map(col => ({
      title: col.title,
      width: col.width,
      name: col.name,
    }))
    saveDataLocalStorage(LOCAL_COLUMN_TABLES, pathname, dataSaveLocalStorage)
  }, [columns, pathname])

  // *** FIXED COLUMN *** //
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_FIXED_COLUMNS,
      pathname,
      fixedColumns,
    )
    setFixedColumns(init)
  }, [pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_FIXED_COLUMNS, pathname, fixedColumns)
  }, [fixedColumns, pathname])

  // *** COLUMN WIDTHS ***
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_RESIZE_COLUMNS,
      pathname,
      columns.map(col => ({
        columnName: col.name,
        width: col.width || col.title.length * DEFAULT_WIDTH_MULTIPLICATION,
      })),
    )
    setColumnWidths(init)
  }, [columns, pathname])

  useEffect(() => {
    saveDataLocalStorage(LOCAL_RESIZE_COLUMNS, pathname, columnWidths)
  }, [columnWidths, pathname])

  // *** COLUMN REORDER ***
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_REORDER_COLUMNS,
      pathname,
      columns.map(col => col.name),
    )
    setColumnOrders(init)
  }, [columns, pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_REORDER_COLUMNS, pathname, columnOrders)
  }, [columnOrders, pathname])

  // *** PER PAGE ***
  useEffect(() => {
    const init = getDataLocalStorage(LOCAL_PARAM_PER_PAGE, pathname, 10)
    if (init !== perPage) {
      setPerPage(init)
    }
  }, [pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_PARAM_PER_PAGE, pathname, perPage)
  }, [perPage, pathname])

  // *** PAGE SIZES ***
  useEffect(() => {
    if (!pageSizes.includes(perPage)) {
      const oldPageSizes = getDataLocalStorage(
        LOCAL_PARAM_PAGE_SIZES,
        pathname,
        [],
      )
      const newPerPageIdx = oldPageSizes.findIndex(item => item === perPage)

      if (newPerPageIdx !== -1) {
        setPerPage(pageSizes[newPerPageIdx])
      } else {
        setPerPage(pageSizes[0])
      }
    }
  }, [pageSizes])
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_PARAM_PAGE_SIZES,
      pathname,
      pageSizes,
    )
    setPageSizes(init)
  }, [pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_PARAM_PAGE_SIZES, pathname, pageSizes)
  }, [pageSizes, pathname])

  // *** FILTERS ***
  useEffect(() => {
    const init = getDataLocalStorage(LOCAL_FILTERS, pathname, [])
    setFilters(init)
  }, [pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_FILTERS, pathname, filters)
  }, [filters, pathname])

  // *** FILTER COLUMNS ***
  useEffect(() => {
    const init = getDataLocalStorage(
      LOCAL_FILTER_SETTINGS,
      pathname,
      columns.map(col => col.name),
    )
    setFilterColumns(init)
  }, [pathname, columns])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_FILTER_SETTINGS, pathname, filterColumns)
  }, [filterColumns, pathname])
  // *** ================================ END LOCAL STORAGE ==================================== ***

  // *** PERMISSION ***
  const canSummary = permissionState.includes('summary')
  const canPagination = permissionState.includes('pagination')
  const canSelect = permissionState.includes('select')
  const canReOrdering = permissionState.includes('reordering')
  const canExport = permissionState.includes('export')
  const canUpload = permissionState.includes('upload')

  // *** COMPONENTS ***
  const ExportButtonComponent = ({onToggle, buttonRef, ...restProps}) => (
    <div className="d-flex">
      <div className="ms-2">
        <button
          ref={buttonRef}
          className="btn btn-warning btn-sm"
          onClick={() => {
            if (onExport) {
              if (rowSelects.length > 0) {
                const dataExport = dataRows.filter((r, idx) =>
                  rowSelects.includes(idx),
                )
                onExport(dataExport)
              } else {
                toast.error('You must select at least one row to export')
              }
            } else {
              onToggle()
            }
          }}
          {...restProps}
        >
          <ArrowDownCircle size={16} />
          <span className="align-middle ms-25">{t('Export')}</span>
        </button>
      </div>
      {canUpload && (
        <div className="ms-50">
          <Button
            color="info"
            onClick={() => {
              alert('upload')
            }}
            target="_blank"
            size="sm"
          >
            <ArrowUpCircle size={16} />
            <span className="align-middle ms-25">{t('Upload')}</span>
          </Button>
        </div>
      )}
    </div>
  )

  // *** CALLBACKS ***
  const onExportExcel = useCallback(
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

  const onSaveConfig = useCallback(d => {
    const {
      permissions,
      columnCustomizer,
      columnResizingMode,
      columns,
      fixedColumns,
      pageSizes,
      hiddenColumnNames,
      filterColumns,
    } = d
    setPermissionState(permissions)
    setColumnCustomizer(columnCustomizer)
    setColumnResizingMode(columnResizingMode)
    setColumnStates(columns)
    setFixedColumns(fixedColumns)
    setPageSizes(pageSizes)
    setHiddenColumnNames(hiddenColumnNames)
    setFilterColumns(filterColumns)
  }, [])

  // *** MODALS ***
  const [modalOpen, setModalOpen] = useState({
    filter: false,
    setting: false,
  })

  const toggleModalSetting = () =>
    setModalOpen({...modalOpen, setting: !modalOpen.setting})

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const CustomPagination = () => (
    <ReactPaginate
      nextLabel=""
      breakLabel="..."
      previousLabel=""
      pageRangeDisplayed={2}
      forcePage={currentPage}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      pageCount={totalPage}
      onPageChange={handlePagination}
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  )

  const COLUMN_TRANSLATE = columnStates.map(col => ({
    ...col,
    title: t(col.title),
  }))

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <Breadcrumb className="breadcrumb-dashes">
            <BreadcrumbItem>
              <Link to="/">{t('Home')}</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>
              <span> {t(entries)} </span>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="d-flex align-items-center justify-content-end me-1 mb-1">
          <Button.Ripple
            className="btn-icon"
            color="primary"
            onClick={toggleModalSetting}
          >
            <Settings size={16} />
          </Button.Ripple>
        </div>
      </div>

      <Card className="grid-table">
        <Grid rows={dataRows} columns={COLUMN_TRANSLATE}>
          <DragDropProvider />
          <LinkNavigateProvider
            for={COLUMN_TRANSLATE.filter(col => col.isLink).map(
              col => col.name,
            )}
          />
          <NumberProvider
            for={COLUMN_TRANSLATE.filter(col => col.isNumber).map(
              col => col.name,
            )}
          />
          {providerComponents.length > 0 &&
            providerComponents.map((Provider, idx) => <Provider key={idx} />)}
          <SelectionState
            selection={rowSelects}
            onSelectionChange={r => setRowSelects(r)}
          />
          {TableRowDetailComponent && <RowDetailState />}
          {/* <PagingState
            currentPage={currentPage - 1}
            onCurrentPageChange={val => {
              setCurrentPage(val + 1)
            }}
          /> */}
          {canSummary && (
            <SummaryState totalItems={renderTotalItems(COLUMN_TRANSLATE)} />
          )}

          {/* {canPagination && <CustomPaging totalCount={total} />} */}

          {/* INTEGRATED */}
          {canSummary && <IntegratedSummary />}
          {canSelect && <IntegratedSelection />}
          <VirtualTable
            height={isLoading ? '40vh' : 'auto'}
            columnExtensions={COLUMN_TRANSLATE.filter(col => col.align).map(
              col => ({columnName: col.name, align: col.align}),
            )}
          />

          {canReOrdering && (
            <TableColumnReordering
              order={columnOrders}
              onOrderChange={cols => setColumnOrders(cols)}
            />
          )}

          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
            resizingMode={columnResizingMode}
          />

          <TableHeaderRow showGroupingControls={isGrouping} />
          {/* <PagingPanel /> */}
          {TableRowDetailComponent && (
            <TableRowDetail contentComponent={TableRowDetailComponent} />
          )}
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={cols => setHiddenColumnNames(cols)}
          />

          {canSelect && (
            <TableSelection showSelectAll selectByRowClick highlightRow />
          )}
          {isGrouping && <TableGroupRow />}
          {canSummary && dataRows.length > 0 && !isLoading && (
            <TableSummaryRow />
          )}

          {/* PANEL */}
          <Toolbar />

          <ToolbarFilterProvider
            columns={COLUMN_TRANSLATE}
            filters={filters}
            setFilters={f => setFilters(f)}
            filterColumns={filterColumns}
            entries={entries}
          />

          {canExport && (
            <ExportPanel
              startExport={startExport}
              toggleButtonComponent={ExportButtonComponent}
            />
          )}
          {isGrouping && <GroupingPanel showGroupingControls />}

          <TableFixedColumns
            leftColumns={fixedColumns.left || []}
            rightColumns={fixedColumns.right || []}
          />
        </Grid>
        {canExport && (
          <GridExporter
            ref={exporterRef}
            rows={dataRows}
            columns={
              columnExports.length > 0 ? columnExports : COLUMN_TRANSLATE
            }
            selection={rowSelects}
            onSave={onExportExcel}
          />
        )}
        {(isLoading || loading) && <LoadingGridTable />}
        {canPagination && (
          <CardFooter>
            <div className="d-flex justify-content-between align-item-center ">
              <div className="mt-50">
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
              <div>{CustomPagination()}</div>
            </div>
          </CardFooter>
        )}
      </Card>
      {/* Modal setting */}
      <ModalSettingGridTable
        isOpen={modalOpen.setting}
        close={toggleModalSetting}
        entries={entries}
        config={{
          columns,
          fixedColumns,
          settings,
          hiddenColumnNames,
          filterColumns,
          columnOrders,
          permissions: permissionState,
          columnCustomizer,
          columnResizingMode,
          pageSizes,
        }}
        saveConfig={onSaveConfig}
      />
    </>
  )
}

export default GridTableComponent
