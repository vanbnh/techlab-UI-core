import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'
import cn from 'classnames'
import CommonCardHeader from './CommonCardHeader'
import Loading from '../../../../@core/components/grid-table/components/loading/Loading'
import {
  Card,
  CardBody,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from 'reactstrap'
import moment from 'moment'
import {Copy, Settings, Trash2} from 'react-feather'
import {getIcon} from '../../store/function'
import Avatar from '@components/avatar'

const Statistic = ({item, isEdit, onDuplicateItem, onRemoveItem}) => {
  const {title} = item
  const [data, setData] = useState({
    client: 0,
    gmb_account: 0,
    location: 0,
    location_report: 0,
    location_review: 0,
    post: 0,
    post_report: 0,
  })
  const [loading, setLoading] = useState(false)
  const statisticCards = [
    {
      name: 'Location',
      data: data.location,
      icon: 'MapPin',
      color: 'primary',
    },
    {
      name: 'Location Reports',
      data: data.location_report,
      icon: 'Layers',
      color: 'dark',
    },
    {
      name: 'Posts',
      data: data.post,
      icon: 'FileText',
      color: 'success',
    },
    {
      name: 'Post Reports',
      data: data.post_report,
      icon: 'Layers',
      color: 'dark',
    },
    {
      name: 'Accounts',
      data: data.gmb_account,
      icon: 'Users',
      color: 'info',
    },
    {
      name: 'Clients',
      data: data.client,
      icon: 'Star',
      color: 'secondary',
    },
  ]

  const getData = async date => {
    setLoading(true)
    try {
      const response = await axios.get('/statistic/all/', {
        params: {
          start_date:
            date?.startDate ||
            moment().startOf('week').add('-8', 'week').format('YYYY-MM-DD'),
          end_date:
            date?.endDate || moment().endOf('week').format('YYYY-MM-DD'),
        },
      })
      if (response.data) {
        setData(response.data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onChangeDate = date => {
    getData(date)
  }

  const renderCardActions = useCallback(
    () => (
      <div>
        <UncontrolledButtonDropdown>
          <DropdownToggle size="sm" color="flat-primary" caret>
            <Settings size={14} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="w-100"
              onClick={() => {
                onDuplicateItem({
                  ...item,
                  id: new Date().getTime(),
                })
              }}
            >
              <Copy size={14} className="me-50" />
              Duplicate
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              className="w-100 "
              onClick={() => onRemoveItem(item.id)}
            >
              <Trash2 size={14} className="me-50 text-danger" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    ),
    [item, onDuplicateItem, onRemoveItem],
  )

  const renderData = () => {
    const cols = {sm: '6', xs: '12'}
    return statisticCards.map((item, index) => {
      return (
        <Col
          key={index}
          {...cols}
          className={cn({
            [`mb-3`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar
              color={`light-${item.color}`}
              icon={getIcon(item.icon)}
              className="me-2"
            />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.data}</h4>
              <CardText className="font-small-3 mb-0">{item.name}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card
      className={`w-100 h-100 overflow-hidden card-statistics ${
        isEdit ? 'cursor-move' : ''
      }`}
    >
      <CommonCardHeader isEdit={isEdit} item={item}>
        {renderCardActions()}
      </CommonCardHeader>
      {title && <div className="text-center fw-bolder fs-2 mb-2">{title}</div>}
      {/* <div className="w-50 ms-2">
        <PickerButton
          onSubmit={onChangeDate}
          months={1}
          position={{top: 0, left: 0}}
        />
      </div> */}

      <CardBody className="overflow-auto">
        <Row>{renderData()}</Row>
        {loading && <Loading />}
      </CardBody>
    </Card>
  )
}

export default Statistic
