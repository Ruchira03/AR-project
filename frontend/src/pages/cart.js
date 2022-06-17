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

  const addQuantity = (item) => {
    const data = {
      current_quantity: item.quantity,
      product_id: item.product_id,
      cart_id: item.cart_id,
    };
    return axios
      .put(`${API}/cart/product/quantity/add`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
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

  const subtractQuantity = (item) => {
    const data = {
      current_quantity: item.quantity,
      product_id: item.product_id,
      cart_id: item.cart_id,
    };
    return axios
      .put(`${API}/cart/product/quantity/subtract`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
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
              width: 300,
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
          <Card
            style={{
              width: 250,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Quantity
          </Card>
          <Card
            style={{
              width: 100,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Remove
          </Card>
          <Card
            style={{
              display: "flex",
              width: 250,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Total Price
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
                {item.name}
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
                  subtractQuantity(item);
                }}
              >
                <RemoveIcon color="primary" />
              </IconButton>
              <h2
                style={{ width: "55px", paddingLeft: "15px" }}
                variant="outlined"
              >
                {item.quantity}
              </h2>

              <IconButton
                onClick={() => {
                  addQuantity(item);
                }}
              >
                <AddIcon color="primary" />
              </IconButton>
            </Card>
            <Card
              style={{
                width: 100,
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
                display: "flex",
                width: 250,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Typography
                component="div"
                variant="h6"
                // onChange={settotal(total + quantities[index] * item.price)}
              >
                {item.quantity * item.price} ₹
              </Typography>
            </Card>
          </Card>
        ))}
      </div>
    );
  };

  const fetchCart = () => {
    const user_id = JSON.parse(localStorage.getItem("jwt")).userData.user_id;
    axios
      .get(`${API}/cart/${user_id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setcartItems(response.data.Items);
        localStorage.setItem("qty", response.data.Items.length);
        localStorage.setItem("cart", JSON.stringify(response.data.Items));
      })
      .catch(function (error) {
        console.log("responded");
        if (error.response) {
          // Request made and server responded
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
    axios
      .delete(`${API}/cart/delete`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        data: {
          cart_id: item.cart_id,
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

  const placeorder = () => {
    cartItems.map((item, index) => {
      const body = {
        user_id: item.user_id,
        product_id: item.product_id,
        name: item.name,
        desc: item.desc,
        price: item.price,
        image_path: item.image_path,
        quantity: item.quantity,
        cart_id: item.cart_id,
      };
      axios
        .post(`${API}/placeorder`, body, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });

          fetchCart();
          fetchallorders();
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
    });
  };

  const fetchallorders = () => {
    const StatusReq = "Pending";
    axios
      .get(`${API}/order/status/${StatusReq}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        localStorage.setItem("order", response.data.Orders.length);
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

          <Card
            style={{
              display: "flex",
              width: 240,
              height: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 870,
              marginTop: 10,
            }}
          >
            <Typography component="div" variant="h6">
              {cartItems.reduce(
                (total, item, index) => total + item.price * item.quantity,
                0
              )}
            </Typography>
          </Card>
          <Card
            style={{
              display: "flex",
              width: 240,
              height: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 870,
              marginTop: 10,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={placeorder}
              style={{ backgroundColor: "#03B48C" }}
            >
              <Typography
                component="div"
                variant="h6"
                style={{ color: "#ffffff", fontWeight: "700" }}
              >
                Place Order
              </Typography>
            </Button>
          </Card>
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
          <h1>feels soo light😭😭 add something to cart</h1>
        </div>
      )}
    </div>
  );
}
