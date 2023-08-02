import { useRef } from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import BrainMaterial from './BrainMaterial';


export default function Tube({curve}: {curve: THREE.CatmullRomCurve3}) {
    const brainMat = useRef<THREE.ShaderMaterial>(null);
    extend({ BrainMaterial });

    let {viewport} = useThree();

    useFrame(({clock, mouse})=>{
        brainMat.current!.uniforms.time.value=clock.getElapsedTime();
        brainMat.current!.uniforms.mouse.value=new THREE.Vector3(
            mouse.x * viewport.width/2,
            mouse.y * viewport.height/2,
            0
        );
    });

    return <mesh>
        <tubeGeometry args={[curve, 128, 0.001, 2, false]} />
        <brainMaterial 
        transparent={true}
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        ref={brainMat} 
        side={THREE.DoubleSide} />
    </mesh>
}