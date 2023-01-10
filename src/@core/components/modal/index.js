import cn from 'classnames'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

const ModalComponent = ({
  open = false,
  toggle = () => {},
  title = '',
  Body = '',
  color = 'primary',
  className = '',
  size = 'lg',
  Footer = '',
  ...rest
}) => {
  return (
    <>
      <Modal
        isOpen={open}
        toggle={toggle}
        className={cn('modal-dialog-centered', className, {
          [`modal-${size}`]: size,
        })}
        modalClassName={`modal-${color}`}
        {...rest}
      >
        <ModalHeader toggle={toggle} className="fw-bolder">
          {title}
        </ModalHeader>
        <ModalBody>{Body}</ModalBody>
        {Footer && <ModalFooter>{Footer}</ModalFooter>}
      </Modal>
    </>
  )
}

export default ModalComponent
