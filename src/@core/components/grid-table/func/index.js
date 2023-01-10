export const saveDataLocalStorage = (key, pathname, data) => {
  let dataSave = {}
  const columnLocal = localStorage.getItem(key)
  if (columnLocal) {
    dataSave = {...JSON.parse(columnLocal), [pathname]: data}
  } else {
    dataSave = {...dataSave, [pathname]: data}
  }
  localStorage.setItem(key, JSON.stringify(dataSave))
}

export const getDataLocalStorage = (key, pathname, initial = []) => {
  const cols = localStorage.getItem(key)
  if (cols) {
    const data = JSON.parse(cols)
    if (data && data[pathname]) {
      if (Array.isArray(data[pathname]) && data[pathname].length === 0) {
        return initial
      }

      return data[pathname]
    }
  }
  return initial
}

export const renderSelectionExport = (rows, selected) => {
  let data = []
  if (selected.length > 0 && rows.length > 0) {
    rows.forEach((r, idx) => {
      if (selected.includes(r.id)) {
        data = [...data, idx]
      }
    })
  }
  return data
}

export const renderTotalItems = columns =>
  columns.reduce((acc, cur) => {
    if (cur.summaries && cur.summaries.length > 0) {
      return [
        ...acc,
        ...cur.summaries.map(type => ({columnName: cur.name, type})),
      ]
    }
    return acc
  }, [])

export const getTotalSummaryValues = ({
  rowSelected,
  data,
  columns,
  IntegratedSummary,
}) => {
  const selectionSet = new Set(rowSelected)
  const selectedRows = data.filter((row, rowIndex) =>
    selectionSet.has(rowIndex),
  )
  return renderTotalItems(columns).map(summary => {
    const {columnName, type} = summary
    return IntegratedSummary.defaultCalculator(
      type,
      selectedRows,
      row => row[columnName],
    )
  })
}
