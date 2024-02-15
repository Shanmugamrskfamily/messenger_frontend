import axios from "axios";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper";
import {
  getToken,
  getUserDetails,
  removeSessions,
  setToken,
  setUserDetails,
} from "../Helper/SessionHelper";
import { hideLoader, showLoader } from "../Redux/State/SettingSlice";
import store from "../Redux/Store/Store";
import { setProfile } from "../Redux/State/ProfileSlice";
import { setsearchUsers } from "../Redux/State/ChatSlice";
import { socket } from "../Components/ChatBox";

// const BaseURL = "https://chat-app-mern-qfhu.onrender.com/api";
const BaseURL = "http://localhost:4051/api";
const AxiosHeader = { headers: { token: getToken() } };

export const RegistrationRequest = (firstname, lastname, email, password) => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/register`;
  let PostBody = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        SuccessToast("Registration Successful.");
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const LoginRequest = (email, password) => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/login`; 
  let PostBody = { email: email, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        setToken(res.data.token);
        setUserDetails(res.data.data);
        SuccessToast("Login Successful.");
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const Logout = async () => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/logout`;

  return await axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        socket.emit("logout", getUserDetails()._id);
        removeSessions();
        SuccessToast("Logout Successful.");
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      ErrorToast("Something Went Wrong");
      return false;
    });
};

export const ForgetPasswordRequest = (email) => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/forgotPassword`; 
  let PostBody = { email: email };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        SuccessToast(res.data);
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const ResetPasswordRequest = (password, resetToken) => {
  store.dispatch(showLoader());
  let PostBody = { password: password };
  let URL = `${BaseURL}/auth/resetPassword/${resetToken}`;
  return axios
    .put(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        SuccessToast(res.data);
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 401) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const ProfileDetailsRequest = () => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/profile/details`; 
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        store.dispatch(setProfile(res.data.data));
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const UpdateProfileRequest = async (fname, lname, photo) => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/updateProfile`; 
  let PostBody = { firstname: fname, lastname: lname, photo: photo };
  return await axios
    .put(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        SuccessToast("Profile Updated Successfully.");
        store.dispatch(setProfile(res.data.data));
        setUserDetails(res.data.data);
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const ChangePasswordRequest = (oldPass, newPass) => {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/auth/change/password`; 
  let PostBody = { oldPassword: oldPass, newPassword: newPass };
  return axios
    .put(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        SuccessToast(res.data);
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 401) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 403) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

export const searchUserRequest = async (search) => {
  let URL = `${BaseURL}/user?search=${search}`;
  return await axios
    .get(URL, AxiosHeader)
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setsearchUsers(res.data));
        return true;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      if (err.response.data.status === 400) {
        ErrorToast(err.response.data.message);
        return false;
      } else if (err.response.data.status === 404) {
        ErrorToast(err.response.data.message);
        return false;
      } else {
        ErrorToast("Something Went Wrong");
        return false;
      }
    });
};

