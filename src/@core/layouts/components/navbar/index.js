// ** React Imports
import {useState} from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import ModalComponent from '../../../components/modal'
import {useTranslation} from 'react-i18next'
import ChangePasswordForm from '../../../../pages/auth/change-password'
import UserEditForm from './UserEditForm'
import {useDispatch, useSelector} from 'react-redux'
import {useQuery} from 'react-query'
import axios from 'axios'
import {handleGetUserData} from '../../../../redux/authentication'

const ThemeNavbar = props => {
  const {t} = useTranslation()
  // ** Props
  const {skin, setSkin, setMenuVisibility} = props

  // *** Selector ***
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.auth)

  const dispatchUpdateUserData = d => dispatch(handleGetUserData(d))

  // *** GET CURRENT USER DATA
  useQuery(
    ['GET_CURRENT_USER', userData?.user_id],
    async () => await axios.get('/current-user/').then(r => r.data),
    {
      onSuccess: data => {
        dispatchUpdateUserData({...userData, ...data})
      },
      enabled: !!userData,
    },
  )

  // *** State ***
  const [modalChangePassword, setModalChangePassword] = useState(false)
  const [modalEditInfo, setModalEditInfo] = useState(false)

  if (!userData) return null

  return (
    <>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser
        skin={skin}
        setSkin={setSkin}
        setModalChangePassword={setModalChangePassword}
        setModalEditInfo={setModalEditInfo}
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
      <ModalComponent
        open={modalEditInfo}
        toggle={() => setModalEditInfo(false)}
        title={t('My profile')}
        size="xl"
        Body={
          <UserEditForm
            closeModal={() => setModalEditInfo(false)}
            userData={userData}
            updateUser={dispatchUpdateUserData}
          />
        }
      />
    </>
  )
}

export default ThemeNavbar
