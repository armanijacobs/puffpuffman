import React from 'react'

const FindUs = () => {
    return (
        <div className='h-auto w-screen flex flex-col items-center justify-center space-y-10 pb-25'>
            <div className='space-y-6'>
                <h1 className='headertext text-5xl text-center text-cyan-400'>Never Miss A Mouthful..</h1>
                <p className='headertext text-cyan-400 text-xs text-center px-10 md:text-xl'>By suscribing, you'll recieve exciting new product and flavour announcements plus exlusive details and promotions. No junk, just puff.</p>
            </div>
            <div className='text-center'>
                <input className='border-cyan-400 border-2 font-semibold text-center' type="text" placeholder='Email Address..' />

                <button className='bg-cyan-400 border-cyan-400 border-2 text-white '>Suscribe</button>
            </div>
        </div>
    )
}

export default FindUs