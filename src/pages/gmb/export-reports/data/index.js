import {FileText, MapPin, MessageSquare} from 'react-feather'
import {
  ChartColumnIcon,
  MagnifyingGlassLocationIcon,
  StarSharpHalfStrokeIcon,
} from '../../../../assets/fontAwesomeIcon'

export const downloadReportDataNew = [
  {
    jp: '掲載情報',
    en: 'Posted information',
    children: [
      {
        url: 'location-raw',
        name_en: 'Location Raw',
        name_jp: '店舗掲載情報',
        description_en: 'Raw data for location information',
        description_jp: '店舗情報の生データ',
        icon: MapPin,
      },
      {
        url: 'local-post-raw',
        name_en: 'Local Post Information',
        name_jp: '投稿掲載内容',
        description_en: 'Export local posts contents group by client',
        description_jp: '指定したクライアントの投稿掲載内容を出力します',
        icon: MessageSquare,
      },
    ],
  },
  {
    jp: 'レポート用データ',
    en: 'Data For Reporting',
    children: [
      {
        url: 'location-discovery-report',
        name_en: 'Location Discovery Report',
        name_jp: 'マクロ用店舗実績',
        description_en: 'Location insights for report using macros',
        description_jp: 'レポート生成マクロで使用する店舗実績',
        icon: FileText,
        bubble: '店舗',
        dateRange: true,
      },
      {
        url: 'location-daily-metric',
        name_en: 'Location Daily Metric',
        name_jp: '(新API)店舗日次実績',
        description_en: 'Location daily metrics for report using macros',
        description_jp: '(新API)レポート生成マクロで使用する店舗日次実績',
        icon: FileText,
        bubble: 'NEW API',
        dateRange: true,
      },
      {
        url: 'local-post-insight-report',
        name_en: 'Local Post Insight Report',
        name_jp: '投稿実績',
        description_en: 'Local post insights for report using macros',
        description_jp: 'レポート生成マクロで使用する投稿実績',
        icon: FileText,
        bubble: '投稿',
        dateRange: true,
      },
      {
        url: 'location-review',
        name_en: 'Location Review',
        name_jp: '店舗レビュー',
        description_en: 'Location reviews download',
        description_jp: '店舗レビューのダウンロード',
        icon: StarSharpHalfStrokeIcon,
        dateRange: true,
      },
      {
        url: 'location-search-keywords-insight',
        name_en: 'Location Search Keywords Insight',
        name_jp: 'キーワードサーチ実績',
        description_en:
          'Location search keywords insights for report using macros',
        description_jp: 'キーワードサーチ実績のダウンロード',
        icon: MagnifyingGlassLocationIcon,
        dateRange: true,
        keywordLimit: true,
      },
      {
        url: 'summary-report',
        name_en: 'Summary Report',
        name_jp: 'レポート出力',
        description_en: 'Summary report download',
        description_jp: '提出用レポートの出力',
        icon: ChartColumnIcon,
        month: true,
        isDisabled: true,
      },
    ],
  },
]
