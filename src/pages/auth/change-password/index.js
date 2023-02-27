import React, {useState} from 'react'
import {Col, Form, Row} from 'reactstrap'

import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import InputPasswordToggle from '@src/@core/components/input-password-toggle'
import toast from 'react-hot-toast'
import axios from 'axios'
import SpinnerButton from '../../../@core/components/spinner-button'
import {useTranslation} from 'react-i18next'

const ChangePasswordForm = ({close = () => {}}) => {
  // *** State ***
  const {t} = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  // const {userData} = useSelector(state => state.auth)

  const FormSchema = yup.object().shape({
    oldpass: yup.string().required(t('Password is required')),
    newpass: yup
      .string()
      .min(8, t('Password must be at least 8 characters'))
      .max(50, t('Password must be at most 50 characters'))
      .required(t('Password is required')),
    verifyPassword: yup
      .string()
      .oneOf([yup.ref('newpass'), null], t('Passwords must match')),
  })

  // *** Hook Form
  const {
    reset,
    control,
    watch,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
  })
  const onSubmit = async values => {
    if (values.newpass !== values.verifyPassword)
      return toast.error('New password does not match')
    try {
      setIsLoading(true)
      const {newpass, oldpass} = values
      const data = {new_password: newpass, old_password: oldpass}
      const response = await axios.post(`/change-password/`, data)
      if (response.status === 200) {
        toast.success('Password has been changed')
        reset()
        close()
      }

      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm="12" className="mb-1">
            <Controller
              id={'oldpass'}
              name={'oldpass'}
              control={control}
              render={({field}) => (
                <InputPasswordToggle
                  label={t('Old Password')}
                  className="input-group-merge"
                  required
                  invalid={errors.oldpass && true}
                  feedback={errors['oldpass'] && errors['oldpass'].message}
                  {...field}
                />
              )}
            />
          </Col>
          <Col sm="12" className="mb-1">
            <Controller
              id={'newpass'}
              name={'newpass'}
              control={control}
              render={({field}) => (
                <InputPasswordToggle
                  label={t('New Password')}
                  className="input-group-merge"
                  required
                  invalid={errors.newpass && true}
                  feedback={errors['newpass'] && errors['newpass'].message}
                  {...field}
                />
              )}
            />
          </Col>
          <Col sm="12" className="mb-1">
            <Controller
              id={'verifyPassword'}
              name={'verifyPassword'}
              control={control}
              render={({field}) => (
                <InputPasswordToggle
                  label={t('Verify Password')}
                  className="input-group-merge"
                  required
                  invalid={errors.verifyPassword && true}
                  feedback={
                    errors['verifyPassword'] && errors['verifyPassword'].message
                  }
                  {...field}
                />
              )}
            />
          </Col>
          <Col xs={12}>
            <p className="fw-bolder">{t('Password requirements')}:</p>
            <ul className="ps-1 ms-25">
              <li className="mb-50">
                {t('Minimum 8 characters long - the more, the better')}
              </li>
              <li className="mb-50">{t('At least one lowercase character')}</li>
              <li>
                {t('At least one number, symbol, or whitespace character')}
              </li>
            </ul>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <SpinnerButton
            loading={isLoading}
            isWizard
            type="submit"
            text={t('Submit')}
            color={'relief-primary'}
            size="sm"
          />
        </div>
      </Form>
    </>
  )
}

export default ChangePasswordForm
