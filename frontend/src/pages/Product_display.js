import { React, useRef, useState, useEffect } from "react";
import "./product_display.scss";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Navbar from "../components/Navbar/navbar";
import { FaRupeeSign } from "react-icons/fa";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../backend";

export default function ProductDisplay() {
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  useEffect(() => {
    setproduct(JSON.parse(localStorage.getItem("selectedProduct")));
  }, []);

  const addToCart = (product) => {
    const body = {
      user_id: JSON.parse(localStorage.getItem("jwt")).userData.user_id,
      product_id: product.product_id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      image_path: product.image_path,
    };
    axios
      .post(`${API}/cart/add`, body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/products");
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
    <>
      <Navbar />
      <div className="product-container">
        <Canvas className="canvas">
          <Stage preset="rembrandt" intensity={1} environment="city">
            <Controls />
            <Lights />
            <spotLight intensity={0.3} position={[5, 10, 50]} />
            <mesh position={[0, -35, 0]}>
              <Model link={product.model_3D_path} />
            </mesh>
          </Stage>
        </Canvas>
        <div className="text">
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
        </div>
      </div>
    </>
  );
}

const Model = ({ link }) => {
  const gltf = useGLTF(link, true);
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
