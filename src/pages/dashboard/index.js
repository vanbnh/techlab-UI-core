import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import {Responsive as ResponsiveGridLayout} from 'react-grid-layout'
import CheckField from '../../@core/components/form-field/CheckField'

import {
  handleAddItemAction,
  handleChangeEditAction,
  handleChangeItemDetailAction,
  handleChangeLayoutAction,
  handleRemoveItemAction,
  handleSaveItemAction,
  handleSaveItemLS,
} from './store'
import './styles.scss'
import WidgetItem from './widget/WidgetItem'
import {getIcon} from './store/function'
import ModalEditQuickNote from './modal/EditQuickNote'
import {useTranslation} from 'react-i18next'

const DashboardPage = () => {
  // *** REDUX ***
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const {isEdit, items, itemDetail, types} = useSelector(state => state.widgets)

  // *** GET Width ***
  const pageRef = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    if (!pageRef?.current?.offsetWidth) return
    setWidth(pageRef?.current?.offsetWidth)
  }, [pageRef?.current?.offsetWidth])

  // *** State ***
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => setOpenModal(prev => !prev)

  useEffect(() => {
    dispatch(handleSaveItemLS())
  }, [dispatch, items])

  // *** QUICK ACTION ***
  const onEditItem = item => {
    dispatch(handleChangeItemDetailAction(item))
    if (item?.type === 1) {
      toggleModal()
    }
  }

  const onSaveItem = newItem => dispatch(handleSaveItemAction(newItem))
  const onAddItem = useCallback(
    newItem => dispatch(handleAddItemAction(newItem)),
    [dispatch],
  )

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="text-muted me-2">
            {items.length} {t('Widgets')}
          </div>
          {items.length > 0 && (
            <div className="fs-4 fw-bold d-flex align-items-center justify-content-center">
              <div className="items-center">
                <CheckField
                  checked={isEdit}
                  label={t('Edit')}
                  name="edit"
                  onChange={() => dispatch(handleChangeEditAction(!isEdit))}
                  type="switch"
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="primary" caret size="sm">
              {t('Add new widget')}
            </DropdownToggle>
            <DropdownMenu end>
              {types.map(widget => (
                <DropdownItem
                  key={widget.id}
                  onClick={() => onAddItem(widget)}
                  className="w-100"
                >
                  <div className="col text-nowrap overflow-hidden text-overflow-ellipsis">
                    {getIcon(widget.icon)}
                    <span className="ms-50">{t(widget.name)}</span>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </div>
      <div ref={pageRef}>
        <div className="row">
          <ResponsiveGridLayout
            className="layout"
            margin={[10, 10]}
            rowHeight={50}
            width={width}
            onDragStop={l => dispatch(handleChangeLayoutAction(l))}
            onResizeStop={l => dispatch(handleChangeLayoutAction(l))}
            isDraggable={isEdit}
            isResizable={isEdit}
          >
            {items.length > 0 &&
              items.map(item => (
                <div key={item.id} className="widget" data-grid={item.dataGrid}>
                  <WidgetItem
                    isEdit={isEdit}
                    item={item}
                    onDuplicateItem={it => dispatch(handleAddItemAction(it))}
                    setItemDetail={onEditItem}
                    onRemoveItem={id => dispatch(handleRemoveItemAction(id))}
                    onSaveItem={onSaveItem}
                  />
                </div>
              ))}
          </ResponsiveGridLayout>
        </div>
      </div>
      <ModalEditQuickNote
        item={itemDetail}
        openModal={openModal}
        toggleModal={toggleModal}
        onSaveItem={onSaveItem}
      />
    </>
  )
}

export default DashboardPage
