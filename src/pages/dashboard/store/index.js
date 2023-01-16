// ** Redux Imports
import {createSlice} from '@reduxjs/toolkit'
import {uid} from 'uid'
import {saveItemLS} from './function'
import initialState from './initialState'

export const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    handleChangeEditAction: (state, action) => {
      state.isEdit = action.payload
    },
    handleChangeLayoutAction: (state, action) => {
      const layouts = action.payload
      state.items = state.items.map(item => {
        const layout = layouts.find(l => l.i === item.id)
        if (layout) {
          const {w, h, x, y} = layout
          item.dataGrid = {w, h, x, y}
        }
        return item
      })
    },
    handleSaveItemLS: (state, action) => {
      saveItemLS({
        // layouts: state.layouts,
        items: state.items,
      })
    },
    handleChangeItemDetailAction: (state, action) => {
      state.itemDetail = action.payload
    },
    handleAddItemAction: (state, action) => {
      const item = action.payload
      const newItem = {
        ...item,
        id: uid(),
      }

      if (item.type === 1) {
        newItem.title = `Title ${uid(4)}`
        newItem.content = ''
      }

      // if (item.type === 1) {
      //   newItem.data = item.data.map(it => {
      //     return {
      //       ...it,
      //       isSelected: true,
      //     }
      //   })
      // }

      // *** SET DATA GRID ***
      const layouts = state.items.map(it => it.dataGrid)
      let rowCount = 0
      if (layouts.length > 0) {
        rowCount =
          Math.round(
            Math.max(...layouts.map(layout => layout.y)) / state.height,
          ) + 1
      }

      const rowData = Array.from({length: rowCount}, (_, i) => i + 1).reduce(
        (acc, cur) => {
          const columns = layouts.filter(
            layout => layout.y === (cur - 1) * state.height,
          )
          if (columns.length > 0) {
            acc[cur] = columns.reduce((accCol, CurCol) => accCol + CurCol.w, 0)
          } else {
            acc[cur] = 0
          }
          return acc
        },
        {},
      )

      const positions = Object.entries(rowData).filter(
        row => 12 - row[1] > item.col.lg - 1,
      )

      if (positions.length > 0) {
        positions.forEach(position => {
          const columnData = state.items.filter(
            d => d.dataGrid.y === (Number(position[0]) - 1) * state.height,
          )

          let listPosition = columnData.map(d => [d.dataGrid.x, d.dataGrid.w])
          listPosition = listPosition.sort((a, b) => a[0] - b[0])

          const xPosition = position[1]
          let inline = true

          listPosition.forEach(p => {
            if (p[0] === xPosition || 12 - p[0] - p[1] < item.col.lg) {
              inline = false
            }
          })
          if (inline) {
            newItem.dataGrid = {
              w: item.col.lg,
              h: state.height,
              x: xPosition,
              y: (Number(position[0]) - 1) * state.height,
            }
          }
        })
      }
      if (!newItem.dataGrid) {
        newItem.dataGrid = {
          w: newItem.col.lg,
          h: state.height,
          x: 0,
          y: rowCount * state.height,
        }
      }
      state.items = [...state.items, newItem]
    },
    handleRemoveItemAction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    handleSaveItemAction: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    },
    handleResetQuickActItemAction: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          const newData = {...action.payload}
          newData.data = newData.data.map(it => {
            return {
              ...it,
              isSelected: true,
            }
          })
          return newData
        }
        return item
      })
    },
  },
})

export const {
  handleChangeEditAction,
  handleChangeLayoutAction,
  handleSaveItemLS,
  handleAddItemAction,
  handleChangeItemDetailAction,
  handleRemoveItemAction,
  handleSaveItemAction,
  handleResetQuickActItemAction,
} = widgetSlice.actions

export default widgetSlice.reducer
