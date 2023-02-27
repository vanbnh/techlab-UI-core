import React, {useEffect, useState} from 'react'
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
import {renderTotalItems} from './func'
import {toast} from 'react-hot-toast'
import {Settings} from 'react-feather'
import {Link} from 'react-router-dom'
import {formatDate} from '../../../utility/Utils'
import LoadingGridTable from './components/loading/Loading'
import ModalSettingGridTable from './components/modal/Setting'
import ToolbarFilterProvider from './components/filters'
import ReactPaginate from 'react-paginate'
import {useTranslation} from 'react-i18next'
import useGridTable from './hook/useGridTable'
import {useFetchData, usePrefetchData} from './hook/useQuery'
import useLocalStorageGridTable from './hook/useLocalStorage'
import useExportGridTable from './hook/useExport'
import usePermissionGridTable from './hook/usePermission'

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
  initialFilters = [],
  loading = false,
  isPage = true,
}) => {
  const isGrouping = columns.filter(col => col.isGroup).length > 0

  // *** HOOKS ***
  const {t} = useTranslation()

  // *** REDUCER ***
  const {
    dataRows,
    columnStates,
    totalPage,
    currentPage,
    perPage,
    pageSizes,
    rowSelects,
    columnOrders,
    columnWidths,
    filters,
    filterColumns,
    columnResizingMode,
    fixedColumns,
    permissions,
    hiddenColumnNames,
    columnCustomizer,

    setDataRows,
    setTotalPage,
    setCurrentPage,
    setPerPage,
    setRowSelects,
    setColumnOrders,
    setColumnWidths,
    setFilters,
    setHiddenColumnNames,
    setConfig,
  } = useGridTable()

  // *** ================================ START LOCAL STORAGE ==================================== ***
  useLocalStorageGridTable(columns, {
    fixedCols,
    settings,
    initialFilters,
  })
  // *** ================================ END LOCAL STORAGE ==================================== ***

  // *** REACT QUERY ***
  const {data: dataQuery, isLoading} = useFetchData({
    query,
    perPage,
    page: currentPage,
    filters,
    initialFilters,
    columns,
  })
  // *** Prefetch
  usePrefetchData({
    dataQuery,
    query,
    perPage,
    page: currentPage,
    filters,
    columns,
  })

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

  // *** ================================ EXPORTING ==================================== ***
  const {
    exporterRef,
    onSave,
    startExport,
    ExportButtonComponent,
    exportMessages = {},
  } = useExportGridTable({
    isCustomExport: onExport,
    onExport: () => {
      if (rowSelects.length > 0) {
        const dataExport = dataRows.filter((r, idx) => rowSelects.includes(idx))
        onExport(dataExport)
      } else {
        toast.error(t('You must select at least one row to export'))
      }
    },
    entries,
  })

  // *** PERMISSION ***
  const {canSummary, canPagination, canSelect, canReOrdering, canExport} =
    usePermissionGridTable(permissions)

  // *** COMPONENTS ***
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
      onPageChange={p => setCurrentPage(p.selected)}
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  )

  // *** MODALS ***
  const [modalOpen, setModalOpen] = useState({
    filter: false,
    setting: false,
  })

  const toggleModalSetting = () =>
    setModalOpen({...modalOpen, setting: !modalOpen.setting})

  const COLUMN_TRANSLATE = columnStates.map(col => ({
    ...col,
    title: t(col.title),
  }))

  return (
    <>
      {isPage && (
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
      )}

      <Card className="grid-table shadow-0">
        <Grid rows={isLoading ? [] : dataRows} columns={COLUMN_TRANSLATE}>
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
          {canSummary && (
            <SummaryState totalItems={renderTotalItems(COLUMN_TRANSLATE)} />
          )}

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
              messages={exportMessages}
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
            onSave={onSave}
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
          permissions,
          columnCustomizer,
          columnResizingMode,
          pageSizes,
        }}
        saveConfig={setConfig}
      />
    </>
  )
}

export default GridTableComponent
