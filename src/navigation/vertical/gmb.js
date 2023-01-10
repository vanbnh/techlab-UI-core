// ** Icons Import
import {Home, Users} from 'react-feather'
import menuConfigs from '../../configs/menu'

export default [
  {
    header: 'Dashboard',
  },
  {
    id: 'gmb-dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard',
  },
  {
    header: 'Menu',
  },
  {
    id: 'gmb-account',
    title: 'Accounts',
    icon: <Users size={20} />,
    navLink: menuConfigs.account.path,
  },
]
