import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Row} from 'reactstrap'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import ModalComponent from '../../../@core/components/modal'
import {InputField} from '@src/@core/components/form-field'
import {EditorField} from '../../../@core/components/form-field'
import {useTranslation} from 'react-i18next'

const FormSchema = yup.object().shape({
  title: yup.string().required('Tiêu đề không được để trống'),
})

const ModalEditQuickNote = ({openModal, toggleModal, item, onSaveItem}) => {
  const {t} = useTranslation()
  // *** Hook Form
  const {
    reset,
    control,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        content: item.content,
      })
    }
  }, [item])

  const onSubmit = () => {
    const data = {...getValues()}
    const d = {...item, ...data}
    console.log(d)
    onSaveItem(d)
    toggleModal()
  }

  return (
    <ModalComponent
      open={openModal}
      toggle={toggleModal}
      title={t('Edit Quick Note')}
      scrollable
      Body={
        <>
          <Form>
            <Row>
              <Col sm="12" className="mb-1">
                <Controller
                  id={'title'}
                  name={'title'}
                  control={control}
                  render={({field}) => (
                    <InputField
                      name="title"
                      label={t('Title')}
                      required
                      invalid={errors['title'] && true}
                      feedback={errors['title'] && errors['title'].message}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm="12">
                <Controller
                  id={'content'}
                  name={'content'}
                  control={control}
                  render={({field}) => (
                    <EditorField
                      name="content"
                      label={t('Content')}
                      required
                      {...field}
                    />
                  )}
                />
              </Col>
            </Row>
          </Form>
        </>
      }
      Footer={
        <div className="d-flex justify-content-end mt-1">
          <Button
            color="secondary"
            outline
            className="me-50"
            onClick={() => toggleModal()}
          >
            {t('Cancel')}
          </Button>
          <Button color="relief-primary" onClick={onSubmit}>
            {t('Save')}
          </Button>
        </div>
      }
    />
  )
}

export default ModalEditQuickNote
