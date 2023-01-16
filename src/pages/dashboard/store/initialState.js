import {getFromLS} from './function'
const WIDGET_TYPES = [
  {
    id: 1,
    type: 1,
    code: 'QUICK_NOTE',
    name: 'Quick note',
    icon: 'Edit3',
    title: 'Title',
    content: 'Edit',
    col: {
      lg: 4,
    },
  },
  {
    id: 2,
    type: 2,
    code: 'STATISTIC',
    name: 'Satistics',
    icon: 'TrendingUp',
    col: {
      lg: 4,
    },
  },
  {
    id: 3,
    type: 3,
    code: 'ACCOUNTS',
    name: 'Accounts',
    icon: 'Users',
    col: {
      lg: 12,
    },
  },
  {
    id: 4,
    type: 4,
    code: 'CLIENTS',
    name: 'Clients',
    icon: 'Star',
    col: {
      lg: 12,
    },
  },
  {
    id: 5,
    type: 5,
    code: 'LOCATIONS',
    name: 'Locations',
    icon: 'MapPin',
    col: {
      lg: 12,
    },
  },
  {
    id: 6,
    type: 6,
    code: 'POSTS',
    name: 'Posts',
    icon: 'FileText',
    col: {
      lg: 12,
    },
  },
  {
    id: 7,
    type: 7,
    code: 'LOCATION_REPORTS',
    name: 'Location Reports',
    icon: 'Layers',
    col: {
      lg: 12,
    },
  },
  {
    id: 8,
    type: 8,
    code: 'POST_REPORTS',
    name: 'Post Reports',
    icon: 'Layers',
    col: {
      lg: 12,
    },
  },
  {
    id: 9,
    type: 9,
    code: 'MONITORINGS',
    name: 'Task Logs',
    icon: 'Monitor',
    col: {
      lg: 12,
    },
  },
]

const initialState = {
  types: WIDGET_TYPES,
  isEdit: false,
  items: getFromLS('items') || [],
  layouts: {
    lg: [],
  },
  itemDetail: null,
  height: 8,
}

export default initialState
