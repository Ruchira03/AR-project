import React, { useRef, useEffect, Suspense } from "react";
import "./home.scss";
//Components

//utils
import { Section } from "../utils/section";
import state from "../utils/state";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";

// React Spring
import { a, useTransition } from "@react-spring/web";

import { useInView } from "react-intersection-observer";
import Footer from "../components/Navbar/footer";
import Navbar from "../components/Navbar/navbar";

const Home = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop;
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Navbar />
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath="/armchairYellow.gltf"
            positionY={250}
            bgColor={"#03B48C"}
            modelScale={1}
          >
            <div className="content">
              <div className="about-company">
                <h1 className="about-company-title">Welcome.</h1>
                <h2>Vision and business idea</h2>
                <p>
                  “To create a better everyday life for the many people”, this
                  is the ARrange vision. Our business idea is “to offer a wide
                  range of well-designed, functional home furnishing products at
                  prices so low that as many people as possible will be able to
                  afford them”.
                </p>
                <br />
                <p>
                  We work hard to achieve quality at affordable prices for our
                  customers through optimising our entire value chain, by
                  building long-term supplier relationships, investing in highly
                  automated production and producing large volumes. Our vision
                  also goes beyond home furnishing. We want to create a better
                  everyday for all people impacted by our business.
                </p>
              </div>

              <h1 className="title">Aesthetic</h1>
              <p className="description">
                IN THIS INCREASINGLY DIGITISED WORLD WHERE THE WAR FOR EYEBALLS
                ONLY GROWS STRONGER, VISUAL IS KING—AND ONE WAY TO WAVE THAT
                CROWN AROUND IS A DISTINCT AESTHETIC THAT PEOPLE WILL FROLIC TO.
                AND YES, CONCERNING YOURSELVES OVER WHAT AESTHETIC TO HAVE CAN
                SEEM LIKE A TOTAL FIRST WORLD PROBLEM BUT DON’T ROLL YOUR EYES
                JUST YET. HAVING A PERSONAL AESTHETIC CAN REALLY HELP YOU AND
                YOUR BRAND STAND OUT.
              </p>
            </div>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            modelPath="/armchairGray.gltf"
            positionY={0}
            bgColor={"#F1F0F0"}
            modelScale={1}
          >
            <div className="content" id="second">
              <div className="about-company" id="minimalistic">
                <h1 className="about-company-title">
                  The Future Is Bright, And It Begins Now
                </h1>
                <p>
                  We’re just getting started. We know it’s a cliché. Almost
                  everyone has used it, but frankly, we are just getting
                  started. After all, by some estimates India is the
                  third-largest furniture market in the world.
                </p>
                <br />
                <p>
                  Our goal has always been to create value for our customers,
                  shareholders, and business partners and we are confident that
                  our financial metrics will only keep getting better. Looking
                  ahead, we are committed to the metaverse and in doing so are
                  building augmented and virtual reality solutions that will
                  blur the lines between what’s virtual and what’s real. Imagine
                  a ARrange Studio where everything is virtual, without a single
                  piece of furniture in the Studio. We’re working to make it
                  real!
                </p>
              </div>

              <h1 className="title">Minimalistic</h1>
              <p className="description">
                The reality is that most of our forefathers have existed with
                significantly less than what we have today and they have lived
                full and satisfactory lives. In other words people only focus on
                those things which they really need in order to survive and to
                be comfortable. A further condition for a minimalistic lifestyle
                is that it should not be something which is forced upon a person
                but it should be chosen with purpose and good reason. In a sense
                minimalism is simply a condition where in people focus their
                lives on those things which they really treasure & which is
                really essential for a satisfactory lifestyle.
              </p>
            </div>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            modelPath="/antique/scene.gltf"
            positionY={-250}
            bgColor={"#000000"}
            modelScale={45}
          >
            <div className="content" id="third">
              <div className="about-company">
                <h1 className="about-company-title">
                  Renovating your ancestral home? Here’s how to keep it
                  traditional yet trendy!
                </h1>
                <br />
              </div>

              <h1 className="title">Antique</h1>
              <p className="description">
                Ancestral homes are not homes but a sentiment. The charm of
                simpler times, the nostalgia of your childhood memories, the
                love and care of your grandparents in building their home.
                <br />
                However, renovation is essential for such homes because they are
                old and need timely upkeep. If you are embarking on such a
                journey for your ancestral home, here are a few design ideas for
                you to keep it traditional yet trendy.
                <br />
                <br />
                1. Wooden furniture with contemporary furnishings
                <br />
                2. Revitalize seating area
                <br />
                3. Dining area makeover
                <br />
                4. Use furniture with traditional patterns
              </p>
            </div>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            modelPath="/all_in_one/scene.gltf"
            positionY={-500}
            bgColor={"#393939"}
            modelScale={[0.1, 0.15, 0.08]}
          >
            <div className="content" id="fourth">
              <div className="about-company">
                <h1 className="about-company-title">
                  One Stop For All Your Furniture Vision!
                </h1>
              </div>
              <h1 className="title">Modern</h1>
              <p className="description"></p>
            </div>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            modelPath="/neonTable/scene.gltf"
            positionY={-730}
            bgColor={"#000000"}
            modelScale={20}
          >
            <div className="content-footer">
              <h1 className="title" id="thankyou">
                Thank You!
              </h1>
              <Footer />
            </div>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
};

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
      <directionalLight position={[5, 5, 2.5]} intensity={1} />
      <directionalLight position={[0, 5, 0]} intensity={1.5} />
    </>
  );
};

const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
  modelScale,
}) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]} scale={modelScale}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

export default Home;
