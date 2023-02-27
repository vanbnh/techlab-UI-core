import jwtDecode from 'jwt-decode'
import React, {Suspense, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {handleLogout} from './redux/authentication'

// ** Router Import
import Router from './router/Router'

const App = () => {
  const dispatch = useDispatch()

  // ** Check token invalid or expired
  const refreshToken = localStorage.getItem('refreshToken')
  useEffect(() => {
    if (refreshToken && refreshToken !== 'undefined') {
      const decodedToken = jwtDecode(refreshToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(handleLogout())
      } else {
        // navigate('/dashboard');
      }
    }
  }, [refreshToken])

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
