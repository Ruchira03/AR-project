import { React, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/logo.jpg";
import "../../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { API } from "../../backend";
import axios from "axios";
import { signout } from "../../helper/Auth";
import { useNavigate } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Homepage() {
  const navigate = useNavigate();
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

  const dele = (id) => {
    axios
      .delete(`${API}/product/delete`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        data: {
          product_id: id,
        },
      })
      .then((response) => {
        console.log(response.data);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchdetails();
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

  const Performedit = (prod) => {
    localStorage.setItem("edit", JSON.stringify(prod));
    navigate("/editproduct");
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
    navigate("/productdisplay");
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <header>
        <div className="header-inner">
          <img src={logo} alt="logo" />
          <nav className="desktop-view">
            <ul>
              <li>
                <a href="/ownerhome">Products</a>
              </li>
              <li>
                <a href="/addproduct">Add Products</a>
              </li>
              <li>
                <a href="/owner/orders">Orders</a>
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
          marginLeft: "25px",
          marginTop: "120px",
          display: "flex",
        }}
      >
        <Box sx={{ minWidth: 160 }}>
          <FormControl fullWidth>
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
          marginTop: "150px",
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
                        <Typography gutterBottom variant="h5" component="h2">
                          {prod.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {prod.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          availability : {prod.quantity}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          Performedit(prod);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dele(prod.product_id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
              <Button href="/addproduct" variant="contained" color="primary">
                add a product to this category
              </Button>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
}
