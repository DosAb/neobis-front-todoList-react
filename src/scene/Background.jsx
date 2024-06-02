import { useRef, useEffect, useMemo } from 'react'
import { events, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import fragmentShader from './materials/backgroundMaterial/fragment.glsl'
import vertexShader from './materials/backgroundMaterial/vertex.glsl'

import useColor from '../stores/useColor'


export default function Background()
{
    // const [color, setColor] = useState(useColor((state)=>{ return state.color }))

    const meshRef = useRef()

    const uniforms = {
        uTime: {value: 0},
        uResolution: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
        uColor: {value: new THREE.Vector3(0)}
    }

    window.addEventListener('click', (event)=>{
        const categoryInput = event.target.closest('.category__radio:checked')

        if(categoryInput.classList.contains('personal-radio')) {
            meshRef.current.material.uniforms.uColor.value.y = 1.0
            meshRef.current.material.uniforms.uColor.value.z = 0.5

        }else  {
            meshRef.current.material.uniforms.uColor.value.y = 0.0
            meshRef.current.material.uniforms.uColor.value.z = 0.0
        }
    })

    useFrame((state, delta)=>{
        meshRef.current.material.uniforms.uTime.value += delta * 0.3
    })

    window.addEventListener('resize', ()=>{
        meshRef.current.material.uniforms.uResolution.value.x = window.innerWidth
        meshRef.current.material.uniforms.uResolution.value.y = window.innerHeight
    })

    return <>
        <mesh ref={meshRef} >
            <planeGeometry args={[1, 1]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    </>
}