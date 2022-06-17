import { React, useState, Suspense, useRef } from "react";
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
import { authenticate, isAuthenticated, signin } from "../helper/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import "./Login.scss";

import { Section } from "../utils/section";

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
  const [values, setvalues] = useState({
    email: "",
    password: "",
    didRedirict: false,
  });
  const navigate = useNavigate();
  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false });
    signin({ email, password })
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.warn(res.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          setvalues({ ...values, error: res.error });
        } else {
          toast.success(res.data, {
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.setItem("owner", false);
          authenticate(res, () => {
            setvalues({ ...values, didRedirict: true });
            navigate("/userhomepage");
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
    <>
      <div className="container">
        <Container component="main" maxWidth="xs" className="form">
          <CssBaseline />
          <div className={classes.paper}>
            <ToastContainer />
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
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
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
          <Lights />
          <Suspense fallback={null}>
            <HTMLContent />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

const Model = () => {
  const gltf = useGLTF("/room/scene.gltf", true);
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

const HTMLContent = () => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <Section factor={1.5} offset={1}>
      <group position={[10, 250, 0]}>
        <mesh ref={ref} position={[0, -25, 0]} scale={0.3}>
          <Model />
        </mesh>
        <Html fullscreen></Html>
      </group>
    </Section>
  );
};
