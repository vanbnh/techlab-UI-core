// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import widgets from '../pages/dashboard/store'
import gridTables from '../@core/components/grid-table/store'

const rootReducer = {
  auth,
  layout,
  navbar,
  widgets,
  gridTables,
}

export default rootReducer
