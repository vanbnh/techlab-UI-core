// ** Icons Import
import {
  Circle,
  FileText,
  Home,
  Layers,
  MapPin,
  Star,
  Users,
} from 'react-feather'
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
  {
    id: 'gmb-report',
    title: 'Reports',
    icon: <Layers size={20} />,
    children: [
      {
        id: 'gmb-report-location',
        title: 'Location Reports',
        icon: <Circle size={12} />,
        navLink: menuConfigs.report.location.path,
      },
      {
        id: 'gmb-report-post',
        title: 'Post Reports',
        icon: <Circle size={12} />,
        navLink: menuConfigs.report.post.path,
      },
    ],
  },
]
