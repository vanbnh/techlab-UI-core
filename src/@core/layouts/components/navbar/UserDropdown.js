// ** React Imports
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import {isUserLoggedIn} from '@utils'

// ** Store & Actions
import {useDispatch} from 'react-redux'
import {handleLogout} from '@store/authentication'

// ** Third Party Components
import {Lock, Power, User} from 'react-feather'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = ({setModalChangePassword, setModalEditInfo}) => {
  // ** Hooks ***
  const dispatch = useDispatch()
  const {t} = useTranslation()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={e => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(userData && userData['fullName']) || 'Admin'}
          </span>
          <span className="user-status mt-50">
            {t((userData && userData.role) || 'admin')}
          </span>
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem className="w-100" onClick={() => setModalEditInfo(true)}>
          <User size={14} className="me-75" />
          <span className="align-middle">{t('My profile')}</span>
        </DropdownItem>
        <DropdownItem
          className="w-100"
          onClick={() => setModalChangePassword(true)}
        >
          <Lock size={14} className="me-75" />
          <span className="align-middle">{t('Change Password')}</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">{t('Logout')}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
