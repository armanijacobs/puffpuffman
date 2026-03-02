import React from 'react'
import puffanimated from '../assets/puffanimated.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
const LandingPage = () => {

    useGSAP(() => {

        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.screentrigg',
                scrub: true
            }
        })

        tl.to('.puffrotate',
            { rotate: '430deg', duration: 1 })

    })


    return (
        <div id='landingpage' className='bg-cyan-400 w-screen screentrigg'>
            <h1 className='p-14 translate-y-2 md:p-27 text-6xl md:text-9xl text-white text-center landingtext'>Fresh, <br /> Fluffy, <br /> Delici
                <span>
                    <img src={puffanimated} className='h-14 md:h-28 inline-flex puffrotate' />
                </span>us!</h1>

        </div >
    )
}

export default LandingPage