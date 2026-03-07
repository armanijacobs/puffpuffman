import React from 'react'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import puffanimated from '../assets/puffanimated.png'
import puffanimated2 from '../assets/puffanimated2.png'
import puffanimated3 from '../assets/puffanimated3.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const OurStory = () => {

    // Desktop image slide-in animation
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".paragraph",
                start: "50% bottom",
                end: "400 center",
                scrub: true,
            }
        });

        tl.fromTo(".img", { x: 1000 }, { x: 0, duration: 1 })
            .fromTo(".img2", { x: 1000 }, { x: 0, duration: 1 })
            .fromTo(".img3", { x: 1000 }, { x: 0, duration: 1 })
            .fromTo(".img4", { x: 1000 }, { x: 0, duration: 1 });
    });

    // Mobile image slide-in animation
    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(max-width: 390px)", () => {
            gsap.registerPlugin(ScrollTrigger);

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".img",
                    start: "top 200",
                    end: "bottom 100",
                    scrub: true
                }
            });

            tl.fromTo(".img", { x: 1000 }, { x: 0, duration: 1 })
                .fromTo(".img2", { x: 1000 }, { x: 0, duration: 1 })
                .fromTo(".img3", { x: 1000 }, { x: 0, duration: 1 })
                .fromTo(".img4", { x: 1000 }, { x: 0, duration: 1 });
        });
    });

    // ✅ FLOATING PUFF PUFF ANIMATIONS (NO SCROLL)
    useGSAP(() => {
        // Gentle float - left puff puff
        gsap.to('.puffanimated', {
            y: -20,
            x: 10,
            rotation: 15,
            duration: 3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Gentle float - right puff puff
        gsap.to('.puffanimated2', {
            y: 20,
            x: -10,
            rotation: -15,
            duration: 3.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.5
        });
    });

    // Mobile puff puff float
    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(max-width: 390px)", () => {
            gsap.to('.puffanimated3', {
                y: -15,
                rotation: 10,
                duration: 2.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    });

    return (
        <div id='ourstory' className='w-auto h-auto pb-40 bg-cyan-400 overflow-x-hidden md:pt-10 relative'>

            {/* Floating Puff Puff Images */}
            <img src={puffanimated} className='h-20 absolute left-20 top-20 hidden md:flex puffanimated z-10' alt="puff 1" />
            <img src={puffanimated2} className='h-20 absolute right-20 top-20 hidden md:flex puffanimated2 z-10' alt="puff 2" />
            <img src={puffanimated3} className='h-20 absolute right-20 top-20 md:hidden puffanimated3 z-10' alt="puff 3" />

            <h1 className='headertext text-5xl md:text-7xl text-white text-center md:text-end md:pr-30 pt-20'>Our Story</h1>

            <div className='md:flex flex-row mx-auto pt-10 md:w-[90%]'>
                <p className='text-white font-light text-center text-xs md:text-xl p-8 md:w-1/2 md:pt-20 paragraph xl:text-3xl'>
                    "Puff puff's were always my favorite snack growing up as a kid in the UK. I remember relishing in anticipation to get my hands on some puff puff at our Nigerian functions and events. Now we want to share that same experience with the rest of the world with our special family recipe that has been passed down from generations before us."
                </p>

                <div className='w-max mx-auto pt-10 relative'>
                    <div className="content absolute">
                        <img src={img1} className='h-80 rotate-8 img' alt="story 1" />
                    </div>
                    <div className="content absolute">
                        <img src={img2} className='h-80 -rotate-12 img2' alt="story 2" />
                    </div>
                    <div className="content absolute">
                        <img src={img3} className='h-80 rotate-6 img3' alt="story 3" />
                    </div>
                    <div className="content relative">
                        <img src={img4} className='h-80 -rotate-8 img4' alt="story 4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory