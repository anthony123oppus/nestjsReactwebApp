import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";

import IPhone from "./Iphone";
import { Canvas } from "@react-three/fiber";
import Macbook from "./Macbook";

const ModelView = ({type, image} : {type : string, image : string}) => {
  // Your component implementation here
  return (
    <Canvas>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 0.5]} />
      <Lights />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        maxPolarAngle={Math.PI / 2} // Lock rotation in the x-axis
        minPolarAngle={Math.PI / 2} 
      />
      {type === 'Iphone' ?
        <IPhone image={image}/> 
        :
        <Macbook image={image}/>
      }
    </Canvas>
  );
};

export default ModelView;
