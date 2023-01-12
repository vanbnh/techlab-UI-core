import {lazy} from 'react'
import menuConfigs from '../../configs/menu'

// *** ACCOUNT ***
const AccountPage = lazy(() => import('../../pages/gmb/accounts'))
const AccountDetailPage = lazy(() => import('../../pages/gmb/accounts/detail'))

// *** CLIENT ***
const ClientPage = lazy(() => import('../../pages/gmb/clients'))
const ClientDetailPage = lazy(() => import('../../pages/gmb/clients/detail'))

// *** LOCATION ***
const LocationPage = lazy(() => import('../../pages/gmb/locations'))
const LocationDetailPage = lazy(() =>
  import('../../pages/gmb/locations/detail'),
)

// *** POST ***
const PostPage = lazy(() => import('../../pages/gmb/posts'))
const PostDetailPage = lazy(() => import('../../pages/gmb/posts/detail'))

// *** LOCATION REPORT ***
const LocationReportPage = lazy(() =>
  import('../../pages/gmb/location-reports'),
)
const LocationReportDetailPage = lazy(() =>
  import('../../pages/gmb/location-reports/detail'),
)

const GMBRoutes = [
  {
    element: <></>,
    path: '/dashboard',
  },
  // *** ACCOUNT ***
  {
    element: <AccountPage />,
    path: menuConfigs.account.path,
  },
  {
    element: <AccountDetailPage />,
    path: `${menuConfigs.account.path}/:id`,
  },

  // *** CLIENT ***
  {
    element: <ClientPage />,
    path: menuConfigs.client.path,
  },
  {
    element: <ClientDetailPage />,
    path: `${menuConfigs.client.path}/:id`,
  },

  // *** LOCATION ***
  {
    element: <LocationPage />,
    path: menuConfigs.location.path,
  },
  {
    element: <LocationDetailPage />,
    path: `${menuConfigs.location.path}/:id`,
  },

  // *** POST ***
  {
    element: <PostPage />,
    path: menuConfigs.post.path,
  },
  {
    element: <PostDetailPage />,
    path: `${menuConfigs.post.path}/:id`,
  },

  // *** LOCATION REPORT ***
  {
    element: <LocationReportPage />,
    path: menuConfigs.report.location.path,
  },
  {
    element: <LocationReportDetailPage />,
    path: `${menuConfigs.report.location.path}/details`,
  },
]

export default GMBRoutes
