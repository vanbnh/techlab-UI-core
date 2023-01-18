import cn from 'classnames'
import {Input, Label} from 'reactstrap'

const CheckField = ({
  type = 'checkbox',
  id,
  name,
  label,
  color = 'primary',
  required,
  value,
  className,
  ...rest
}) => {
  return (
    <>
      <div className={`form-check form-check-${color} `}>
        <Input
          type={type}
          id={id || name}
          checked={value}
          {...rest}
          className={cn('mt-25', className)}
        />
        {label && (
          <Label className="form-check-label" for={id || name}>
            {label}{' '}
            {required && (
              <sup
                style={{
                  color: '#FF0000',
                  fontSize: '1rem',
                }}
              >
                *
              </sup>
            )}
          </Label>
        )}
      </div>
    </>
  )
}

export default CheckField
