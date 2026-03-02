import React from 'react'
import puffpufflogo from '../assets/puffpuff-logo.png'
import { BiMenu } from 'react-icons/bi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-scroll'



const Navbar = () => {

    useGSAP(() => {

        gsap.registerPlugin(ScrollTrigger)


        gsap.set('.nav-bg', {
            backgroundColor: 'cyan-400',
            opacity: 0,
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                start: 'top+=200',
                toggleActions: 'play none none reverse',
                scrub: 1
            }
        })

        tl.to('.nav-bg', {
            opacity: 1,

        })
    })

    return (
        <>
            <div className='w-screen h-14 flex justify-between items-center p-4 mt-3 md:mt-7 fixed font-[Roboto] font-light text-white z-30'>


                <Link to="landingpage" smooth={true} duration={500}>
                    <img src={puffpufflogo} className='h-7 md:h-16 md:pl-4' />
                </Link>

                <ul className='w-3/4 hidden md:flex justify-around'>
                    <li>
                        <Link to="landingpage" smooth={true} duration={500}>Home</Link>
                    </li>
                    <li>
                        <Link to="selections" smooth={true} duration={500}>Selections</Link>
                    </li>
                    <li>
                        <Link to="ourstory" smooth={true} duration={500}>Our Story</Link>
                    </li>
                    <li>
                        <Link to="menu" smooth={true} duration={500}>Menu</Link>
                    </li>
                    <li>
                        <Link to="reviews" smooth={true} duration={500}>Reviews</Link>
                    </li>
                </ul>

                <BiMenu className='md:hidden h-6 w-6 -translate-x-4' />
                <div className='nav-bg bg-cyan-400 w-screen h-26 -z-1 absolute -top-8 left-0'></div>

            </div >

        </>
    )
}

export default Navbar