import { Fragment } from 'react';
import './App.css';
import ChatPage from './Pages/ChatPage';
import RegistrationPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import FullscreenLoader from './Components/MasterLayout/FullScreenLoader';
import { Toaster } from 'react-hot-toast';
import { getToken } from './Helper/SessionHelper';

function App() {
  if(getToken()){
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path='/chat' element={<ChatPage />}/>
            <Route exact path='*' element={<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
        <Toaster position="top-right" reverseOrder={false}/>
      </Fragment>
    );
  }else{
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/register' element={<RegistrationPage />} />
          <Route exact path='/forgetPassword' element={<ForgetPasswordPage />} />
          <Route exact path='/resetPassword/:token' element={<ResetPasswordPage />} />
          <Route exact path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <FullscreenLoader />
      <Toaster position="top-right" reverseOrder={false} />
    </Fragment>
  );
  }
}

export default App;
