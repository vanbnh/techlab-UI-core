// ** Icons Import
import {
  Circle,
  DownloadCloud,
  FileText,
  Home,
  MapPin,
  Monitor,
  Star,
  UploadCloud,
  Users,
} from 'react-feather'
import menuConfigs from '../../configs/menu'

export default [
  {
    header: 'Dashboards',
  },
  {
    id: 'gmb-dashboard',
    title: 'Dashboards',
    icon: <Home size={20} />,
    navLink: '/dashboard',
  },
  {
    header: 'Actions',
  },
  {
    id: 'gmb-download-report',
    title: 'Downloads',
    icon: <DownloadCloud size={20} />,
    navLink: menuConfigs.exportReport.path,
  },
  {
    id: 'gmb-upload-report',
    title: 'Uploads',
    icon: <UploadCloud size={20} />,
    navLink: menuConfigs.uploadReport.path,
  },
  {
    header: 'GMB',
  },
  {
    id: 'gmb-account',
    title: 'Accounts',
    icon: <Users size={20} />,
    navLink: menuConfigs.account.path,
  },
  {
    id: 'gmb-client',
    title: 'Clients',
    icon: <Star size={20} />,
    navLink: menuConfigs.client.path,
  },
  {
    id: 'gmb-location',
    title: 'Locations',
    icon: <MapPin size={20} />,
    navLink: menuConfigs.location.path,
  },
  {
    id: 'gmb-post',
    title: 'Posts',
    icon: <FileText size={20} />,
    navLink: menuConfigs.post.path,
  },
  // {
  //   id: 'gmb-report',
  //   title: 'Reports',
  //   icon: <Layers size={20} />,
  //   children: [
  //     {
  //       id: 'gmb-report-location',
  //       title: 'Location Reports',
  //       icon: <Circle size={12} />,
  //       navLink: menuConfigs.report.location.path,
  //     },
  //     {
  //       id: 'gmb-report-post',
  //       title: 'Post Reports',
  //       icon: <Circle size={12} />,
  //       navLink: menuConfigs.report.post.path,
  //     },
  //   ],
  // },
  {
    id: 'gmb-monitoring',
    title: 'Monitorings',
    icon: <Monitor size={20} />,
    children: [
      {
        id: 'gmb-monitoring-task-log',
        title: 'Task Logs',
        icon: <Circle size={12} />,
        navLink: menuConfigs.monitoring.task_log.path,
      },
    ],
  },
]
