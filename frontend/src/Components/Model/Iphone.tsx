import { useEffect} from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { phoneScreen } from "../../util/Image";

interface ModelProps {
    image?: string
    // Add more props as needed
  }

export default function Model(props : ModelProps)    {
  const { nodes, materials } = useGLTF("/models/scene.glb");

  const texture = useTexture(props.image ? props.image : phoneScreen);
  // Adjust texture filters for sharpness
  texture.minFilter = THREE.LinearFilter; // or THREE.NearestFilter for the sharpest result
  texture.magFilter = THREE.LinearFilter; // or THREE.NearestFilter for the sharpest result
  texture.generateMipmaps = false; // Disable mipmaps if you don't want mipmapping
  
  // Optionally set anisotropy for better quality
  const renderer = new THREE.WebGLRenderer();
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // to solve the error in color
    useEffect(() => {
        console.log(materials)
        Object.entries(materials).forEach(([name, material]) => {
            // Check if the material has a color property
            if ('color' in material) {
                // These are the material names that can't be changed color
                if (
                    name !== "zFdeDaGNRwzccye" &&
                    name !== "ujsvqBWRMnqdwPx" &&
                    name !== "hUlRcbieVuIiOXG" &&
                    name !== "jlzuBkUzuJqgiAK" &&
                    name !== "xNrofRCqOXXHVZt"
                ) {
                    (material as THREE.MeshStandardMaterial).color = new THREE.Color('#8F8A81');
                }
                material.needsUpdate = true;
            }
        });
    }, [materials]);

  return (
    <group {...props} dispose={null} scale={[2,2,2]} rotation={[0,3.1,0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.ttmRoLdJipiIOmf as THREE.Mesh).geometry}
        material={materials.hUlRcbieVuIiOXG}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.DjsDkGiopeiEJZK as THREE.Mesh).geometry}
        material={materials.PaletteMaterial001}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.buRWvyqhBBgcJFo as THREE.Mesh).geometry}
        material={materials.PaletteMaterial002}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.MrMmlCAsAxJpYqQ_0 as THREE.Mesh).geometry}
        material={materials.dxCVrUCvYhjVxqy}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.wqbHSzWaUxBCwxY_0 as THREE.Mesh).geometry}
        material={materials.MHFGNLrDQbTNima}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.QvGDcbDApaGssma as THREE.Mesh).geometry}
        material={materials.kUhjpatHUvkBwfM}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.vFwJFNASGvEHWhs as THREE.Mesh).geometry}
        material={materials.RJoymvEsaIItifI}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.evAxFwhaQUwXuua as THREE.Mesh).geometry}
        material={materials.KSIxMqttXxxmOYl}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.USxQiqZgxHbRvqB as THREE.Mesh).geometry}
        material={materials.mcPrzcBUcdqUybC}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.TvgBVmqNmSrFVfW as THREE.Mesh).geometry}
        material={materials.pIhYLPqiSQOZTjn}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.GuYJryuYunhpphO as THREE.Mesh).geometry}
        material={materials.eShKpuMNVJTRrgg}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.pvdHknDTGDzVpwc as THREE.Mesh).geometry}
        material={materials.xdyiJLYTYRfJffH}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.CfghdUoyzvwzIum as THREE.Mesh).geometry}
        material={materials.jpGaQNgTtEGkTfo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.DjdhycfQYjKMDyn as THREE.Mesh).geometry}
        material={materials.ujsvqBWRMnqdwPx}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.usFLmqcyrnltBUr as THREE.Mesh).geometry}
        material={materials.sxNzrmuTqVeaXdg}
        scale={0.01}
      />
      {/* start sa mesh sa screen */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.xXDHkMplTIDAXLN as THREE.Mesh).geometry}
        material={materials.pIJKfZsazmcpEiU}
        scale={0.01}
      >
      <meshStandardMaterial roughness={1} map={texture} />
      </mesh>
      {/* end sa mesh sa screen */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.vELORlCJixqPHsZ as THREE.Mesh).geometry}
        material={materials.zFdeDaGNRwzccye}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.EbQGKrWAqhBHiMv as THREE.Mesh).geometry}
        material={materials.TBLSREBUyLMVtJa}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.EddVrWkqZTlvmci as THREE.Mesh).geometry}
        material={materials.xNrofRCqOXXHVZt}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.KSWlaxBcnPDpFCs as THREE.Mesh).geometry}
        material={materials.yQQySPTfbEJufve}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.TakBsdEjEytCAMK as THREE.Mesh).geometry}
        material={materials.PaletteMaterial003}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.IykfmVvLplTsTEW as THREE.Mesh).geometry}
        material={materials.PaletteMaterial004}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.wLfSXtbwRlBrwof as THREE.Mesh).geometry}
        material={materials.oZRkkORNzkufnGD}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.WJwwVjsahIXbJpU as THREE.Mesh).geometry}
        material={materials.yhcAXNGcJWCqtIS}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.YfrJNXgMvGOAfzz as THREE.Mesh).geometry}
        material={materials.bCgzXjHOanGdTFV}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.DCLCbjzqejuvsqH as THREE.Mesh).geometry}
        material={materials.vhaEJjZoqGtyLdo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.CdalkzDVnwgdEhS as THREE.Mesh).geometry}
        material={materials.jlzuBkUzuJqgiAK}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.NtjcIgolNGgYlCg as THREE.Mesh).geometry}
        material={materials.PpwUTnTFZJXxCoE}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.pXBNoLiaMwsDHRF as THREE.Mesh).geometry}
        material={materials.yiDkEwDSyEhavuP}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.IkoiNqATMVoZFKD as THREE.Mesh).geometry}
        material={materials.hiVunnLeAHkwGEo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.rqgRAGHOwnuBypi as THREE.Mesh).geometry}
        material={materials.HGhEhpqSBZRnjHC}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/models/scene.glb");
