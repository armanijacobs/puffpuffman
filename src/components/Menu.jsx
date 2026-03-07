// import React from 'react'


// const Menu = () => {





//     return (
//         <div id='menu' className='w-screen h-1/2 bg-amber-400 flex flex-col items-center pb-20 space-y-4 bg'>
//           

//             <div className='text-center pt-8 z-1 menu'>
//                 <h1 className='text-5xl md:text-7xl headertext text-white'>Menu</h1>
//             </div>

//             <div className='text-center text-white z-1'>
//                 <h3 className='font-extrabold md:text-xl'>Special Offers</h3>
//                 <p className='text-sm md:text-lg'>4 Puff Puff 4 Toppings £3.50</p>
//                 <p className='text-xs font-extralight'>Includes all toppings listed, may contain nuts</p>
//             </div>

//             <div className='text-center text-white z-1'>
//                 <h3 className='font-extrabold md:text-xl'>Originals</h3>
//                 <p className='text-sm md:text-lg'>2 Puff Puff 4 £1.50</p>
//                 <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
//             </div>

//             <div className='text-center text-white z-1'>
//                 <p className='text-sm md:text-lg'>4 Puff Puff £3</p>
//                 <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
//             </div>

//             <div className='text-center text-white z-1'>
//                 <p className='text-sm md:text-lg'>6 Puff Puff £4.50</p>
//                 <p className='text-xs font-extralight'>Toppings not included, may contain nuts</p>
//             </div>

//             <div className='text-center text-white z-1'>
//                 <h3 className='font-extrabold md:text-xl'>Toppings</h3>
//                 <p className='text-sm md:text-lg'>Chocolate £0.50</p>
//                 <p className='text-sm md:text-lg'>White Chocolate £0.50</p>
//                 <p className='text-sm md:text-lg'>Maple Syrup £0.50</p>
//                 <p className='text-sm md:text-lg'>Icing Sugar £0.50</p>
//             </div>

//         </div>
//     )
// }

// export default Menu

import { useState, useEffect } from 'react';
import { getMenuItems, getMenuByCategory, addToCart } from '../services/api';
import puffanimated from '../assets/puffanimated.png'
import puffanimated2 from '../assets/puffanimated2.png'
import puffanimated3 from '../assets/puffanimated3.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');


    // Fetch menu when component loads
    useEffect(() => {
        fetchMenu();
    }, [selectedCategory]);

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

    const fetchMenu = async () => {
        try {
            setLoading(true);
            let data;

            if (selectedCategory === 'all') {
                data = await getMenuItems();
            } else {
                data = await getMenuByCategory(selectedCategory);
            }

            setMenuItems(data);
            setError(null);
        } catch (err) {
            setError('Failed to load menu. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (menuItemId) => {
        try {
            await addToCart(menuItemId, 1);
            alert('Added to cart!'); // Replace with better UI later
        } catch (err) {
            alert('Failed to add to cart');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="text-center p-8">Loading menu...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }


    return (

        <div className='bg-amber-400'>
            <div id='menu' className="container p-6 w-screen mx-auto">
                <h1 className="headertext text-5xl md:text-7xl font-bold mb-8 text-white text-center">Menu</h1>

                {/* Image Animation */}
                <div>
//                 <img src={puffanimated} className='h-20 absolute left-20 hidden md:flex puffanimated' />
//             </div>

//             <div>
//                 <img src={puffanimated2} className='h-20 absolute right-20 hidden md:flex puffanimated2' />
//             </div>

//             <div>
//                 <img src={puffanimated3} className='h-20 absolute right-20 md:hidden puffanimated3' />
//             </div>

                {/* Category Filter */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedCategory('originals')}
                        className={`px-4 py-2 rounded ${selectedCategory === 'originals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Originals
                    </button>
                    <button
                        onClick={() => setSelectedCategory('toppings')}
                        className={`px-4 py-2 rounded ${selectedCategory === 'toppings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Toppings
                    </button>
                    <button
                        onClick={() => setSelectedCategory('special offers')}
                        className={`px-4 py-2 rounded ${selectedCategory === 'special offers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Special Offers
                    </button>
                </div>

                {/* Custom Hybrid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 bg-amber-400">
                    {menuItems.map(item => (
                        <div
                            key={item._id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                        >
                            {/* Image Container with Badge */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Popular Badge */}
                                {item.popular && (
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                                            ⭐ Popular
                                        </span>
                                    </div>
                                )}

                                {/* Category Tag */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Quick Add Overlay (Desktop) */}
                                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(item._id);
                                        }}
                                        className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform shadow-xl hover:bg-blue-500 hover:text-white"
                                    >
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 md:p-4">
                                {/* Name */}
                                <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </h3>

                                {/* Description */}
                                <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Price & Add Button */}
                                <div className="flex items-center justify-between gap-2">
                                    {/* Price */}
                                    <div className="flex flex-col">
                                        <span className="text-lg md:text-xl font-bold text-green-600">
                                            £{item.price.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Add Button (Mobile) */}
                                    <button
                                        onClick={() => handleAddToCart(item._id)}
                                        className="md:hidden bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition font-medium text-sm shadow-md active:scale-95"
                                    >
                                        Add
                                    </button>

                                    {/* Add Button (Desktop - subtle) */}
                                    <button
                                        onClick={() => handleAddToCart(item._id)}
                                        className="hidden md:block bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium text-sm shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {menuItems.length === 0 && (
                    <p className="text-center text-gray-500">No items found in this category.</p>
                )}
            </div>
        </div>
    );
}

export default Menu;
