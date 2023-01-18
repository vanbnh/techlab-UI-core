import React from 'react'
import {Columns, Copy, Eye, Settings, Trash2} from 'react-feather'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap'

const CardActionTableWidgetItem = ({
  item,
  onDuplicateItem,
  pathViewAll,
  onRemoveItem,
  onOpenModalSettingColumn,
}) => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  return (
    <div>
      <UncontrolledButtonDropdown>
        <DropdownToggle size="sm" color="flat-primary" caret>
          <Settings size={14} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="w-100" onClick={() => navigate(pathViewAll)}>
            <Eye size={14} className="me-50 ms-1" />
            {t('View All')}
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => onOpenModalSettingColumn()}
          >
            <Columns size={14} className="me-50 ms-1" />
            {t('Setting Columns')}
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
          <DropdownItem className="w-100" onClick={() => onRemoveItem(item.id)}>
            <Trash2 size={14} className="me-50 text-danger ms-1" />
            {t('Delete')}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export default CardActionTableWidgetItem
