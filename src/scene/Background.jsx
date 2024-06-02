import { useRef, useEffect, useMemo } from 'react'
import { events, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import fragmentShader from './materials/backgroundMaterial/fragment.glsl'
import vertexShader from './materials/backgroundMaterial/vertex.glsl'

import useColor from '../stores/useColor'
import gsap from 'gsap'


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

        if(categoryInput && categoryInput.classList.contains('personal-radio')) {
            gsap.to(meshRef.current.material.uniforms.uColor.value, {
                y: 1.0,
                z: 0.5,
                duration: 0.5,
                ease: 'power2'
            })

        }else  {
            gsap.to(meshRef.current.material.uniforms.uColor.value, {
                y: 0.0,
                z: 0.0,
                duration: 0.5,
                ease: 'power2'
            })
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