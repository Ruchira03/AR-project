import { React, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/logo.jpg";
import "../../components/Navbar/navbar.scss";
import { deleteProduct, getproductlist } from "../../helper/owner";
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
    
    alert(e.target.value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <header>
        <div className="header-inner">
          <img src={logo} alt="logo" />
          <nav>
            <ul>
              <li>
                <a href="/ownerhome">Products</a>
              </li>
              <li>
                <a href="/addproduct">Add Products</a>
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
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          marginLeft: "0px",
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
                    <CardActionArea>
                      <img
                        style={{ width: 350, height: 250 }}
                        className={classes.media}
                        src={prod.image_path}
                        image={prod.image_path}
                        title="Contemplative Reptile"
                        alt=""
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {prod.name}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="h3">
                          ₹ {prod.price}
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
        </Grid>
      </div>
    </div>
  );
}
