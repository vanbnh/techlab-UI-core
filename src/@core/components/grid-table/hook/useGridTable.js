import {useDispatch, useSelector} from 'react-redux'
import {dataTableActions} from '../store'

const useGridTable = () => {
  const dispatch = useDispatch()
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
  } = useSelector(state => state.gridTables)

  // *** ACTION ***
  const {
    setDataRowAction,
    setColumnStateAction,
    setTotalPageAction,
    setCurrentPageAction,
    setPerPageAction,
    setPageSizesAction,
    setRowSelectsAction,
    setColumnOrdersAction,
    setColumnWidthsAction,
    setFiltersAction,
    setFilterColumnsAction,
    setColumnResizingModeAction,
    setFixedColumnsAction,
    setPermissionsAction,
    setHiddenColumnNamesAction,
    setColumnCustomizerAction,
  } = dataTableActions

  // *** DISPATCH ***
  const setDataRows = d => dispatch(setDataRowAction(d))
  const setColumnStates = d => dispatch(setColumnStateAction(d))
  const setTotalPage = d => dispatch(setTotalPageAction(d))
  const setCurrentPage = d => dispatch(setCurrentPageAction(d))
  const setPerPage = d => dispatch(setPerPageAction(d))
  const setPageSizes = d => dispatch(setPageSizesAction(d))
  const setRowSelects = d => dispatch(setRowSelectsAction(d))
  const setColumnOrders = d => dispatch(setColumnOrdersAction(d))
  const setColumnWidths = d => dispatch(setColumnWidthsAction(d))
  const setFilters = d => dispatch(setFiltersAction(d))
  const setFilterColumns = d => dispatch(setFilterColumnsAction(d))
  const setColumnResizingMode = d => dispatch(setColumnResizingModeAction(d))
  const setFixedColumns = d => dispatch(setFixedColumnsAction(d))
  const setPermissions = d => dispatch(setPermissionsAction(d))
  const setHiddenColumnNames = d => dispatch(setHiddenColumnNamesAction(d))
  const setColumnCustomizer = d => dispatch(setColumnCustomizerAction(d))

  return {
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
    setColumnStates,
    setTotalPage,
    setCurrentPage,
    setPerPage,
    setPageSizes,
    setRowSelects,
    setColumnOrders,
    setColumnWidths,
    setFilters,
    setFilterColumns,
    setColumnResizingMode,
    setFixedColumns,
    setPermissions,
    setHiddenColumnNames,
    setColumnCustomizer,
  }
}
export default useGridTable
