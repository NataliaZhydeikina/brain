import * as THREE from 'three';
import Tube from '../Tube';

export default function Tubes({curves}: {curves:Array<THREE.CatmullRomCurve3>}) {
    return <>
    {curves.map((curve, index)=><Tube curve={curve} key={index} />)}
    </>
}