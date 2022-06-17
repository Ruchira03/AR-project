import { React, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
import Rating from "@mui/material/Rating";

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
  const [productlist, setproductlist] = useState([]);
  const [categorylist, setcategorylist] = useState([]);
  const [CartItems, setcartItems] = useState([]);
  useEffect(() => {
    fetchdetails();
    getcategory();
    fetchCart();
  }, []);
  const classes = useStyles();

  const fetchdetails = () => {
    axios
      .get(`${API}/products`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        //  console.log(response.data);
        fetchCart();
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
      })
      .catch(function (error) {
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

  const getcategory = () => {
    return axios
      .get(`${API}/categories`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
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
    if (e.target.value === 0) {
      fetchdetails();
    } else {
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
    }
  };

  const handleSort = (e) => {
    var choice = e.target.value;

    //price lowest - highest
    if (choice === 0) {
      const list = [...productlist].sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
      );
      setproductlist(list);
    }
    if (choice === 1) {
      const list = [...productlist].sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
      );
      setproductlist(list);
    }
    if (choice === 2) {
      const list = [...productlist].reverse();
      setproductlist(list);
    }
    if (choice === 3) {
      const list = [...productlist].reverse();
      setproductlist(list);
    }
    if (choice === 4) {
      const list = [...productlist].sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      setproductlist(list);
    }
    if (choice === 5) {
      const list = [...productlist].sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });

      setproductlist(list);
    }
    if (choice === 6) {
      const list = [...productlist].sort((a, b) => a.rating - b.rating);
      setproductlist(list);
    }
    if (choice === 7) {
      const list = [...productlist].sort((a, b) => b.rating - a.rating);
      setproductlist(list);
    }
    if (choice === 8) {
      fetchdetails();
    }
  };

  const display = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    localStorage.setItem("isInCart", isItemInTheCart(product));
    navigate("/productdisplay");
  };

  const addToCart = (product) => {
    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      product_id: product.product_id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      quantity: "1",
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

  const isItemInTheCart = (item) => {
    var result = false;
    CartItems.map((product) => {
      if (product.product_id === item.product_id) {
        result = true;
      }
    });
    return result;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div
        style={{
          marginLeft: "25px",
          marginTop: "120px",
          display: "flex",
        }}
      >
        <Box sx={{ minWidth: 160 }}>
          <FormControl style={{ minWidth: 180 }}>
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
              <MenuItem value={0}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 160 }}>
          <FormControl style={{ minWidth: 180, marginLeft: 10 }}>
            <InputLabel id="demo-simple-select-label">sort products</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                handleSort(e);
              }}
              label="Sort"
            >
              <label>price</label>
              <MenuItem value={0}>lowest to highest</MenuItem>
              <MenuItem value={1}>highest to lowest</MenuItem>
              <label>date</label>
              <MenuItem value={2}>newest first</MenuItem>
              <MenuItem value={3}>oldest first</MenuItem>
              <label>name</label>
              <MenuItem value={4}>A - Z</MenuItem>
              <MenuItem value={5}>Z - A</MenuItem>
              <label>rating</label>
              <MenuItem value={6}>lowest to highest</MenuItem>
              <MenuItem value={7}>highest to lowest</MenuItem>
              <MenuItem value={8}>No Sort</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          marginLeft: "50px",
          marginRight: "50px",
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
                        title={prod.name}
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
                          ₹ {prod.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Available Quantity : {prod.quantity}
                        </Typography>
                        <label htmlFor="Rating">{prod.rating}</label>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <Rating
                            precision="0.1"
                            name="read-only"
                            value={prod.rating}
                            readOnly
                          />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {prod.quantity === 0 ? (
                        <h1>sorry out of stock</h1>
                      ) : isItemInTheCart(prod) ? (
                        <Button
                          fullWidth
                          style={{
                            color: "black",
                            fontWeight: "700",
                          }}
                          href="/cart"
                          variant="contained"
                        >
                          Go To Cart
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          onClick={() => {
                            addToCart(prod);
                          }}
                          style={{
                            backgroundColor: "#03B48C",
                            color: "#ffffff",
                            fontWeight: "700",
                          }}
                          variant="contained"
                        >
                          Add to Cart
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {productlist.length === 0 && (
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
