import { React, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { TextField, Button } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { API } from "../backend";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/navbar";

export default function Cart() {
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const card = () => {
    return (
      <div>
        <Card style={{ display: "flex", width: 1100, marginTop: 10 }}>
          <Card
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
              height: "50px",
            }}
          >
            Product
          </Card>

          <Card
            style={{
              width: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Description
          </Card>
        </Card>
        {cartItems.map((item, index) => (
          <Card style={{ display: "flex", width: 1100, marginTop: 10 }}>
            <Card sx={{ minWidth: 350 }}>
              <CardMedia
                style={{ margin: "13px", width: 250 }}
                component="img"
                height="100"
                image={item.image_path}
                alt="green iguana"
              />
            </Card>
            <Card
              style={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Typography component="div" variant="h6">
                {item.product_name}
              </Typography>
              <Typography component="p" variant="body2">
                product cost : {item.price}
              </Typography>
            </Card>

            <Card
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <IconButton
                onClick={() => {
                  cancelItem(item);
                }}
              >
                <CancelOutlinedIcon color="primary" />
              </IconButton>
            </Card>
            <Card
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Button
                onClick={() => {
                  addToCart(item);
                  cancelItem(item)
                }}
                color="primary"
              >
                Add to cart
              </Button>
            </Card>
          </Card>
        ))}
      </div>
    );
  };

  const fetchCart = () => {
    axios
      .get(`${API}/wishlist`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setcartItems(response.data.Items);
      })
      .catch(function (error) {
        console.log("responded");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.data.errorMessage);
          console.log("status " + error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received

          console.log("err request  " + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error

          console.log("Error", error);
        }
        throw error;
      });
  };

  const cancelItem = (item) => {
    console.log(item);
    axios
      .delete(`${API}/wishlist/delete`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        data: {
          wishlist_id: item.wishlist_id,
        },
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchCart();
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

  const addToCart = (product) => {
    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      product_id: product.product_id,
      name: product.product_name,
      desc: product.desc,
      price: product.price,
      image_path: product.image_path,
    };
    axios
      .post(`${API}/cart/add`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchCart();
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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Navbar />
      {cartItems.length > 0 && (
        <div
          style={{
            margin: "150px auto",
            display: "flex",
            flexDirection: "column",
            // justifyContent : "center"
          }}
        >
          <ToastContainer />

          {card()}
        </div>
      )}

      {cartItems.length === 0 && (
        <div
          style={{
            marginLeft: "250px",
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>feels soo light😭😭 add something to Wishlist</h1>
        </div>
      )}
    </div>
  );
}
