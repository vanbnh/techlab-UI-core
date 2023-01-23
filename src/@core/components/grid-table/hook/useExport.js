import {useCallback, useRef} from 'react'
import saveAs from 'file-saver'
import {ArrowDownCircle} from 'react-feather'
import {useTranslation} from 'react-i18next'

export default function useExportGridTable({
  entries,
  onExport,
  isCustomExport,
}) {
  const {t} = useTranslation()
  const onSave = useCallback(
    workbook => {
      workbook.xlsx.writeBuffer().then(buffer => {
        saveAs(
          new Blob([buffer], {type: 'application/octet-stream'}),
          `${entries}.xlsx`,
        )
      })
    },
    [entries],
  )
  const exporterRef = useRef(null)
  const startExport = useCallback(
    options => {
      exporterRef.current.exportGrid(options)
    },
    [exporterRef],
  )

  const ExportButtonComponent = ({onToggle, buttonRef, ...restProps}) => (
    <div className="ms-2">
      <button
        ref={buttonRef}
        className="btn btn-warning btn-sm"
        onClick={() => {
          if (isCustomExport) {
            onExport()
          } else {
            onToggle()
          }
        }}
        {...restProps}
      >
        <ArrowDownCircle size={16} />
        <span className="align-middle ms-25">{t('Export')}</span>
      </button>
    </div>
  )
  const exportMessages = {
    exportAll: t('Export All'),
    exportSelected: t('Export selected rows'),
  }

  return {
    exporterRef,
    onSave,
    startExport,
    ExportButtonComponent,
    exportMessages,
  }
}
