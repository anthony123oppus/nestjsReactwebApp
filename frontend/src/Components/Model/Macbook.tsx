import * as THREE from "three";
import { useGLTF, useTexture  } from '@react-three/drei'
import { macScreen } from "../../util/Image";

interface ModelProps {
    image?: string
    // Add more props as needed
  }

export default function Macbook(props : ModelProps) {
  const { nodes, materials } = useGLTF('/models/imac.glb')

  const texture = useTexture(props.image ? props.image : macScreen);
  texture.wrapS = THREE.RepeatWrapping; // or THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.RepeatWrapping; // or THREE.ClampToEdgeWrapping
  // Adjust texture filters for sharpness
  texture.minFilter = THREE.LinearFilter; // or THREE.NearestFilter for the sharpest result
  texture.magFilter = THREE.LinearFilter; // or THREE.NearestFilter for the sharpest result
  texture.generateMipmaps = false; // Disable mipmaps if you don't want mipmapping
  
  // Optionally set anisotropy for better quality
  const renderer = new THREE.WebGLRenderer();
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.repeat.set(1, 1.23);

  return (
    <group {...props} dispose={null} scale={[.0033,.0033,.0033]} rotation={[1.6,0,1.6]} position={[0,-.16,0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group position={[0.032, 0, 0.387]}>
            <group position={[-0.03, 0, -0.387]}>
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_16  as THREE.Mesh).geometry}
                material={materials.DarkBlue}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_18  as THREE.Mesh).geometry}
                material={materials.DarkBlue}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_20  as THREE.Mesh).geometry}
                material={materials.Black}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_22  as THREE.Mesh).geometry}
                material={materials.DarkBlue}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_24  as THREE.Mesh).geometry}
                // material={materials.Screen}
              >
                    <meshStandardMaterial roughness={1} map={texture} />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_26  as THREE.Mesh).geometry}
                material={materials.Chrome}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_28  as THREE.Mesh).geometry}
                material={materials['Cam.Black']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_30  as THREE.Mesh).geometry}
                material={materials.Lens}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_32  as THREE.Mesh).geometry}
                material={materials.Glass}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_34  as THREE.Mesh).geometry}
                material={materials['Black.001']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Object_36  as THREE.Mesh).geometry}
                material={materials.Yellow}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes.Object_11  as THREE.Mesh).geometry}
              material={materials.Metal}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes.Object_13  as THREE.Mesh).geometry}
              material={materials.Metal2}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_8  as THREE.Mesh).geometry}
            material={materials.LightBlue}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/imac.glb')
