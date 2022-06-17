import { React, useRef, useState, useEffect } from "react";
import "./product_display.scss";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, Stage, Html } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Navbar from "../components/Navbar/navbar";
import { FaCamera } from "react-icons/fa";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../backend";
import { ARApp } from "./ARApp";
import Rating from "@mui/material/Rating";
import { signout } from "../helper/Auth";
import logo from "../assets/logo.jpg";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";

export default function ProductDisplay() {
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const [inCart, setinCart] = useState();
  const [isOwner, setisOwner] = useState();
  const [reviewList, setreviewList] = useState([]);
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [review, setreview] = useState("");

  useEffect(() => {
    const app = new ARApp();
    window.app = app;
    setproduct(JSON.parse(localStorage.getItem("selectedProduct")));
    setinCart(localStorage.getItem("isInCart"));
    setisOwner(localStorage.getItem("owner"));
    fetchReview();
  }, []);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

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
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/cart");
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

  const domContent = useRef();
  const fetchReview = () => {
    axios
      .get(
        `${API}/review/${
          JSON.parse(localStorage.getItem("selectedProduct")).product_id
        }`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setreviewList(response.data.reviews);
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

  const productDetail = () => {
    axios
      .get(
        `${API}//product/${
          JSON.parse(localStorage.getItem("selectedProduct")).product_id
        }/`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setproduct(response.data.productDetails);
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

  const renderOrder = () => {
    return (
      <div>
        {reviewList.map((review) => (
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              width: 900,
              border: "1px",
              boxShadow: "10px",
              marginTop: 10,
            }}
          >
            <Card
              style={{
                width: 900,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "10px",
                fontWeight: "700",
                height: "50px",
              }}
            >
              {review.name}
            </Card>
            <Card
              style={{
                width: 900,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "10px",
                fontWeight: "700",
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                <Rating
                  precision="0.1"
                  name="read-only"
                  value={review.rating}
                  readOnly
                />
              </Typography>
            </Card>
            <Card
              style={{
                width: 900,
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: "10px",
                fontWeight: "700",
                height: "90px",
              }}
            >
              {review.review}
            </Card>
          </Card>
        ))}
      </div>
    );
  };

  const reviewSubmit = () => {
    var avg = 0;
    const noOfItems = reviewList.length + 1;
    reviewList.map((review) => {
      avg = avg + review.rating;
    });
    avg = avg + value;
    avg = avg / noOfItems;
    const res = Number(avg.toFixed(1));
    const body = {
      product_id: product.product_id,
      rating: value,
      review: review,
      average_rating: res,
    };
    axios
      .post(`${API}/review/add`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        productDetail();
        fetchReview();
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

  const hasReviewed = (item) => {
    var result = false;
    reviewList.map((review) => {
      if (
        review.product_id === item.product_id &&
        review.user_id ===
          JSON.parse(localStorage.getItem("jwt")).userData.user_id
      ) {
        result = true;
      }
    });
    return result;
  };

  return (
    <>
      {isOwner == "false" ? (
        <Navbar />
      ) : (
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
      )}
      <ToastContainer />
      <div className="product-container">
        <Canvas className="canvas">
          <Stage preset="rembrandt" intensity={1} environment="city">
            <Controls />
            <Lights />
            <spotLight intensity={0.3} position={[5, 10, 50]} />
            <mesh position={[0, -35, 0]}>
              <Model modelPath={product.model_3D_path} />
            </mesh>
          </Stage>
        </Canvas>
        <div className="text">
          <FaCamera
            className="ar-button"
            color="#000000"
            size="30px"
            onClick={() => window.app.showChair(product.model_3D_path)}
          />
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom component="p">
            {product.desc}
          </Typography>

          <div>
            <Typography gutterBottom variant="h5" component="h2">
              ₹ {product.price}
            </Typography>
          </div>
          <label htmlFor="Rating">{product.rating}</label>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating
              precision="0.1"
              name="read-only"
              value={Number(product.rating)}
              readOnly
            />
          </Typography>

          {isOwner == "false" ? (
            product.quantity == 0 ? (
              <h1>sorry out of stock</h1>
            ) : inCart == "true" ? (
              <button
                className="button"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Typography gutterBottom variant="h5" component="p">
                  Go to cart
                </Typography>
              </button>
            ) : (
              <button
                className="button"
                onClick={() => {
                  addToCart(product);
                }}
              >
                <Typography gutterBottom variant="h5" component="p">
                  Add to cart
                </Typography>
              </button>
            )
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
      <hr />
      <hr />
      <div
        style={{
          marginLeft: "150px",
          marginTop: "100px",
        }}
      >
        <div>
          <Typography gutterBottom variant="h5" component="p">
            Review Section
          </Typography>
          {isOwner == "false" &&
            (hasReviewed(product) ? (
              <h1>Reviewed Already</h1>
            ) : (
              <div>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <Card
                  style={{
                    width: 900,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    marginLeft: "10px",
                    fontWeight: "700",
                    height: "90px",
                    marginTop: 20,
                  }}
                >
                  <TextField
                    label="review"
                    multiline
                    fullWidth
                    rows={4}
                    onChange={(e) => {
                      setreview(e.target.value);
                    }}
                    placeholder="enter your review"
                  />
                </Card>
                <div
                  style={{
                    width: 900,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                    fontWeight: "700",
                    height: "90px",
                    marginTop: 10,
                  }}
                >
                  <Button onClick={reviewSubmit} variant="contained">
                    Submit Review
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <hr />
        <hr />
        <h3>
          {reviewList.length} reviews and {product.rating} is the average rating
        </h3>
        {renderOrder()}
      </div>
    </>
  );
}

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
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

const HTMLContent = ({ domContent, children, modelPath }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  // const [refItem, inView] = useInView({
  //   threshold: 0,
  // });

  return (
    <>
      <mesh ref={ref} position={[0, -35, 0]}>
        <Model modelPath={modelPath} />
      </mesh>
      <Html portal={domContent} fullscreen>
        <div className="container">{children}</div>
      </Html>
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
