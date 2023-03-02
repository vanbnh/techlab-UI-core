import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStarHalfStroke} from '@fortawesome/free-regular-svg-icons'
import {
  faMagnifyingGlassLocation,
  faChartColumn,
  faMessage,
} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

export const StarSharpHalfStrokeIcon = ({...rest}) => (
  <FontAwesomeIcon icon={faStarHalfStroke} {...rest} />
)

export const MagnifyingGlassLocationIcon = ({...rest}) => (
  <FontAwesomeIcon icon={faMagnifyingGlassLocation} {...rest} />
)

export const ChartColumnIcon = ({...rest}) => (
  <FontAwesomeIcon icon={faChartColumn} {...rest} />
)

export const MessageLinesIcon = ({...rest}) => (
  <FontAwesomeIcon icon={faMessage} {...rest} />
)
