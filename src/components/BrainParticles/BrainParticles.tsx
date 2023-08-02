import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three';
import { extend, useFrame } from "@react-three/fiber";
import ParticalMaterial from "./ParticalMaterial";
import randomRange from "../../utils/randomRange";

export default function BrainParticles({curves}: {curves:Array<THREE.CatmullRomCurve3>}) {
    
    let density =  10;
    
    let numberOfPoints = density*curves.length;
    const particalMat = useRef<Array<{
        currentOffset: number,
        speed: number,
        curve: THREE.CatmullRomCurve3,
        curPosition: number}>
    >([]);
    const brainGeo = useRef<THREE.BufferGeometry>(null);
    extend({ ParticalMaterial });

    let positions = useMemo(()=>{
        let pos = [];
        for (let i = 0; i < numberOfPoints; i++) {
            pos.push(
                randomRange(-1,1),
                randomRange(-1,1),
                randomRange(-1,1),
            );
        }
        return new Float32Array(pos);
    },[]);

    let randoms = useMemo(()=>{
        let randoms = [];
        for (let i = 0; i < numberOfPoints; i++) {
            randoms.push(randomRange(0.3, 1.));
        }
        return new Float32Array(randoms);
    },[]);

    useEffect(()=>{
        for (let i = 0; i < curves.length; i++) {
            for (let j = 0; j < density; j++) {
                particalMat.current!.push({
                    currentOffset: Math.random(),
                    speed:  Math.random()*0.01,
                    curve: curves[i],
                    curPosition: Math.random()
                })
            }
        }
    });

    useFrame(()=>{
        let currentPositions = brainGeo.current!.attributes.position.array;
        for (let i = 0; i < particalMat.current!.length; i++) {
            particalMat.current![i].curPosition += particalMat.current![i].speed;
            particalMat.current![i].curPosition = particalMat.current![i].curPosition%1;

            let curPoint = particalMat.current![i].curve.getPointAt(particalMat.current![i].curPosition);

            currentPositions[i*3] = curPoint.x;
            currentPositions[i*3+1] = curPoint.y;
            currentPositions[i*3+2] = curPoint.z;
            
        }
        brainGeo.current!.attributes.position.needsUpdate = true;
    });

    return <points>
        <bufferGeometry attach="geometry" ref={brainGeo}>
            <bufferAttribute
            attach="attributes-position"
            count={positions.length/3}
            array={positions}
            itemSize={3}
             />
            <bufferAttribute
            attach="attributes-randoms"
            count={randoms.length/1}
            array={randoms}
            itemSize={1}
             />
        </bufferGeometry>
        <particalMaterial
            attach="material"
            transparent={true}
            depthTest={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
             />
    </points>;
}