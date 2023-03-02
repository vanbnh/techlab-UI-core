import {Button} from 'reactstrap'
import PulseLoader from 'react-spinners/PulseLoader'
import {Save} from 'react-feather'

const SpinnerButton = ({
  isWizard = false,
  loading = false,
  text = 'Save',
  hasIcon = true,
  ...btnRest
}) => {
  return (
    <>
      {isWizard ? (
        <Button {...btnRest}>
          {loading ? (
            <PulseLoader color="#fff" size={5} />
          ) : (
            <>
              <span className="align-middle d-sm-inline-block d-none">
                {text}
              </span>
              {hasIcon && (
                <Save size={14} className="align-middle ms-sm-25 ms-0"></Save>
              )}
            </>
          )}
        </Button>
      ) : (
        <Button.Ripple {...btnRest}>
          {loading ? <PulseLoader color="#fff" size={5} /> : text}
        </Button.Ripple>
      )}
    </>
  )
}

export default SpinnerButton
