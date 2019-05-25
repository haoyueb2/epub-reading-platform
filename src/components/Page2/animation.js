import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import flatten from 'lodash-es/flatten'
import { SVGLoader as loader } from './SVGLoader'
import { useTransition, a } from 'react-spring/three'
import './styles.css'

function svgLoader(id) {
    const svgResource = new Promise(resolve =>
        new loader().load(id+'.svg', shapes =>
            resolve(flatten(shapes.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
        )
    );
    return svgResource;
}


function Scene(props) {
    console.log(props.id);
    const [shapes, set] = useState([]);
    //useEffect(() => void svgLoader(1).then(set), []);
    const [show, toggle] = useState(true);
    useEffect(() => void setInterval(() => toggle(show => !show), 2000), []);
    useEffect(() => void (!show ? set([]) : svgLoader(1).then(set)), [show]);

    const transitions = useTransition(shapes, item => item.shape.uuid, {
        from: { position: [-50, 0, 0], rotation: [0, -0.6, 0], opacity: 0 },
        enter: { position: [0, 0, 0], rotation: [0, 0.3, 0], opacity: 1 },
        leave: { position: [50, 0, 0], rotation: [0, 0.6, 0], opacity: 0 },
        order: ['leave', 'enter', 'update'],
        lazy: true,
        trail: 5,
        unique: true,
        reset: true,
    })
    const deg = THREE.Math.degToRad;
    return (
        <a.group position={[500, -400, 0]} rotation={[0, deg(180), 0]}>
            {transitions.map(({ item: { shape, color, index }, key, props: { opacity, position, rotation } }) => (
                <a.mesh key={key} rotation={rotation} position={position.interpolate((x, y, z) => [x, y, 0])}>
                    <a.meshPhongMaterial
                        attach="material"
                        color={color}
                        opacity={opacity}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                        transparent
                    />
                    <shapeBufferGeometry attach="geometry" args={[shape]} />
                </a.mesh>
            ))}
        </a.group>
    )
}
export  default  class Animation extends  React.Component  {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="main">
                <Canvas
                    camera={{
                        fov: 90,
                        position: [0, 0, 500],
                        rotation: [0, 0, THREE.Math.degToRad(180)],
                        near: 0.1,
                        far: 20000,
                    }}>
                    <ambientLight intensity={0.5}/>
                    <spotLight intensity={0.5} position={[300, 300, 4000]}/>
                    <Scene id = {this.props.id}/>
                </Canvas>
            </div>
        )
    }
}

