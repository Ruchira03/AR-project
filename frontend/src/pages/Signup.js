import { React, useState, useRef } from "react";
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
import { signup, otpverification, authenticate } from "../helper/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import "./Login.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

export default function SignIn() {
  var [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    didRedirict: false,
    otp: "",
  });

  const navigate = useNavigate();
  const { name, email, password, mobile_number, didRedirict, otp } = values;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setvalues({ ...values });
    signup({
      name,
      email,
      password,
      mobile_number,
    })
      .then((data) => {
        if (!data) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          setvalues({ ...values });
        } else {
          toast.success(data.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        toast.success(err, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(err);
      });
  };

  const otpverify = (event) => {
    event.preventDefault();
    setvalues({ ...values });
    otpverification({
      name,
      email,
      password,
      mobile_number,
      otp,
    })
      .then((res) => {
        if (!res) {
          toast("something went wrong", {
            position: toast.POSITION.TOP_CENTER,
          });
          setvalues({ ...values });
        } else if (res.error) {
          setvalues({ ...values, error: res.error });
          toast(res.message, { position: toast.TOP_CENTER });
        } else {
          localStorage.setItem("owner", false);
          authenticate(res.data, () => {
            setvalues({ ...values, didRedirict: true });
          });
        }
      })
      .catch((err) => {
        //alert(err.message);
        toast(err.message, { position: toast.TOP_CENTER });
      });
  };

  const redir = () => {
    if (didRedirict) {
      toast.success("logged in sucessfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/userhomepage");
    }
  };
  const classes = useStyles();

  return (
    <div className="container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <ToastContainer />
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              onChange={handleChange("name")}
              autoComplete="name"
              margin="normal"
              name="Name"
              variant="outlined"
              required
              fullWidth
              id="Name"
              label="Name"
              autoFocus
              size="small"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("email")}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size="small"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("password")}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 12))}
              onChange={handleChange("mobile_number")}
              id="Mobile-Number"
              label="Mobile-Number"
              name="Mobile-Number"
              size="small"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="small"
            >
              Get OTP
            </Button>
          </form>
          <form className={classes.form} onSubmit={otpverify}>
            {" "}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("otp")}
              id="otp"
              label="Enter OTP"
              name="otp"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="small"
            >
              submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <div>{redir()}</div>

      <Canvas>
        <Controls />
        <Lights />
        <spotLight intensity={0.3} position={[5, 10, 50]} />
        <mesh position={[30, -15, 0]} scale={10}>
          <Model />
        </mesh>
      </Canvas>
    </div>
  );
}

const Model = () => {
  const gltf = useGLTF("/room2/scene.gltf", true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
    </>
  );
};

extend({ OrbitControls });

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls autoRotate ref={controls} args={[camera, domElement]} />
  );
};
