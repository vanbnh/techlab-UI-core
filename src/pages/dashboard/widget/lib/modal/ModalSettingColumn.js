import React, {useState} from 'react'
import {ReactSortable} from 'react-sortablejs'
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import {CheckField} from '../../../../../@core/components/form-field'
import ModalComponent from '../../../../../@core/components/modal'

const ModalSettingColumn = ({
  isOpen,
  close,
  columns,
  columnOrders,
  columnHiddens,
  onSave,
  title,
}) => {
  const [cols, setCols] = useState(() =>
    columnOrders.map(key => {
      const col = columns.find(c => c.name === key)
      col.checked = !columnHiddens.includes(key)
      return col
    }),
  )

  return (
    <ModalComponent
      isOpen={isOpen}
      toggle={close}
      title={`Setting Column ${title}`}
      size="sm"
      scrollable
      Body={
        <div className="w-100 flex gap-3 flex-col justify-center">
          <div className="mb-1 ms-1">
            <CheckField
              checked={cols.filter(col => col.checked).length === cols.length}
              id="check-all"
              label="All"
              name="check-all"
              color
              classNameLabel="cursor-pointer"
              onChange={e =>
                setCols(cols.map(col => ({...col, checked: e.target.checked})))
              }
            />
          </div>

          <div>
            <ListGroup>
              <ReactSortable list={cols} setList={lists => setCols(lists)}>
                {cols.map(column => (
                  <ListGroupItem
                    className="cursor-pointer"
                    key={column.name}
                    tag="a"
                  >
                    <CheckField
                      checked={column.checked}
                      id={column.title.toUpperCase()}
                      label={column.title.toUpperCase()}
                      name={column.title.toUpperCase()}
                      classNameLabel="cursor-pointer"
                      onChange={e =>
                        setCols(prev =>
                          prev.map(col =>
                            col.name === column.name
                              ? {
                                  ...column,
                                  checked: e.target.checked,
                                }
                              : col,
                          ),
                        )
                      }
                    />
                  </ListGroupItem>
                ))}
              </ReactSortable>
            </ListGroup>
          </div>
        </div>
      }
      Footer={
        <>
          <Button color="secondary" outline className="me-50" onClick={close}>
            Close
          </Button>
          <Button
            color="relief-primary"
            onClick={() => {
              onSave(cols)
              close()
            }}
          >
            Save
          </Button>
        </>
      }
    />
  )
}

export default ModalSettingColumn
