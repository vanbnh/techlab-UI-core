import React from 'react'
import {X} from 'react-feather'
import {useTranslation} from 'react-i18next'
import {Button, Input, InputGroup, InputGroupText} from 'reactstrap'

const VersionDetail = ({
  versions,
  isShowCompare,
  onSetDataVersionCompare,
  onCancelCompare,
  versionSelect,
  setVersionSelect,
}) => {
  const {t} = useTranslation()

  return (
    <div className="d-flex justify-content-end align-items-center">
      {isShowCompare && versions.length > 0 && (
        <div className="d-flex gx-0 me-1">
          <Button
            color="relief-primary"
            className="me-50"
            size="sm"
            onClick={onSetDataVersionCompare}
          >
            {t('Compare with')} {versions[0]}
          </Button>
          <Button.Ripple
            className="btn-icon"
            size="sm"
            outline
            color="secondary"
            onClick={onCancelCompare}
          >
            <X size={16} />
          </Button.Ripple>
        </div>
      )}
      <div style={{maxWidth: '240px'}}>
        {versions.length > 0 && (
          <InputGroup>
            <InputGroupText>{t('version')}</InputGroupText>
            <Input
              type="select"
              name="version"
              id="version"
              value={versionSelect}
              onChange={e => setVersionSelect(e.target.value)}
            >
              {versions.map(v => (
                <option key={v}>{v}</option>
              ))}
            </Input>
          </InputGroup>
        )}
      </div>
    </div>
  )
}

export default VersionDetail
