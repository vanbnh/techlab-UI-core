import React, {useCallback} from 'react'
import parse from 'html-react-parser'
import CommonCardHeader from './CommonCardHeader'
import {
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import {Copy, Edit, Settings, Trash2} from 'react-feather'
import {useTranslation} from 'react-i18next'

const QuickNote = ({
  item,
  isEdit,
  setItemDetail,
  onDuplicateItem,
  onRemoveItem,
}) => {
  const {title, content} = item
  const {t} = useTranslation()

  const renderCardActions = useCallback(
    () => (
      <div>
        <UncontrolledButtonDropdown>
          <DropdownToggle size="sm" color="flat-primary" caret>
            <Settings size={14} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="w-100" onClick={() => setItemDetail(item)}>
              <Edit size={14} className="me-50 ms-1" />
              {t('Edit')}
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => {
                onDuplicateItem({
                  ...item,
                  id: new Date().getTime(),
                })
              }}
            >
              <Copy size={14} className="me-50 ms-1" />
              {t('Duplicate')}
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              className="w-100"
              onClick={() => onRemoveItem(item.id)}
            >
              <Trash2 size={14} className="me-50 ms-1 text-danger" />
              {t('Delete')}
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    ),
    [item, onDuplicateItem, onRemoveItem, setItemDetail],
  )

  return (
    <Card
      className={`w-100 h-100 overflow-hidden ${isEdit ? 'cursor-move' : ''}`}
    >
      <CommonCardHeader isEdit={isEdit} item={item}>
        {renderCardActions()}
      </CommonCardHeader>
      {title && <div className="text-center fw-bolder">{title}</div>}
      <CardBody className="overflow-auto">
        {content && <div>{parse(content)} </div>}
      </CardBody>
    </Card>
  )
}

export default QuickNote
