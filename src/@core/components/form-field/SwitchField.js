import {useEffect, useState} from 'react'
import {Check, X} from 'react-feather'
import {Input, Label} from 'reactstrap'

const CustomLabel = ({htmlFor}) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  )
}

const SwitchField = ({
  id,
  name,
  label,
  color = 'primary',
  icon,
  required,
  inline = false,
  value,
  ...rest
}) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <>
      <div
        className={`d-flex flex-${inline ? 'row' : 'column'} cursor-pointer`}
      >
        {label && (
          <Label
            for={id || name}
            className={`form-check-label mb-50 fw-bolder ${
              inline ? 'me-1' : ''
            }`}
          >
            {label}{' '}
            {required && (
              <sup
                style={{
                  color: '#FF0000',
                  fontSize: '1rem',
                  top: '0',
                }}
              >
                *
              </sup>
            )}
          </Label>
        )}
        <div className={`form-switch form-check-${color}`}>
          <Input
            className="cursor-pointer"
            type="switch"
            id={id || name}
            checked={checked}
            value={checked}
            {...rest}
          />
          {icon && <CustomLabel htmlFor={id || name} />}
        </div>
      </div>
    </>
  )
}

export default SwitchField
