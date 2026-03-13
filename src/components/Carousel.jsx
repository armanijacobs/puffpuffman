import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import whitechoco from '../assets/whitechoco.png'
import darkchoco from '../assets/darkchoco.png'
import toffeesauce from '../assets/toffeesauce.png'
import rasberry from '../assets/rasberry.png'
import variety from '../assets/variety.png'


function Carousel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    return (
        <div className='mx-4'>
            <Slider {...settings}>
                <div className='text-center'>
                    <img src={toffeesauce} className='h-70 md:h-155 m-auto' />
                    <h2 className=''>Biscoff Topping Puff Puffs</h2>
                    <p className='font-light text-xs'>Fluffy Golden Puff Puffs drizzled with biscoff sauce</p>
                </div>
                <div className='text-center'>
                    <img src={darkchoco} className='h-70 md:h-155 m-auto' />
                    <h2 className=''>Milk Chocolate Puff Puffs</h2>
                    <p className='font-light text-xs'>Fluffy Golden Puff Puffs drizzled with milk chocolate sauce</p>
                </div>
                <div className='text-center'>
                    <img src={whitechoco} className='h-70 md:h-155 m-auto' />
                    <h2 className=''>White Chocolate Puff Puffs</h2>
                    <p className='font-light text-xs'>Fluffy Golden Puff Puffs drizzled with white chocolate</p>
                </div>
                <div className='text-center'>
                    <img src={variety} className='h-70 md:h-155 m-auto' />
                    <h2 className=''>Variety of Puff Puffs</h2>
                    <p className='font-light text-xs'>Fluffy Golden Puff Puffs drizzled with any sauce of your liking</p>
                </div>
                <div className='text-center'>
                    <img src={rasberry} className='h-70 md:h-155 m-auto' />
                    <h2 className=''>Rasberry Sauce Puff Puffs</h2>
                    <p className='font-light text-xs'>Fluffy Golden Puff Puffs drizzled with rasberry sauce</p>
                </div>
            </Slider>
        </div>
    )
}

export default Carousel



