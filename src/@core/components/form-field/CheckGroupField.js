import {Input, Label} from 'reactstrap'
import classnames from 'classnames'
import {useEffect, useState} from 'react'

const CheckGroupField = ({
  name,
  id,
  label,
  required,
  options = [],
  inline = false,
  color,
  type = 'checkbox',
  value = [],
  defaultValue = [],
  onChange = () => {},
  disabled = false,
}) => {
  const [data, setData] = useState(defaultValue || value)

  const handleChange = (select, checked) => {
    if (type === 'checkbox') {
      const newData = checked
        ? [...data, select]
        : data.filter(d => d.id !== select.id)

      setData(newData)
      onChange(newData)
    } else {
      const newData = checked ? [select] : []
      setData(newData)
      onChange(newData)
    }
  }

  useEffect(() => {
    if (value.length) {
      setData(value)
    }
  }, [value])

  return (
    <>
      {label && (
        <Label className="form-check-label fw-bolder" for={id || name}>
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
      {options.length > 0 && (
        <div
          className={classnames('d-flex', {
            'flex-column': !inline,
          })}
        >
          {options.map(d => (
            <div
              key={d.id}
              className={`form-check mt-1 me-2 form-check-${color}`}
            >
              <Input
                type={type}
                id={d.id}
                checked={data.map(it => it.id).includes(d.id)}
                onChange={e => handleChange(d, e.target.checked)}
                disabled={disabled}
                {...d}
              />
              {d.name && (
                <label
                  className="form-check-label"
                  htmlFor={d.id}
                  onClick={() => handleChange(d, !data.includes(d.id))}
                >
                  {d.name}
                </label>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CheckGroupField
