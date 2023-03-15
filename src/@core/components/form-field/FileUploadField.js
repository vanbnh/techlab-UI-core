import {useState} from 'react'

// ** Reactstrap Imports
import {Button, ListGroup, ListGroupItem, Label} from 'reactstrap'

// ** Third Party Imports
import toast from 'react-hot-toast'
import {useDropzone} from 'react-dropzone'
import {X, DownloadCloud, Eye} from 'react-feather'
import Lightbox from 'react-image-lightbox'
import {uploadImage} from 'utility/Utils'

// ** Styles
import 'react-image-lightbox/style.css'
import '@core/scss/react/libs/file-uploader/file-uploader.scss'
import {PROXY_UPLOAD_IMAGE} from 'configs/proxy'

const FileUploadField = ({
  name,
  id,
  label,
  required,
  multiple,
  accept = 'image/*',
  maxFiles = 100,
  maxSize = 1048576 * 10,
  value: files = [],
  onChange: setFiles = () => {},
  height = '300px',
  isShow = true,
  ...rest
}) => {
  const listImages = files.length > 0 ? files.map(f => f.url) : []

  // ** State
  const [isOpenLb, setIsOpenLb] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const {getRootProps, getInputProps} = useDropzone({
    multiple,
    accept,
    maxFiles,
    maxSize,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error('You can only upload image Files!.')
      } else {
        const response = await uploadImage(acceptedFiles[0], true)

        if (response.content) {
          const name = response.content
          if (multiple) {
            setFiles([
              ...files,
              {
                name,
                url: `${PROXY_UPLOAD_IMAGE}/${response.content}`,
              },
            ])
          } else {
            setFiles([
              {
                name,
                url: `${PROXY_UPLOAD_IMAGE}/${response.content}`,
              },
            ])
          }
        }
      }
    },
  })

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  // const renderFileSize = size => {
  //   if (Math.round(size / 100) / 10 > 1000) {
  //     return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
  //   } else {
  //     return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
  //   }
  // }

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">
          <div
            className="cursor-pointer"
            style={{width: '60px', height: '60px'}}
            onClick={() => {
              if (isShow) {
                setPhotoIndex(index)
                setIsOpenLb(status => !status)
              }
            }}
          >
            <img
              className="rounded w-100 h-100"
              alt={file.name}
              // src={file.url ? file.url : URL.createObjectURL(file)}
              src={file.url}
              style={{objectFit: 'cover'}}
            />
          </div>
        </div>
        <div>
          <div className="file-name mb-0 word-wrap text-nowrap">
            {file.name && file.name?.length > 20
              ? file.name?.slice(0, 20) + '...'
              : file.name}
          </div>
        </div>
      </div>
      <div className="d-flex">
        {isShow && (
          <Button
            color="primary"
            outline
            size="sm"
            className="btn-icon me-1"
            onClick={() => {
              if (isShow) {
                setPhotoIndex(index)
                setIsOpenLb(status => !status)
              }
            }}
          >
            <Eye size={14} />
          </Button>
        )}
        <Button
          color="danger"
          outline
          size="sm"
          className="btn-icon"
          onClick={() => handleRemoveFile(file)}
        >
          <X size={14} />
        </Button>
      </div>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      {label && (
        <Label className="form-label fw-bolder">
          {label}{' '}
          {required && (
            <sup
              style={{
                color: '#FF0000',
                fontSize: '1rem',
                top: '0',
              }}
            >
              *
            </sup>
          )}
        </Label>
      )}
      <div
        {...getRootProps({className: 'dropzone', style: {maxHeight: height}})}
      >
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Tải ảnh lên</h5>
          <p className="text-secondary">
            Kéo thả hình ảnh lên hoặc{' '}
            <a href="/" onClick={e => e.preventDefault()}>
              chọn
            </a>{' '}
            từ máy của bạn
          </p>
        </div>
      </div>

      {files.length ? (
        <>
          <ListGroup className="my-2">{fileList}</ListGroup>

          {multiple && (
            <div className="d-flex justify-content-end">
              <Button
                className="me-1"
                color="danger"
                outline
                onClick={handleRemoveAllFiles}
              >
                Xóa tất cả
              </Button>
              {/* <Button color="primary">Upload Files</Button> */}
            </div>
          )}
        </>
      ) : null}
      {isOpenLb && (
        <Lightbox
          mainSrc={listImages.length > 0 && listImages[photoIndex]}
          nextSrc={
            listImages.length > 0 &&
            listImages[(photoIndex + 1) % listImages.length]
          }
          prevSrc={
            listImages.length > 0 &&
            listImages[(photoIndex + listImages.length - 1) % listImages.length]
          }
          onCloseRequest={() => setIsOpenLb(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + listImages.length - 1) % listImages.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % listImages.length)
          }
        />
      )}
    </>
  )
}

export default FileUploadField
