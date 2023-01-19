/* eslint-disable react/no-unescaped-entities */
// ** React Imports
import {Link} from 'react-router-dom'

// ** Reactstrap Imports
import {Button, Col, Form, Input, Row} from 'reactstrap'

// ** Custom Hooks
import {useSkin} from '@hooks/useSkin'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/not-authorized.svg'
import illustrationsDark from '@src/assets/images/pages/not-authorized-dark.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import {getBrandLogo} from '../../../utility/Utils'
import {useTranslation} from 'react-i18next'

const Maintenance = () => {
  // ** Hooks
  const {skin} = useSkin()
  const {t} = useTranslation()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <img className="img-fluid" width="300" src={getBrandLogo()} />
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{t('Under Maintenance')} 🛠</h2>
          <p className="mb-3">
            {t(
              "Sorry for the inconvenience but we're performing some maintenance at the moment",
            )}
          </p>
          <Form
            tag={Row}
            onSubmit={e => e.preventDefault()}
            className="row-cols-md-auto justify-content-center align-items-center m-0 mb-2 gx-3"
          >
            <Col sm="12" className="m-0 mb-1">
              <Input placeholder="Email..." />
            </Col>
            <Col sm="12" className="d-md-block d-grid ps-md-0 ps-auto">
              <Button className="mb-1 btn-sm-block" color="primary">
                {t('Notify')}
              </Button>
            </Col>
          </Form>
          <Button tag={Link} to="/" color="primary" className="mb-2" outline>
            {t('Back to home')}
          </Button>
          <img
            className="img-fluid"
            src={source}
            alt="Under maintenance page"
          />
        </div>
      </div>
    </div>
  )
}
export default Maintenance
