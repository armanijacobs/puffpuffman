import React from 'react'
import cloudes from '../assets/cloudes.png'
import cloudes2 from '../assets/cloudes2.png'
import Carousel from './Carousel.jsx'

const Selections = () => {
    return (
        <div id='selections' className='w-screen mx-auto '>

            <div className='absolute xl:top-130'>
                <img src={cloudes} className='-translate-y-13 md:-translate-y-34' />
            </div>

            <div className='relative pt-15 z-2'>
                <Carousel />
            </div>

            <div className='relative xl:-bottom-60'>
                <img src={cloudes2} className='translate-y-13 md:translate-y-40 xl:-translate-y-11 z-1 rotate-180' />
            </div>

        </div >

    )
}

export default Selections