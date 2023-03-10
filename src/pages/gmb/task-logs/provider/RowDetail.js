import React, {useEffect, useState} from 'react'
import {toast} from 'react-hot-toast'
import {useCopyToClipboard} from 'react-use'
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from 'reactstrap'
import Prism from 'prismjs'
import {useTranslation} from 'react-i18next'

const CoppyText = ({copied, setCopied, value}) => {
  const [_, copyToClipboard] = useCopyToClipboard()
  const {t} = useTranslation()

  const onCopy = () => {
    copyToClipboard(value)
    setCopied()
    toast.success(`Copied to clipboard`)
  }

  return (
    <CardSubtitle>
      <button
        type="button"
        onClick={onCopy}
        className={`cursor-pointer text-decoration-underline border-0 bg-transparent text-${
          copied ? 'success' : 'info'
        }`}
      >
        {t(copied ? 'Copied' : 'Copy')}
      </button>
    </CardSubtitle>
  )
}

const TableRowDetailMonitoringTaskLog = ({row}) => {
  const [copied, setCopied] = useState('')
  const {t} = useTranslation()

  const inputs = Object.keys(row.task_input) || []
  const results = Object.keys(row.task_result) || []
  const errors = row.task_errors || []

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="row-detail">
      {inputs.length > 0 && (
        <Card className="card-snippet">
          <CardHeader>
            <CardTitle tag="h4">{t('Inputs')}</CardTitle>
            <CoppyText
              value={JSON.stringify(row.task_input, null, 2)}
              title="Inputs"
              copied={copied === 'input'}
              setCopied={() => setCopied('input')}
            />
          </CardHeader>
          <CardBody>
            <pre>
              <code className="language-json">
                {JSON.stringify(row.task_input, null, 2)}
              </code>
            </pre>
          </CardBody>
        </Card>
      )}
      {results.length > 0 && (
        <Card className="card-snippet">
          <CardHeader>
            <CardTitle tag="h4">{t('Results')}</CardTitle>
            <CoppyText
              value={JSON.stringify(row.task_result, null, 2)}
              title="Results"
              copied={copied === 'result'}
              setCopied={() => setCopied('result')}
            />
          </CardHeader>
          <CardBody>
            <pre>
              <code className="language-json">
                {JSON.stringify(row.task_result, null, 2)}
              </code>
            </pre>
          </CardBody>
        </Card>
      )}
      {errors.length > 0 && (
        <Card className="card-snippet">
          <CardHeader>
            <CardTitle tag="h4">{t('Errors')}</CardTitle>
            <CoppyText
              value={JSON.stringify(row.task_errors, null, 2)}
              title="Errors"
              copied={copied === 'error'}
              setCopied={() => setCopied('error')}
            />
          </CardHeader>
          <CardBody>
            {row.task_errors.map(err => (
              <div key={err.content}>
                <pre>
                  <code className="language-json">
                    {JSON.stringify(err, null, 2)}
                  </code>
                </pre>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default TableRowDetailMonitoringTaskLog
