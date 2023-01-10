import {lazy} from 'react'
import menuConfigs from '../../configs/menu'

const AccountPage = lazy(() => import('../../pages/gmb/accounts'))

const GMBRoutes = [
  {
    element: <></>,
    path: '/dashboard',
  },
  {
    element: <AccountPage />,
    path: menuConfigs.account.path,
  },
]

export default GMBRoutes
