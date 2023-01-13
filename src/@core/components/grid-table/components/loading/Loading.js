import * as React from 'react'
import {Loader} from 'react-feather'
import './Loading.css'

const LoadingGridTable = () => (
  <div className="loading-shading">
    <div className="loading-icon">
      <Loader size={30} />
    </div>
  </div>
)
export default LoadingGridTable
