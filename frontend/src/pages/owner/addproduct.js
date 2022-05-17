import { React, useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import Footer from "../../components/Navbar/footer";
import "../../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import { addproduct, getcategory } from "../../helper/owner";
import { signout } from "../../helper/Auth";

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
  }, []);

  const [image, setimage] = useState(null);
  const [folder, setfolder] = useState(null);
  const [gltffile, setgltffile] = useState(null);
  const [binfile, setbinfile] = useState(null);
  const [values, setvalues] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    category_id: "",
  });
  const [selectedcat, setselectedcat] = useState("chair");
  const [categorylist, setcategorylist] = useState([]);
  const { name, desc, price, quantity, category_id } = values;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    setvalues({ ...values });
    console.log("naane ne state inda");
    console.log(image, folder, gltffile, binfile);
    addproduct(
      {
        name,
        desc,
        price,
        quantity,
        category_id,
      },
      image,
      folder,
      gltffile,
      binfile
    )
      .then((data) => {
        console.log(data);
        setvalues({
          name: "",
          desc: "",
          price: "",
          quantity: "",
          category_id: "",
        });
        setimage(null);
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

          <label htmlFor="contained-button-image">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
            >
              upload image
              <input
                className={classes.input}
                id="contained-button-image"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    setimage(event.target.files[0]);
                  }
                }}
                type="file"
              />
            </Button>
          </label>
          <label htmlFor="contained-button-gltf">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
            >
              upload gltf
              <input
                className={classes.input}
                id="contained-button-gltf"
                onChange={(event) => {
                  if (event.target.files) {
                    setgltffile(event.target.files[0]);
                  }
                }}
                type="file"
              />
            </Button>
          </label>
          <label htmlFor="contained-button-bin">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
            >
              upload bin file
              <input
                className={classes.input}
                id="contained-button-bin"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    setbinfile(event.target.files[0]);
                  }
                }}
                type="file"
              />
            </Button>
          </label>
          <input
            id="contained-button"
            className={classes.input}
            directory=""
            webkitdirectory=""
            onChange={(event) => {
              if (event.target.files) {
                setfolder(event.target.files);
              }
            }}
            type="file"
          />
          <label htmlFor="contained-button">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
            >
              upload asset folder
            </Button>
          </label>
          <Button variant="contained" onClick={onSubmit}>
            Add product
          </Button>
        </form>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "250px",
            width: "450px",
            height: "300px",
          }}
        >
          {image && (
            <img
              style={{ width: "450px", height: "300px" }}
              id="target"
              src={URL.createObjectURL(image)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
