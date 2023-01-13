import {Badge} from 'reactstrap'

export const configs = {
  entries: 'Locations',
  settings: [
    'export',
    'select',
    'reordering',
    'filter',
    'search',
    'pagination',
  ],
  keys: {
    list: 'GMB_LOCATIONS',
    detail: 'GMB_LOCATION_DETAIL',
  },
  urls: {
    list: '/location/',
    detail: '/location/',
  },
  fixedColumns: {
    left: ['location_id', 'location_name'],
    right: [],
  },
}
export const formatRowData = data =>
  data.map(d => ({
    ...d,
    address_lines: d.address_lines && d.address_lines.join(', '),
    address_recipients: d.address_recipients && d.address_recipients.join(', '),
    labels:
      d.labels &&
      d.labels.length > 0 &&
      d.labels.map(l => (
        <Badge key={l} color="light-primary" className="ms-25">
          {l}
        </Badge>
      )),
  }))
