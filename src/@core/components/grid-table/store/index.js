import {createSlice} from '@reduxjs/toolkit'

function createInitialState() {
  return {
    dataRows: [],
    columnStates: [],
    totalPage: 1,
    currentPage: 0,
    perPage: 10,
    pageSizes: [10, 20, 50, 100],
    rowSelects: [],
    columnOrders: [],
    columnWidths: [],
    filters: [],
    filterColumns: [],
    columnResizingMode: 'widget',
    fixedColumns: {
      left: [],
      right: [],
    },
    permissions: [],
    hiddenColumnNames: [],
    columnCustomizer: ['reordering', 'visibility'],
  }
}

function createReducer() {
  return {
    setDataRowAction(state, action) {
      state.dataRows = action.payload
    },
    setColumnStateAction(state, action) {
      state.columnStates = action.payload
    },
    setTotalPageAction(state, action) {
      state.totalPage = action.payload
    },
    setCurrentPageAction(state, action) {
      state.currentPage = action.payload
    },
    setPerPageAction(state, action) {
      state.perPage = action.payload
    },
    setPageSizesAction(state, action) {
      state.pageSizes = action.payload
    },
    setRowSelectsAction(state, action) {
      state.rowSelects = action.payload
    },
    setColumnOrdersAction(state, action) {
      state.columnOrders = action.payload
    },
    setColumnWidthsAction(state, action) {
      state.columnWidths = action.payload
    },
    setFiltersAction(state, action) {
      state.filters = action.payload
    },
    setFilterColumnsAction(state, action) {
      state.filterColumns = action.payload
    },
    setColumnResizingModeAction(state, action) {
      state.columnResizingMode = action.payload
    },
    setFixedColumnsAction(state, action) {
      state.fixedColumns = action.payload
    },
    setPermissionsAction(state, action) {
      state.permissions = action.payload
    },
    setHiddenColumnNamesAction(state, action) {
      state.hiddenColumnNames = action.payload
    },
    setColumnCustomizerAction(state, action) {
      state.columnCustomizer = action.payload
    },
    setConfigAction(state, action) {
      const {
        permissions,
        columnCustomizer,
        columnResizingMode,
        columns,
        fixedColumns,
        pageSizes,
        hiddenColumnNames,
        filterColumns,
      } = action.payload
      state.permissions = permissions
      state.columnCustomizer = columnCustomizer
      state.columnResizingMode = columnResizingMode
      state.columnStates = columns
      state.fixedColumns = fixedColumns
      state.pageSizes = pageSizes
      state.hiddenColumnNames = hiddenColumnNames
      state.filterColumns = filterColumns
    },
  }
}

const name = 'grid-tables'
const initialState = createInitialState()
const reducers = createReducer()
const slice = createSlice({name, initialState, reducers})

export const dataTableActions = {...slice.actions}

export default slice.reducer
