import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../Components/MasterLayout/LazyLoader'
const ForgetPassword = lazy(()=>import('../Components/ForgetPassword'))

const ForgetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPassword />
      </Suspense>
    </Fragment>
  )
}

export default ForgetPasswordPage