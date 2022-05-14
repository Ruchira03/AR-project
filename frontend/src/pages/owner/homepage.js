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
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { API } from "../../backend";
import axios from "axios";
import { signout } from "../../helper/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Homepage() {
  const [productlist, setproductlist] = useState([]);
  const [selectedId, setselectedId] = useState("");

  useEffect(() => {
    fetchdetails();
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
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {prod.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <IconButton aria-label="edit">
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

export default Homepage;
