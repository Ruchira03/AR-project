import { API } from "../backend";
import axios from "axios";
import { toast } from "react-toastify";
export const signup = (user) => {
  return axios
    .post(`${API}/auth/signup`, user)
    .then((response) => {
      console.log("response" + response);
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        toast.error(error.response.data.errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error.response.data.errorMessage);
        console.log("status " + error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(error.request, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("err request  " + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Error", error.message);
      }
      // return error;
    });
};

export const signin = (user) => {
  return axios
    .post(`${API}/auth/signin/email`, user)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response);
        console.log(error.response.data);
        toast.error(error.response.data.errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error.response.data.errorMessage);
        console.log("status " + error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(error.request, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("err request  " + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Error", error.message);
      }
    });
};

export const ownersignin = (user) => {
  return axios
    .post(`${API}/auth/owner/signin`, user)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response);
        console.log(error.response.data);
        toast.error(error.response.data.errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error.response.data.errorMessage);
        console.log("status " + error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(error.request, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("err request  " + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Error", error.message);
      }
    });
};

export const otpverification = (user) => {
  return axios
    .post(`${API}/auth/verify/signup`, user)
    .then((response) => {
      console.log("hyyy " + response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        console.log(error.response);
        console.log(error.response.data.errorMessage);
        console.log("status " + error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(error.request, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("err request  " + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error

        console.log("Error", error.message);
      }
     // return error;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("jwt", JSON.stringify(data));
    toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
    next();
  } else {
    console.log("check here in authetinccate in auth.js");
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = () => {
  console.log("signout called");
  if (typeof window != "undefined") {
    localStorage.clear();

    toast.error("logout", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
