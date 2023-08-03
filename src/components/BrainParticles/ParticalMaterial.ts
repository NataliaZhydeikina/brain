import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticalMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
    // vertex shader
    /*glsl*/`
      uniform float time;
      varying vec2 vUv;
      attribute float randoms;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = randoms*15. * (1./ -mvPosition.z);
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float time;
      void main() {
        float disc = length(gl_PointCoord.xy - vec2(0.5));
        float opacity = 0.3*smoothstep(0.5,0.4,disc);
        gl_FragColor.rgba = vec4(vec3(opacity), 1.0);
      }
    `
)

export default ParticalMaterial;