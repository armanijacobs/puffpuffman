import React from 'react'
import puffanimated from '../assets/puffanimated.png'
import puffanimated2 from '../assets/puffanimated2.png'
import puffanimated3 from '../assets/puffanimated3.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Menu = () => {

    useGSAP(() => {

        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({

            scrollTrigger: {
                trigger: '.bg',
                duration: 10,
                start: 'top center',
                end: 'bottom -450',
                scrub: true,
            }
        })

        const tl2 = gsap.timeline({

            scrollTrigger: {
                trigger: '.bg',
                duration: 9,
                start: 'top center',
                end: 'bottom top',
                scrub: true,
            }
        })

        tl.fromTo('.puffanimated', { y: -80, x: 0, scale: 0 }, { y: 650, x: 100, rotate: '390deg', scale: 3 })

        tl2.fromTo('.puffanimated2', { y: 600, x: 0, scale: 2.5 }, { y: -650, x: -150, rotate: '90deg', scale: 0.2 })
    })


    useGSAP(() => {

        const tl3 = gsap.timeline()
        let mm = gsap.matchMedia();

        mm.add("(max-width: 390px)", () => {

            gsap.registerPlugin(ScrollTrigger)

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".bg",
                    duration: 8,
                    start: "top center",
                    end: "bottom center",
                    markers: true,
                    scrub: true,
                }
            })

            tl3.fromTo('.puffanimated3', { y: -60, x: 0, scale: 0 }, { y: 650, x: 0, rotate: '390deg', scale: 4 })
        })

    })



    return (
        <div id='menu' className='w-screen h-1/2 bg-amber-400 flex flex-col items-center pb-20 space-y-4 bg'>
            <div>
                <img src={puffanimated} className='h-20 absolute left-20 hidden md:flex puffanimated' />
            </div>

            <div>
                <img src={puffanimated2} className='h-20 absolute right-20 hidden md:flex puffanimated2' />
            </div>

            <div>
                <img src={puffanimated3} className='h-20 absolute right-20 md:hidden puffanimated3' />
            </div>

            <div className='text-center pt-8 z-1 menu'>
                <h1 className='text-5xl md:text-7xl headertext text-white'>Menu</h1>
            </div>

            <div className='text-center text-white z-1'>
                <h3 className='font-extrabold md:text-xl'>Special Offers</h3>
                <p className='text-sm md:text-lg'>4 Puff Puff 4 Toppings £3.50</p>
                <p className='text-xs font-extralight'>Includes all toppings listed, may contain nuts</p>
            </div>

            <div className='text-center text-white z-1'>
                <h3 className='font-extrabold md:text-xl'>Originals</h3>
                <p className='text-sm md:text-lg'>2 Puff Puff 4 £1.50</p>
                <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
            </div>

            <div className='text-center text-white z-1'>
                <p className='text-sm md:text-lg'>4 Puff Puff £3</p>
                <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
            </div>

            <div className='text-center text-white z-1'>
                <p className='text-sm md:text-lg'>6 Puff Puff £4.50</p>
                <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
            </div>

            <div className='text-center text-white z-1'>
                <h3 className='font-extrabold md:text-xl'>Toppings</h3>
                <p className='text-sm md:text-lg'>Chocolate £0.50</p>
                <p className='text-sm md:text-lg'>White Chocolate £0.50</p>
                <p className='text-sm md:text-lg'>Maple Syrup £0.50</p>
                <p className='text-sm md:text-lg'>Icing Sugar £0.50</p>
            </div>

        </div>
    )
}

export default Menu