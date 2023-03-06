// ** React Imports
import {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

// ** Custom Hooks
import {useSkin} from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import {useDispatch} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'

// ** Actions
import {handleLogin} from '@store/authentication'

// ** Context
import {AbilityContext} from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import {getHomeRouteForLoggedInUser} from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  Spinner,
} from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import {getAvatarBlank, getBrandLogo} from '../../../utility/Utils'
import {useTranslation} from 'react-i18next'
import {toast} from 'react-hot-toast'
const defaultValues = {
  username: '',
  password: '',
}

const LoginPage = () => {
  // ** Hooks
  const {skin} = useSkin()
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues})

  const [isLoading, setIsLoading] = useState(false)
  const [userLogin, setUserLogin] = useState(null)

  useEffect(() => {
    if (userLogin) {
      navigate(getHomeRouteForLoggedInUser(userLogin.role))
    }
  }, [userLogin])

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setIsLoading(true)
      useJwt
        .login({username: data.username, password: data.password})
        .then(res => {
          const user = res.data
          const userData = {
            // ...user,
            role: 'admin',
            fullName:
              user?.first_name && user?.last_name
                ? `${user?.first_name} ${user?.last_name}`
                : user?.username || 'Admin',
            avatar: getAvatarBlank(),
            ability: [
              {
                action: 'manage',
                subject: 'all',
              },
            ],
            accessToken: user.access,
            refreshToken: user.refresh,
          }
          dispatch(handleLogin(userData))
          ability.update(userData.ability)
          setIsLoading(false)
          setUserLogin(userData)
        })
        .catch(err => {
          setIsLoading(false)
          toast.error(t('Login failed'))
        })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          })
        }
      }
    }
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={e => e.preventDefault()}>
          <img className="img-fluid" width="300" src={getBrandLogo()} />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              {t('Welcome!')}
            </CardTitle>
            <CardText className="mb-2">
              {t('Insert your email and password to login!')}
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  {t('Username')}
                </Label>
                <Controller
                  id="username"
                  name="username"
                  control={control}
                  render={({field}) => (
                    <Input
                      autoFocus
                      invalid={errors.username && true}
                      {...field}
                    />
                  )}
                />
                {errors.username && (
                  <FormFeedback>{errors.username.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    {t('Password')}
                  </Label>
                  {/* <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({field}) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  {t('Remember Me')}
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                {isLoading ? (
                  <>
                    <Spinner color="white" size="sm" />
                    <span className="ms-50">{t('Loading...')}</span>
                  </>
                ) : (
                  t('Sign In')
                )}
              </Button>
            </Form>
            {/* <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
