import { React, useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { signout } from "../helper/Auth";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { Card, CardMedia, IconButton } from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../backend";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Order() {
  const [orderList, setorderList] = useState([]);

  useEffect(() => {
    fetchallorders();
  }, []);

  const handleChange = (e) => {
    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      status: e.target.value,
    };
    axios
      .post(`${API}/orderbystatus`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setorderList(response.data.Orders);
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

  const fetchallorders = () => {
    // const user_id = JSON.parse(localStorage.getItem("jwt")).userData.user_id;
    // axios
    //   .get(`${API}/order/${user_id}`, {
    //     headers: {
    //       "x-access-token": localStorage.getItem("token"),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data.Orders);
    //     setorderList(response.data.Orders);
    //   })
    //   .catch(function (error) {
    //     console.log("responded");
    //     if (error.response) {
    //       // Request made and server responded
    //       console.log(error.response.data);
    //       toast.error(error.response.data.errorMessage, {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       console.log(error.response.data.errorMessage);
    //       console.log("status " + error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       toast.error(error.request, {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       console.log("err request  " + error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       toast.error(error.message, {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       console.log("Error", error);
    //     }
    //     throw error;
    //   });

    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      status: "Pending",
    };
    axios
      .post(`${API}/orderbystatus`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setorderList(response.data.Orders);
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

  const deleteOrder = (order) => {
    axios
      .put(
        `${API}/order/cancel`,
        { order_id: order.order_id },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
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
  };

  const renderOrder = () => {
    return (
      <div>
        <Card style={{ display: "flex", width: 900, marginTop: 10 }}>
          <Card
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            Image
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
            Product Name
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
            Total amount
          </Card>
          <Card
            style={{
              width: 200,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            Status
          </Card>
          <Card
            style={{
              display: "flex",
              width: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <IconButton>Action</IconButton>
          </Card>
        </Card>
        {orderList.map((order, idx) => (
          <Card style={{ display: "flex", width: 900, marginTop: 10 }}>
            <Card
              style={{
                width: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <CardMedia
                style={{ width: 250 }}
                component="img"
                height="150"
                image={order.image_path}
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
              {order.name}
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
              {order.price * order.quantity}
            </Card>
            <Card
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              {order.status}
            </Card>
            {order.status == "Pending" && (
              <Card
                style={{
                  display: "flex",
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <IconButton
                  onClick={() => {
                    deleteOrder(order);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            )}
            {order.status != "Pending" && (
              <Card
                style={{
                  display: "flex",
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <IconButton
                  disabled
                  onClick={() => {
                    deleteOrder(order);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            )}
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <header>
        <div className="header-inner">
          <img src={logo} alt="logo" />
          <nav>
            <ul>
              <li>
                <a href="/userhomepage">About</a>
              </li>
              <li>
                <a href="/products">Discover</a>
              </li>
              <li>
                <a href="/cart">
                  <ShoppingCartRoundedIcon fontSize="small" />
                  Cart
                </a>
              </li>
              <li>
                <a href="/orders">Orders</a>
              </li>
              <li onClick={signout}>
                <a href="/">Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div
        style={{
          marginLeft: "50px",
          marginTop: "150px",
        }}
      >
        <ToastContainer />
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Search By Order Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <MenuItem value={"Cancelled"}>CANCELLED</MenuItem>
              <MenuItem value={"Pending"}>PENDING</MenuItem>
              <MenuItem value={"Successful"}>COMPLETED</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {orderList.length > 0 && (
        <div
          style={{
            marginLeft: "150px",
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderOrder()}
        </div>
      )}
      {orderList.length == 0 && (
        <div
          style={{
            marginLeft: "150px",
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Oh NO! Sorry No Orders</h1>
        </div>
      )}
    </div>
  );
}
