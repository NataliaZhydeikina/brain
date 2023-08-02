import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { data } from './data';
import Tubes from './components/Tubes';
import BrainParticles from './components/BrainParticles';
import * as THREE from 'three';

const PATHS = data.economics[0].paths;

export default function App() {
  let brainCurves: Array<THREE.CatmullRomCurve3> = [];
    
    for (let j = 0; j < PATHS.length; j++) {
        let points = [];
        const path = PATHS[j];
        for (let i = 0; i < path.length; i+=3) {
            points.push(
                new THREE.Vector3(path[i], path[i+1], path[i+2])
            )
        }
        const tempCurve: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3(points);
        brainCurves.push(tempCurve);
    }

  return (
    <Canvas camera={{position:[0,0,0.3], near:0.001, far:5}}>
      <color attach="background" args={["black"]} />
      <Tubes curves={brainCurves} />
      <BrainParticles curves={brainCurves} />
      <ambientLight />
      <pointLight position={[10,10,10]} />
      <OrbitControls />
    </Canvas>
  )
}
