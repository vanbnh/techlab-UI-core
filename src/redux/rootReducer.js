// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import widgets from '../pages/dashboard/store'

const rootReducer = {
  auth,
  layout,
  navbar,
  widgets,
}

export default rootReducer
