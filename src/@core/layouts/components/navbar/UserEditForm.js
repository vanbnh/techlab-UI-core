import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Row} from 'reactstrap'
import {useTranslation} from 'react-i18next'
import {InputField} from '../../../components/form-field'
import SpinnerButton from '../../../components/spinner-button'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useState} from 'react'

const UserEditForm = ({closeModal, userData, updateUser}) => {
  // *** Hook ***
  const {t} = useTranslation()

  const {user_id, name, email, phone, employee_id, chatwork_id, s3_access_key} =
    userData

  const INITIALSTATE = {
    name,
    email,
    phone,
    employee_id,
    chatwork_id,
    s3_access_key,
  }

  const FormSchema = yup.object().shape({
    email: yup.string().email(t('Email is invalid')),
  })

  // *** Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
    defaultValues: INITIALSTATE,
  })

  // *** STATE ***
  const [loading, setLoading] = useState(false)

  const onSubmit = async data => {
    setLoading(true)
    try {
      const res = await axios
        .put(`/user-info/${user_id}/`, data)
        .then(r => r.data)
      if (res?.user_id) {
        toast.success(t('User has been updated'))
        updateUser({...userData, ...res})
        closeModal()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(t('Update user failed'))
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Controller
              id={'name'}
              name={'name'}
              control={control}
              render={({field}) => (
                <InputField
                  name="name"
                  type="name"
                  label={t('Fullname')}
                  {...field}
                />
              )}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Controller
              id={'email'}
              name={'email'}
              control={control}
              render={({field}) => (
                <InputField
                  name="email"
                  type="email"
                  label={t('Email')}
                  invalid={errors['email'] && true}
                  feedback={errors['email'] && errors['email'].message}
                  {...field}
                />
              )}
            />
          </Col>

          <Col md="6" className="mb-1">
            <Controller
              id={'phone'}
              name={'phone'}
              control={control}
              render={({field}) => (
                <InputField
                  name="phone"
                  type="phone"
                  label={t('Phone Number')}
                  {...field}
                />
              )}
            />
          </Col>

          <Col md={6} className="mb-1">
            <Controller
              id={'chatwork_id'}
              name={'chatwork_id'}
              control={control}
              render={({field}) => (
                <InputField name="chatwork_id" label="Chatwork ID" {...field} />
              )}
            />
          </Col>
          <Col md={6} className="mb-1">
            <Controller
              id={'employee_id'}
              name={'employee_id'}
              control={control}
              render={({field}) => (
                <InputField
                  name="employee_id"
                  label={t('Employee ID')}
                  {...field}
                />
              )}
            />
          </Col>
          <Col md={6} className="mb-1">
            <Controller
              id={'s3_access_key'}
              name={'s3_access_key'}
              control={control}
              render={({field}) => (
                <InputField
                  name="s3_access_key"
                  label={t('S3 Access Key')}
                  {...field}
                />
              )}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end gap-1">
          <Button color="secondary" outline onClick={closeModal}>
            {t('Cancel')}
          </Button>

          <SpinnerButton
            loading={loading}
            type="submit"
            text={t('Save')}
            color={'relief-primary'}
          />
        </div>
      </Form>
    </>
  )
}

export default UserEditForm
