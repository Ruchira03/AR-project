import { React, useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import "../../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import { editproduct, getcategory } from "../../helper/owner";
import { signout } from "../../helper/Auth";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "55ch",
      display: "flex",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));

export default function Addproduct() {
  useEffect(() => {
    setcategorylist(JSON.parse(localStorage.getItem("categories")));
    const val = JSON.parse(localStorage.getItem("edit"));

    setvalues({
      ...values,
      name: val.name,
      desc: val.desc,
      price: val.price,
      quantity: val.quantity,
      category_id: val.category_id,
      product_id: val.product_id,
    });
  }, []);
  const navigate = useNavigate();
  const [image, setimage] = useState();
  const [values, setvalues] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    category_id: "",
    product_id: "",
  });
  const [categorylist, setcategorylist] = useState([]);
  const { name, desc, price, quantity, category_id, product_id } = values;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    setvalues({ ...values });
    editproduct({
      name,
      desc,
      price,
      quantity,
      category_id,
      product_id,
    })
      .then((data) => {
        console.log(data);
        setvalues({
          name: "",
          desc: "",
          price: "",
          quantity: "",
          category_id: "",
        });
        setimage();
        navigate("/ownerhome");
        if (!data) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_LEFT,
          });
          setvalues({ ...values });
        } else {
          toast.success(data.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const classes = useStyles();

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
          marginTop: "150px",
          marginLeft: "50px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ToastContainer />
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-textarea outlined-basic"
            label="product name"
            placeholder="enter the name of product"
            variant="outlined"
            value={name}
            onChange={handleChange("name")}
          />
          <TextField
            type="number"
            id="standard-textarea outlined-basic"
            label="product price"
            placeholder="enter the price of product"
            variant="outlined"
            value={price}
            onChange={handleChange("price")}
          />
          <TextField
            id="standard-textarea outlined-basic"
            label="product description"
            placeholder="write something about your product"
            variant="outlined"
            value={desc}
            onChange={handleChange("desc")}
          />
          <TextField
            type="number"
            id="standard-textarea outlined-basic"
            label="Quantity available"
            placeholder="enter the number of product left"
            variant="outlined"
            value={quantity}
            onChange={handleChange("quantity")}
          />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // onChange={handleChangeCategory("category_id")}
            onChange={handleChange("category_id")}
          >
            {categorylist.map((category) => (
              <MenuItem value={category.category_id}>{category.name}</MenuItem>
            ))}
          </Select>

          <Button variant="contained" onClick={onSubmit}>
            submit changes
          </Button>
        </form>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "250px",
            width: "450px",
            height: "300px",
            // backgroundColor: "red",
          }}
        >
          {
            <img
              style={{ width: "450px", height: "300px" }}
              id="target"
              src={JSON.parse(localStorage.getItem("edit")).image_path}
            />
          }
        </div>
      </div>
    </div>
  );
}
