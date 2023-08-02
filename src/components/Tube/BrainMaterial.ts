import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";


const BrainMaterial = shaderMaterial(
    {
        time: 0, 
        color: new THREE.Color(0.1, 0.3, 0.6), 
        mouse: new THREE.Vector3(0,0,0)  
    },
    // vertex shader
    /*glsl*/`
      uniform float time;
      uniform vec3 mouse;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1., 1., sin(vUv.x*8.+time*3.));
        vec3 p = position;
        float maxDist = 0.05;
        float dist = length(mouse - p);
        if(dist < maxDist) {
            vec3 dir = 0.5*normalize(mouse - p);
            dir*= (1. - dist/maxDist);
            p -= dir*0.03;
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        float hideCorners = smoothstep(0., 0.1, vUv.x);
        float hideCorners2 = smoothstep(1.0, 0.9, vUv.x);
        vec3 finalColor = mix(color, color*0.25, vProgress);
        gl_FragColor.rgba = vec4(finalColor, hideCorners*hideCorners2);
      }
    `
)

export default BrainMaterial;