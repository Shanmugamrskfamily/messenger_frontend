import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { getToken } from '../Helper/SessionHelper';

const NotFoundPage = () => {
    return (
        <Fragment>
            <section className="bg-white h-full">
                <div className="p-8 m-auto max-h-screen max-w-screen-xl">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <img src="/home.png" alt="chat2swastic-home" style={{width:"26rem"}}/>
                        {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1> */}
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-xl mt-2">Welcome to New Era of messaging <br />Secure System Messaging</p>
                        <p className="mb-4 text-lg font-light text-gray-600">This MessengerApp is powerful than any other application. you can enjoy free chat anytime and forever. </p>
                        <Link to={getToken()? '/chat' : '/'} className="inline-flex text-white bg-[#6c2fa8] hover:bg-[#9333ea] focus:ring-4 focus:outline-none focus:ring-[#a855f7] font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</Link>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default NotFoundPage
