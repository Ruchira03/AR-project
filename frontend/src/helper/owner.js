import { API } from "../backend";
import axios from "axios";
import { toast } from "react-toastify";

export const addproduct = (product, image) => {
  console.log(product.name);
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("desc", product.desc);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("category_id", product.category_id);
  formData.append("file", image);

  return axios
    .post(
      `${API}/product/add`,
      formData,

      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch(function (error) {
      console.log("responded");
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
        console.log("Error", error);
      }
      throw error;
    });
};

export const getcategory = () => {
  return axios
    .get(`${API}/categories`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("categories", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("responded");
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
        console.log("Error", error);
      }
      throw error;
    });
};

export const getproductlist = () => {
  return axios
    .get(`${API}/products`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("products", JSON.stringify(response.data.products));
    })
    .catch(function (error) {
      console.log("responded");
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
        console.log("Error", error);
      }
      throw error;
    });
};

export const deleteProduct = (id) => {
  return axios
    .delete(`${API}/product/delete`, {
      product_id: id,

      headers: {
        "x-access-token": localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data.message);
      toast.success("sucess", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
    .catch(function (error) {
      console.log("responded");
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
        console.log("Error", error);
      }
      throw error;
    });
};
