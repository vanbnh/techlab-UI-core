import {lazy} from 'react'
import menuConfigs from '../../configs/menu'

// *** DASHBOARD ***
const DashboardPage = lazy(() => import('../../pages/dashboard'))

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

// *** POST REPORT ***
const PostReportPage = lazy(() => import('../../pages/gmb/post-reports'))
const PostReportDetailPage = lazy(() =>
  import('../../pages/gmb/post-reports/detail'),
)

// *** MONITORING TASK LOGS ***
const MonitoringTaskLogsPage = lazy(() => import('../../pages/gmb/task-logs'))
const MonitoringTaskLogDetailPage = lazy(() =>
  import('../../pages/gmb/task-logs/detail'),
)

const GMBRoutes = [
  {
    element: <DashboardPage />,
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

  // *** POST REPORT ***
  {
    element: <PostReportPage />,
    path: menuConfigs.report.post.path,
  },
  {
    element: <PostReportDetailPage />,
    path: `${menuConfigs.report.post.path}/details`,
  },
  // *** MONITORING TASK LOGS ***
  {
    element: <MonitoringTaskLogsPage />,
    path: menuConfigs.monitoring.task_log.path,
  },
  {
    element: <MonitoringTaskLogDetailPage />,
    path: `${menuConfigs.monitoring.task_log.path}/:id`,
  },
]

export default GMBRoutes
