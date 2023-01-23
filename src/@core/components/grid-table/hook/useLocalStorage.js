import {useEffect} from 'react'
import useGridTable from './useGridTable'

import {
  DEFAULT_WIDTH_MULTIPLICATION,
  LOCAL_COLUMN_TABLES,
  LOCAL_FILTERS,
  LOCAL_FILTER_SETTINGS,
  LOCAL_FIXED_COLUMNS,
  LOCAL_HIDDEN_COLUMNS,
  LOCAL_PARAM_PAGE_SIZES,
  LOCAL_PARAM_PER_PAGE,
  LOCAL_PERMISSIONS,
  LOCAL_REORDER_COLUMNS,
  LOCAL_RESIZE_COLUMNS,
} from '../config'
import {getDataLocalStorage, saveDataLocalStorage} from '../func'
import {useLocation} from 'react-router-dom'

export default function useLocalStorageGridTable(columns, configs) {
  const {pathname} = useLocation()
  const {
    perPage,
    pageSizes,
    columnOrders,
    columnWidths,
    filters,
    filterColumns,
    fixedColumns,
    permissions,
    hiddenColumnNames,
    setColumnStates,
    setPerPage,
    setPageSizes,
    setColumnOrders,
    setColumnWidths,
    setFilters,
    setFilterColumns,
    setFixedColumns,
    setPermissions,
    setHiddenColumnNames,
  } = useGridTable()

  const {fixedCols, settings} = configs

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
    const init = getDataLocalStorage(LOCAL_FIXED_COLUMNS, pathname, fixedCols)
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

  // *** HIDDEN COLUMNS ***
  useEffect(() => {
    const init = getDataLocalStorage(LOCAL_HIDDEN_COLUMNS, pathname, [])
    setHiddenColumnNames(init)
  }, [pathname])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_HIDDEN_COLUMNS, pathname, hiddenColumnNames)
  }, [hiddenColumnNames, pathname])

  // *** PERMISSION ***
  useEffect(() => {
    const init = getDataLocalStorage(LOCAL_PERMISSIONS, pathname, settings)
    setPermissions(init)
  }, [pathname, settings])
  useEffect(() => {
    saveDataLocalStorage(LOCAL_PERMISSIONS, pathname, permissions)
  }, [permissions, pathname])
}
