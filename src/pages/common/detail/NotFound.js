import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Alert, Button} from 'reactstrap'

const NotFoundDetail = ({id, to}) => {
  const navigate = useNavigate()
  return (
    <>
      <Alert color="dark">
        <h4 className="alert-heading">Not Found</h4>
        <div className="alert-body">
          Can not find the detail you are looking for (id :{id}). Please try
          again later.
        </div>
      </Alert>
      <Button.Ripple color="secondary" outline onClick={() => navigate(to)}>
        Go back
      </Button.Ripple>
    </>
  )
}

export default NotFoundDetail
