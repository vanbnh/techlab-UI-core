import axios from 'axios'
import moment from 'moment'
import {useRef, useState} from 'react'
import {File, Send} from 'react-feather'
import {toast} from 'react-hot-toast'
import {useTranslation} from 'react-i18next'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Input,
  InputGroup,
} from 'reactstrap'
import SpinnerButton from '../../../../../@core/components/spinner-button'

const validateFileName = fileName => {
  const err = 'Invalid file name, please use the format YYYY-MM-DD-HH_'
  if (!fileName) return ''
  const regex = /^(\d{4}-\d{2}-\d{2}-\d{2})_/ // Matches YYYY-MM-DD-HH followed by an underscore
  const match = fileName.match(regex)

  if (match) {
    const date = match[1] // Extract the matched portion of the string
    if (moment(date, 'YYYY-MM-DD-HH').isValid()) {
      return ''
    }
  }

  return err
}

const CardReport = ({data}) => {
  // *** HOOKS ***
  const {t, i18n} = useTranslation()
  const language = i18n.language

  // *** STATE ***
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const invalidMsg = validateFileName(file?.name)

  const onChangeFile = e => {
    if (!loading) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async () => {
    const {modelType, uploadType} = data
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model_type', modelType)
      formData.append('upload_type', uploadType)
      await axios.post('/file-upload/', formData)
      toast.success(t(`Upload Successfull`))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(t(`Upload Failed`))
    }
    setFile(null)
    document.getElementById(data.key).value = ''
  }

  return (
    <>
      <Card style={{minHeight: '245px'}}>
        <CardBody className="text-center">
          <data.icon className="font-large-2 mb-1" />
          <CardTitle tag="h5">{data[`name_${language}`]}</CardTitle>
          <CardText>{data[`description_${language}`]}</CardText>
          <div>
            <InputGroup hidden={!file}>
              <Button
                color="primary"
                outline
                onClick={() => fileRef?.current?.click()}
              >
                <File size={14} />
              </Button>
              <Input
                type="text"
                id={data.key}
                name={data.key}
                value={file?.name}
                readOnly
              />
              <SpinnerButton
                loading={loading}
                text={<Send size={14} />}
                hasIcon={false}
                disabled={invalidMsg || !file}
                color={data.color}
                onClick={onSubmit}
              />
            </InputGroup>
            {!file && (
              <Button.Ripple
                color="relief-primary"
                onClick={() => fileRef?.current?.click()}
              >
                {t('Choose File')}
              </Button.Ripple>
            )}
            {invalidMsg && (
              <div className="text-danger text-start mt-50">
                {t(invalidMsg)}
              </div>
            )}
            <input
              type="file"
              hidden
              ref={fileRef}
              accept=".xlsx,.xls,.csv"
              onChange={onChangeFile}
            />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default CardReport
