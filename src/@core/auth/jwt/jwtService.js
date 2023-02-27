import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

import {PROXY} from '../../../configs/proxy'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = {...jwtDefaultConfig}

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig}
    this.countRefresh = 0

    axios.defaults.baseURL = PROXY

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${
            this.jwtConfig.tokenType
          } ${JSON.parse(accessToken)}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const {config, response} = error
        const originalRequest = config

        if (
          response &&
          response.status === 401 &&
          !response.request.responseURL.includes('/login/') &&
          this.countRefresh < 1 &&
          response.data?.status !== 'denied'
        ) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.countRefresh += 1
              this.isAlreadyFetchingAccessToken = false
              // ** Update accessToken in localStorage
              this.setToken(JSON.stringify(r.data.access))
              this.setRefreshToken(JSON.stringify(r.data.refresh))
              this.onAccessTokenFetched(r.data.access)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(axios(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback =>
      callback(accessToken),
    )
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refresh: JSON.parse(this.getRefreshToken()),
    })
  }
}
