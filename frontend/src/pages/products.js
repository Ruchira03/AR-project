import { React, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../assets/logo.jpg";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { signout } from "../helper/Auth";
import "../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API } from "../backend";
import axios from "axios";
import { toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Products() {
  const navigate = useNavigate();
  const formData = new FormData();
  const [productlist, setproductlist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);

  useEffect(() => {
    fetchdetails();
    getcategory();
  }, []);
  const classes = useStyles();
  //fucntion to fetch all details
  const fetchdetails = () => {
    axios
      .get(`${API}/products`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setproductlist(response.data.products);

        localStorage.setItem(
          "products",
          JSON.stringify(response.data.products)
        );
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

  const getcategory = () => {
    return axios
      .get(`${API}/categories`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setcategorylist(response.data);
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

  const handleChange = (e) => {
    axios
      .get(
        `${API}/products/${e.target.value}`,

        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setproductlist(response.data.products);

        localStorage.setItem(
          "products",
          JSON.stringify(response.data.products)
        );
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

  const display = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/productdisplay");
  };

  const addToCart = (product) => {
    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      product_id: product.product_id,
      name: product.name,
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar/>
      <div
        style={{
          marginLeft: "50px",
          marginTop: "120px",
        }}
      >
        <Box sx={{ minWidth: 160 }}>
          <FormControl style={{minWidth : 200}}>
            <InputLabel id="demo-simple-select-label">
              search by category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              onChange={(e) => {
                handleChange(e);
              }}
              label="Age"
            >
              {categorylist.map((category) => (
                <MenuItem value={category.category_id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          marginLeft: "50px",
          marginRight : "50px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToastContainer />
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={4}>
              {productlist.map((prod) => (
                <Grid key={prod.product_id} item>
                  <Paper className={classes.paper} />
                  <Card item>
                    <CardActionArea
                      onClick={() => {
                        display(prod);
                      }}
                    >
                      <img
                        style={{ width: 350, height: 250 }}
                        className={classes.media}
                        src={prod.image_path}
                        image={prod.image_path}
                        title="Contemplative Reptile"
                        alt=""
                      />
                      <CardContent style={{ width: 350 }}>
                        <Typography gutterBottom variant="h6" component="h6">
                          {prod.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {prod.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        fullWidth
                        onClick={() => {
                          addToCart(prod);
                        }}
                        style={{
                          backgroundColor : "#03B48C",
                          color: "#ffffff",
                          fontWeight : "700"
                        }}
                        variant="contained"
                        
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {productlist.length == 0 && (
            <div
              style={{
                marginLeft: "450px",
                marginTop: "200px",
              }}
            >
              <Typography gutterBottom variant="h5" component="h1">
                oh ohh there is nothing in this category
              </Typography>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Products;
