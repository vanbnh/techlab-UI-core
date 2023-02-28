import {Clock, Rss} from 'react-feather'

export const uploadLocationData = [
  {
    key: 'immediate-processing-location-upload',
    name_en: 'Immediate Processing',
    name_jp: '店舗情報即投稿',
    description_en:
      'Upload your location information to the map immediately after you register it.',
    description_jp:
      '店舗情報バルクをアップするとすぐにGoogleマップに反映します。',
    icon: Rss,
    color: 'primary',
    modelType: 'location',
    uploadType: 'update',
  },
  {
    key: 'schedule-processing-location-upload',
    name_en: 'Schedule Processing',
    name_jp: '店舗情報予約投稿',
    description_en:
      'Upload your location information to the map at a specified time.',
    description_jp:
      'バルク名に基づいて店舗情報を指定した時間にGoogleマップに反映します。',
    icon: Clock,
    color: 'primary',
    modelType: 'location',
    uploadType: 'schedule',
  },
]

export const uploadPostData = [
  {
    key: 'immediate-processing-local-post-upload',
    name_en: 'Immediate Processing Local',
    name_jp: '投稿即配信',
    description_en:
      'Upload your post to the map immediately after you register it.',
    description_jp: '投稿バルクをアップするとすぐにGoogleマップに反映します。',
    icon: Rss,
    color: 'primary',
    modelType: 'post',
    uploadType: 'update',
  },
  {
    key: 'schedule-processing-local-post-upload',
    name_en: 'Schedule Processing Local',
    name_jp: '投稿予約配信',
    description_en: 'Upload your post to the map at a specified time.',
    description_jp:
      'バルク名に基づいて投稿を指定した時間にGoogleマップに反映します。',
    icon: Clock,
    color: 'primary',
    modelType: 'post',
    uploadType: 'schedule',
  },
]
