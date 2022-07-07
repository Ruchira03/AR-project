import { React, useState, useEffect } from "react";
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
import Navbar from "../components/Navbar/navbar";
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
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Product Name
          </Card>
          <Card
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Product Price
          </Card>
          <Card
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
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
              width: 250,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
            }}
          >
            Total Price
          </Card>
          <Card
            style={{
              width: 200,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "700",
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
              fontWeight: "700",
            }}
          >
            Action
          </Card>
        </Card>
        {orderList.map((order, idx) => (
          <Card style={{ display: "flex", width: 1100, marginTop: 10 }}>
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
                width: 250,
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              {order.price}
            </Card>
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
              {order.quantity}
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
            {order.status === "Pending" && (
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
            {order.status !== "Pending" && (
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
      <Navbar />
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
            marginLeft: "80px",
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderOrder()}
        </div>
      )}
      {orderList.length === 0 && (
        <div
          style={{
            marginLeft: "150px",
            marginTop: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Oh NO! Sorry No Pending Orders</h1>
        </div>
      )}
    </div>
  );
}
