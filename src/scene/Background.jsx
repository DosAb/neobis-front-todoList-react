import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import fragmentShader from './materials/backgroundMaterial/fragment.glsl'
import vertexShader from './materials/backgroundMaterial/vertex.glsl'


export default function Background()
{
    const meshRef = useRef()

    const unifomrs = {
        uTime: {value: 0},
        uResolution: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)}
    }

    useFrame((state, delta)=>{
        meshRef.current.material.uniforms.uTime.value += delta * 0.3
    })

    window.addEventListener('resize', ()=>{
        meshRef.current.material.uniforms.uResolution.value.x = window.innerWidth
        meshRef.current.material.uniforms.uResolution.value.y = window.innerHeight
    })

    console.log(unifomrs.uResolution)


    return <>
        <mesh ref={meshRef} >
            <planeGeometry args={[1, 1]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={unifomrs} />
        </mesh>
    </>
}