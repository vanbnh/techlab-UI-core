import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const handleConfirmAlert = async ({
  cb,
  title = `Are you sure?`,
  text = `You won't be able to revert this!`,
  icon = 'warning',
  confirmButtonText = 'Yes, delete it!',
}) => {
  return await MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1',
    },
    buttonsStyling: false,
  }).then(function (result) {
    if (result.value) {
      cb()
    }
  })
}

export default handleConfirmAlert
