import { API } from "../backend";
import axios from "axios";

export const signup = (user) => {
  return axios
    .post(`${API}/auth/signup`, user)
    .then((response) => {
      if (response.error) {
      }
      return response;
    })
    .catch((err) => {
      alert(err);
    });
};

export const donarsignup = (aadharno) => {
  return axios
    .post(
      `${API}/profile/becomeDonor/aadhar/validate`,
      { aadharNumber: aadharno },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("jwt"))
            .access_token,
        },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.error) {
      }
      return response;
    })
    .catch((err) => {
      alert(err);
    });
};

export const signin = (user) => {
  return axios
    .post(`${API}/auth/signin/email`, user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      alert(err);
    });
};

export const otpverification = (user) => {
  return axios
    .post(`${API}/auth/verify/signup`, user)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      alert(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));

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

    alert("logout sucessfull !!!");
  }
};
export const uploadAdhar = (image) => {
  const formData = new FormData();
  formData.append("file", image);
  console.log(image);
  const config = {
    headers: {
      "x-access-token": JSON.parse(localStorage.getItem("jwt")).access_token,
      "content-type": "multipart/form-data",
    },
  };
  return axios
    .put(`${API}/profile/becomeDonor/aadhar/upload`, formData, config)
    .then((response) => {
      alert(response.data);
      console.log(response.data);
      if (response.error) {
        alert(response.error);
      }
      return response;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};
