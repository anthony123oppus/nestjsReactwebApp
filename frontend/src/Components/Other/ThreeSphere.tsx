import {useRef} from 'react'
import {Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {OrbitControls, useTexture} from '@react-three/drei'
import Lights from '../Model/Lights'
// import { reactImg } from '../../util/Image'

const Sphere = ({image} : {image : string}) => {
    const ReactImage = useTexture(image)
    const sphereRef = useRef<THREE.Group>(null)

    // gi pas-pason sa rotation
    useFrame((state, delta) => {
        if(sphereRef.current){
            sphereRef.current.rotation.y += delta
        }
    })

    return (

            <group ref={sphereRef}>
                <mesh position={[0,0,0]}>
                    <icosahedronGeometry args={[2.8, 2]}/> 
                    {/* <sphereGeometry args={[2.8,30,30]}/> */}
                    <meshStandardMaterial map={ReactImage} />
                </mesh>
            </group>
    )
}

const ThreeSphere = ({image} : {image : string}) => {
    return (
        <Canvas>
            {/* <ambientLight /> */}
            {/* <directionalLight position={[1,1.6,2.5]}/> */}
            <Lights />
            <OrbitControls enableZoom={false}/>
            <Sphere image={image}/>
        </Canvas>
    )
}

export default ThreeSphere