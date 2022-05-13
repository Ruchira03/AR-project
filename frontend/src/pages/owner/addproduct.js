import { React, useState } from "react";
import logo from "../../assets/logo.jpg";
import Footer from "../../components/Navbar/footer";
import "../../components/Navbar/navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

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
}));

export default function Addproduct() {
  const [image, setimage] = useState("");
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
              <li>
                <a href="/">Categories</a>
              </li>
              <li>
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
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-textarea outlined-basic"
            label="product name"
            placeholder="enter the name of product"
            variant="outlined"
          />
          <TextField
            type="number"
            id="standard-textarea outlined-basic"
            label="product price"
            placeholder="enter the price of product"
            variant="outlined"
          />
          <TextField
            id="standard-textarea outlined-basic"
            label="product description"
            placeholder="write something about your product"
            variant="outlined"
          />
          <TextField
            type="number"
            id="standard-textarea outlined-basic"
            label="Quantity available"
            placeholder="enter the number of product left"
            variant="outlined"
          />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setimage(event.target.files[0]);
                console.log(image);
              }
            }}
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          <Button variant="contained">Add product</Button>
        </form>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "250px",
            width: "450px",
            height: "300px",
            backgroundColor: "red",
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
