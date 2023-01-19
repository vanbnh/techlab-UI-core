// ** React Imports
import {Link} from 'react-router-dom'

// ** Reactstrap Imports
import {Button} from 'reactstrap'

// ** Custom Hooks
import {useSkin} from '@hooks/useSkin'

// ** Utils
import {getUserData, getHomeRouteForLoggedInUser} from '@utils'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/not-authorized.svg'
import illustrationsDark from '@src/assets/images/pages/not-authorized-dark.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import {getBrandLogo} from '../../../utility/Utils'
import {useTranslation} from 'react-i18next'

const NotAuthorized = () => {
  // ** Hooks
  const {skin} = useSkin()
  const {t} = useTranslation()

  // ** Vars
  const user = getUserData()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <img className="img-fluid" width="300" src={getBrandLogo()} />
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{t('You are not authorized')}! 🔐</h2>
          <Button
            tag={Link}
            color="primary"
            className="btn-sm-block mb-1"
            to={user ? getHomeRouteForLoggedInUser(user.role) : '/'}
          >
            Back to Home
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
