import axios from 'axios'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {toast} from 'react-hot-toast'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Label,
  Progress,
} from 'reactstrap'
import handleConfirmAlert from '../../../../../@core/components/confirm-alert'
import DatePickerComponent from '../../../../../@core/components/date-picker'
import {DateTimeField} from '../../../../../@core/components/form-field'
import {dataTableActions} from '../../../../../@core/components/grid-table/store'
import ModalComponent from '../../../../../@core/components/modal'
import SpinnerButton from '../../../../../@core/components/spinner-button'
import {PROXY_ORIGIN} from '../../../../../configs/proxy'
import ClientPage from '../../../clients'

const getClientSelected = (dataRows, rowSelects) => {
  if (dataRows.length > 0 && rowSelects.length > 0) {
    const idArr = []
    dataRows.forEach((_, index) => {
      if (rowSelects.includes(index)) {
        idArr.push(dataRows[index].client_id)
      }
    })
    return dataRows.filter(row => idArr.includes(row.client_id))
  }
  return []
}

const CardReport = ({data}) => {
  // *** HOOKS ***
  const {t, i18n} = useTranslation()
  const language = i18n.language

  const dispatch = useDispatch()

  // *** REDUCER ***
  const {dataRows, rowSelects} = useSelector(state => state.gridTables)
  const {setRowSelectsAction} = dataTableActions

  // *** STATE ***
  const [show, setShow] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [loading, setLoading] = useState(false)

  // *** OTHER PARAMS ***
  const [datePicker, setDatePicker] = useState({
    start_date: moment().startOf('week').add('-8', 'week').format('YYYY-MM-DD'),
    end_date: moment().endOf('week').format('YYYY-MM-DD'),
  })
  const [keywordLimit, setKeywordLimit] = useState(100)
  const [monthPicker, setMonthPicker] = useState('')

  // *** CONSTANT ***
  const progressValue = 100 - Math.round((timeLeft / 30) * 100)
  const clientSelected = getClientSelected(dataRows, rowSelects)
  const clientNames = clientSelected.map(client => client.client_name)
  const clientStrings = clientNames.length > 0 ? clientNames.join(', ') : ''

  const renderClientSelected = () =>
    clientSelected.map(client => (
      <Badge key={client.client_id} className="m-25" color="light-primary">
        {client.client_name}
      </Badge>
    ))

  useEffect(() => {
    if (isWaiting) {
      const countdown = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      if (timeLeft === 0) {
        clearInterval(countdown)
        setIsWaiting(false)
      }
      return () => clearInterval(countdown)
    }
  }, [timeLeft, isWaiting])

  const onReset = () => {
    dispatch(setRowSelectsAction([]))
    setDatePicker({
      start_date: moment()
        .startOf('week')
        .add('-8', 'week')
        .format('YYYY-MM-DD'),
      end_date: moment().endOf('week').format('YYYY-MM-DD'),
    })
    setKeywordLimit(100)
    setMonthPicker('')
  }

  const toggle = () => {
    setShow(!show)
    onReset()
  }

  const onChangeKeywordLimit = e => {
    const value = e.target.value
    setKeywordLimit(value)
  }

  const onSubmit = () => {
    handleConfirmAlert({
      title: t('Are you sure?'),
      text: `${data[`name_${language}`]} ${clientSelected.length} ${t(
        'Clients',
      )}: ${clientStrings}`,
      confirmButtonText: t('Yes, do'),
      cb: async () => {
        const clientIds = clientSelected.map(client => client.client_id)
        const params = {}

        if (data.dateRange) {
          params.start_date = datePicker.start_date
          params.end_date = datePicker.end_date
        }

        if (data.keywordLimit) {
          params.keyword_limit = keywordLimit
        }

        if (data.month) {
          params.month =
            monthPicker.length > 0
              ? moment(monthPicker[0]).format('YYYY-MM')
              : ''
        }

        setLoading(true)

        const response = await Promise.all(
          clientIds.map(async clientId => {
            const result = {}
            try {
              const res = await axios.get(`${PROXY_ORIGIN}/${data.url}/`, {
                params: {
                  ...params,
                  client_id: clientId,
                },
              })
              if (res.status === 200) {
                result[clientId] = res.data
              }
            } catch (error) {
              result[clientId] = error.response.data
            }
            return result
          }),
        )

        const mgs = response.map(res => {
          const clientId = Object.keys(res)[0]
          const client = dataRows.find(client => client.client_id === +clientId)
          if (!client) return
          const clientName = client.client_name
          const message = res[clientId].message
          return {
            clientName,
            message: `${clientName}: ${message}`,
            status: res[clientId].status,
          }
        })

        if (mgs.length > 0) {
          mgs.forEach(msg => {
            const status = msg.status && msg.status.toLowerCase()

            if (status === 'ok') {
              toast.success(msg.message, {duration: 5000})
            } else {
              toast.error(msg.message, {duration: 5000})
            }
          })
        }

        setTimeLeft(30)
        setIsWaiting(true)
        toggle()
        setLoading(false)
      },
    })
  }

  return (
    <>
      <Card className="position-relative" style={{minHeight: '250px'}}>
        <CardBody className="text-center">
          {data.icon && <data.icon className="font-large-2 mb-1" />}

          <i className="fa-solid fa-star-sharp-half-stroke font-large-2 mb-1"></i>
          <CardTitle tag="h5">{data[`name_${language}`]}</CardTitle>
          <CardText>{data[`description_${language}`]}</CardText>
          {isWaiting ? (
            <>
              Waiting...{timeLeft}
              <Progress value={30 - timeLeft} max={30}>
                {progressValue}%
              </Progress>
            </>
          ) : (
            <Button
              color="relief-primary"
              onClick={() => setShow(true)}
              disabled={data.isDisabled}
            >
              {t('Output')}
            </Button>
          )}
        </CardBody>
        {data.bubble && (
          <div
            className="position-absolute"
            style={{
              top: '10px',
              right: '10px',
            }}
          >
            <Badge color="danger" className="badge-glow">
              {data.bubble}
            </Badge>
          </div>
        )}
      </Card>
      <ModalComponent
        open={show}
        toggle={toggle}
        title={data.name}
        scrollable
        Body={
          <>
            <div className="d-flex justify-content-between mb-1">
              <h4 className="mb-1">
                {t('Clients')}: {clientSelected.length}
              </h4>
              <div className="d-flex gap-1">
                {data?.keywordLimit && (
                  <div>
                    <Label className="form-label" for="keyword_limit">
                      {t('Keyword limit')}
                    </Label>

                    <Input
                      type="number"
                      id="keyword_limit"
                      value={keywordLimit}
                      onChange={onChangeKeywordLimit}
                      min={1}
                      required
                    />
                  </div>
                )}
                {data?.dateRange && (
                  <div className="d-flex flex-column ">
                    <Label className="form-label">
                      {t('Data fetching duration')}
                    </Label>
                    <DatePickerComponent
                      datePicker={datePicker}
                      setDatePicker={setDatePicker}
                    />
                  </div>
                )}
                {data?.month && (
                  <div>
                    <DateTimeField
                      id="month_picker"
                      label={t('Month')}
                      options={{
                        altInput: true,
                        altFormat: 'F, Y',
                        dateFormat: 'Y-m-d',
                      }}
                      value={monthPicker}
                      onChange={date => setMonthPicker(date)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap mb-1">
              {clientSelected.length > 0 && renderClientSelected()}
            </div>
            <ClientPage isPage={false} hideExport />
          </>
        }
        Footer={
          <div className="d-flex gap-1">
            <Button.Ripple color="secondary" outline onClick={toggle}>
              {t('Cancel')}
            </Button.Ripple>

            <SpinnerButton
              color="relief-primary"
              onClick={onSubmit}
              disabled={rowSelects.length === 0}
              text={t('Output')}
              loading={loading}
            />
          </div>
        }
      />
    </>
  )
}

export default CardReport
