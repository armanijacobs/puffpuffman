import React from 'react'
import GoogleReviewsWidget from 'google-reviews-widget'

const Reviews = () => {
    return (
        <div id='reviews' className='bg-white w-screen h-auto mb-35'>
            <h1 className='headertext text-5xl md:text-7xl text-cyan-300 pt-5 mx-25 md:mx-15 mb-25'></h1>

            <GoogleReviewsWidget instanceId='sTrfWwlYZ2cK9Ld6mwQ7' />
        </div>
    )
}

export default Reviews