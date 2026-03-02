import React from 'react'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'



const OurStory = () => {

    useGSAP(() => {

        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({
            scrollTrigger: {

                trigger: ".paragraph",
                start: "50% bottom",
                end: "400 center",
                scrub: true,
                ease: "power2.in",
            }
        })

        tl.fromTo(".img", { duration: 1, x: 1000 },
            {
                x: 0,
            })
        tl.fromTo(".img2", { duration: 1, x: 1000 },
            {
                x: 0,
            })
        tl.fromTo(".img3", { duration: 1, x: 1000 },
            {
                x: 0,
            })
        tl.fromTo(".img4", { duration: 1, x: 1000 },
            {
                x: 0,
            })
    })

    let mm = gsap.matchMedia();
    let tl = gsap.timeline()

    mm.add("(max-width: 390px)", () => {

        gsap.registerPlugin(ScrollTrigger)

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".img",
                start: "top 200",
                end: "bottom 100",
                scrub: true
            }
        })

        tl.fromTo(".img", { x: 1000, duration: 1 }, {
            x: 0,
        })
        tl.fromTo(".img2", { x: 1000, duration: 1 }, {
            x: 0,
        })
        tl.fromTo(".img3", { x: 1000, duration: 1 }, {
            x: 0,
        })
        tl.fromTo(".img4", { x: 1000, duration: 1 }, {
            x: 0,
        })
    })



    return (
        <div id='ourstory' className='w-auto h-auto pb-40 bg-cyan-400 overflow-x-hidden md:pt-10'>
            <h1 className='headertext text-5xl md:text-7xl text-white text-center md:text-end md:pr-30 pt-20'>Our Story</h1>

            <div className='md:flex flex-row mx-auto pt-10 md:w-[90%]'>
                <p className='text-white font-light text-center text-xs md:text-xl p-8 md:w-1/2 md:pt-20 paragraph xl:text-3xl'>"Puff puff’s were always my favorite snack growing up as a kid in the UK. I remember relishing in anticipation to get my hands on some puff puff at our Nigerian functions and events. Now we want to share that same experience with  the rest of the world with our special family recipe that has been passed down from generations before us."</p>

                <div className='w-max mx-auto pt-10 relative'>
                    <div className="content absolute">
                        <div className="">
                            <img src={img1} className='h-80 rotate-8 img' />
                        </div>
                    </div>
                    <div className="content absolute">
                        <div className="">
                            <img src={img2} className='h-80 -rotate-12 img2' />
                        </div>
                    </div>
                    <div className="content absolute">
                        <div className="">
                            <img src={img3} className='h-80 rotate-6 img3' />
                        </div>
                    </div>
                    <div className="content relative">
                        <div className="">
                            <img src={img4} className='h-80 -rotate-8 img4' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OurStory

// (".img", {
//             x: 1000
//         },
//             {
//                 x: 0,
//                 scrollTrigger: {
//                     trigger: ".img",
//                     start: "top center",
//                     end: "bottom center",
//                     markers: true,
//                     scrub: true,
//                     duration: 1,
//                 }
//             })

//             .to(".img2", {
//                 x: 1000,
//             },
//                 {
//                     x: 0,
//                     scrollTrigger: {
//                         trigger: ".img2",
//                         start: "top center",
//                         end: "bottom center",
//                         markers: true,
//                         scrub: true,
//                         duration: 1,
//                     }
//                 }
//             )

//     })