import {
  Edit3,
  FileText,
  Layers,
  MapPin,
  Monitor,
  Star,
  TrendingUp,
  Users,
} from 'react-feather'

export const getFromLS = key => {
  let ls = {}
  if (window.localStorage && window.localStorage.getItem('widgets')) {
    try {
      ls = JSON.parse(window.localStorage.getItem('widgets')) || {}
    } catch (e) {
      console.log(e)
    }
  }
  return ls[key]
}

export const saveItemLS = d => {
  if (window.localStorage) {
    window.localStorage.setItem('widgets', JSON.stringify(d))
  }
}

export const getIcon = type => {
  switch (type) {
    case 'Edit3':
      return <Edit3 size={16} />
    case 'TrendingUp':
      return <TrendingUp size={16} />
    case 'Users':
      return <Users size={16} />
    case 'Star':
      return <Star size={16} />
    case 'MapPin':
      return <MapPin size={16} />
    case 'FileText':
      return <FileText size={16} />
    case 'Layers':
      return <Layers size={16} />
    case 'Monitor':
      return <Monitor size={16} />

    default:
      return ''
  }
}
