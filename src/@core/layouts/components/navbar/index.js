// ** React Imports
import {useState} from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import ModalComponent from '../../../components/modal'
import {useTranslation} from 'react-i18next'
import ChangePasswordForm from '../../../../pages/auth/change-password'

const ThemeNavbar = props => {
  const {t} = useTranslation()
  // ** Props
  const {skin, setSkin, setMenuVisibility} = props

  // *** State ***
  const [modalChangePassword, setModalChangePassword] = useState(false)

  return (
    <>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser
        skin={skin}
        setSkin={setSkin}
        setModalChangePassword={setModalChangePassword}
      />
      <ModalComponent
        open={modalChangePassword}
        toggle={() => setModalChangePassword(false)}
        title={t('Change Password')}
        size="sm"
        Body={
          <ChangePasswordForm close={() => setModalChangePassword(false)} />
        }
      />
    </>
  )
}

export default ThemeNavbar
