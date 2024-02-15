import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../Components/MasterLayout/LazyLoader'
const ResetPassword = lazy(()=>import('../Components/ResetPassword'))

const ResetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <ResetPassword />
      </Suspense>
    </Fragment>
  )
}

export default ResetPasswordPage