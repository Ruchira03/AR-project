import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authenticate, isAuthenticated, ownersignin } from "../../helper/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import background from "../../assets/bg.webp";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  backgroundImage: `url(${background})`,
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Ownerlogin() {
  const [values, setvalues] = useState({
    email: "",
    password: "",
    didRedirict: false,
  });
  const navigate = useNavigate();
  const { email, password, didRedirict } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false });
    ownersignin({ email, password })
      .then((res) => {
        if (res.error) {
          toast.warn(res.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          setvalues({ ...values, error: res.error });
        } else {
          toast.success("sucess", {
            position: toast.POSITION.TOP_CENTER,
          });
          authenticate(res, () => {
            setvalues({ ...values, didRedirict: true });
            navigate("/ownerhomepage");
          });
          toast.success("logedd in sucessfylly", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        toast.warn(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ToastContainer />
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={handleChange("email")}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange("password")}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container></Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
