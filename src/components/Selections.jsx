import React from 'react'
import cloudes from '../assets/cloudes.png'
import cloudes2 from '../assets/cloudes2.png'
import Carousel from './Carousel.jsx'

const Selections = () => {
    return (
        <div id='selections' className='w-screen mx-auto'>

            <div className='absolute xl:top-130'>
                <img src={cloudes} className='-translate-y-13 md:-translate-y-34' />
            </div>

            <div className='relative pt-15 z-2'>
                <Carousel />
            </div>

            <div className='relative text-center sm:text-lg md:text-7xl top-13 sm:top-40 z-1'>
                <h1 className='landingtext text-cyan-700 z-1'>PLACE AN ORDER BELOW! <br /> ↓ </h1>
            </div>

            <div className='relative xl:-bottom-60 z-2'>
                <img src={cloudes2} className='relative translate-y-13 md:translate-y-40 xl:-translate-y-11 rotate-180 z-2'></img>
            </div>

        </div >

    )
}

export default Selections