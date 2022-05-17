import React, { useRef } from "react";
import "./product_display.scss";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Navbar from "../components/Navbar/navbar";
import { FaRupeeSign } from "react-icons/fa";
import { Typography } from "@material-ui/core";

export default function ProductDisplay() {
  return (
    <>
      <Navbar />
      <div className="product-container">
        <Canvas className="canvas">
          <Controls />
          <Lights />
          <spotLight intensity={0.3} position={[5, 10, 50]} />
          <mesh position={[0, -35, 0]}>
            <Model />
          </mesh>
        </Canvas>
        <div className="text">
          <Typography gutterBottom variant="h5" component="h2">
            Title
          </Typography>
          <Typography gutterBottom component="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eum
            perferendis, numquam laboriosam sunt culpa molestiae nesciunt neque
            esse voluptate, iure architecto excepturi inventore iusto fuga? Quas
            numquam odit voluptatibus!
          </Typography>

          <div>
            <Typography gutterBottom variant="h5" component="h2">
              ₹ 5,000
            </Typography>
          </div>

          <button className="button">
            <Typography gutterBottom variant="h5" component="p">
              Add to cart
            </Typography>
          </button>
        </div>
      </div>
    </>
  );
}

const Model = () => {
  const gltf = useGLTF("/armchairYellow.gltf", true);
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
