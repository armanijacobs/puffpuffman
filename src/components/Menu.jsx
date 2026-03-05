// import React from 'react'
// import puffanimated from '../assets/puffanimated.png'
// import puffanimated2 from '../assets/puffanimated2.png'
// import puffanimated3 from '../assets/puffanimated3.png'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'

// const Menu = () => {

//     useGSAP(() => {

//         gsap.registerPlugin(ScrollTrigger)

//         const tl = gsap.timeline({

//             scrollTrigger: {
//                 trigger: '.bg',
//                 duration: 10,
//                 start: 'top center',
//                 end: 'bottom -450',
//                 scrub: true,
//             }
//         })

//         const tl2 = gsap.timeline({

//             scrollTrigger: {
//                 trigger: '.bg',
//                 duration: 9,
//                 start: 'top center',
//                 end: 'bottom top',
//                 scrub: true,
//             }
//         })

//         tl.fromTo('.puffanimated', { y: -80, x: 0, scale: 0 }, { y: 650, x: 100, rotate: '390deg', scale: 3 })

//         tl2.fromTo('.puffanimated2', { y: 600, x: 0, scale: 2.5 }, { y: -650, x: -150, rotate: '90deg', scale: 0.2 })
//     })


//     useGSAP(() => {

//         const tl3 = gsap.timeline()
//         let mm = gsap.matchMedia();

//         mm.add("(max-width: 390px)", () => {

//             gsap.registerPlugin(ScrollTrigger)

//             const tl3 = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: ".bg",
//                     duration: 8,
//                     start: "top center",
//                     end: "bottom center",
//                     markers: true,
//                     scrub: true,
//                 }
//             })

//             tl3.fromTo('.puffanimated3', { y: -60, x: 0, scale: 0 }, { y: 650, x: 0, rotate: '390deg', scale: 4 })
//         })

//     })



//     return (
//         <div id='menu' className='w-screen h-1/2 bg-amber-400 flex flex-col items-center pb-20 space-y-4 bg'>
//             <div>
//                 <img src={puffanimated} className='h-20 absolute left-20 hidden md:flex puffanimated' />
//             </div>

//             <div>
//                 <img src={puffanimated2} className='h-20 absolute right-20 hidden md:flex puffanimated2' />
//             </div>

//             <div>
//                 <img src={puffanimated3} className='h-20 absolute right-20 md:hidden puffanimated3' />
//             </div>

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

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fetch menu when component loads
    useEffect(() => {
        fetchMenu();
    }, [selectedCategory]);

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
        <div id='menu' className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">Our Menu</h1>

            {/* Category Filter */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setSelectedCategory('appetizers')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'appetizers' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Appetizers
                </button>
                <button
                    onClick={() => setSelectedCategory('mains')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'mains' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Mains
                </button>
                <button
                    onClick={() => setSelectedCategory('sides')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'sides' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Sides
                </button>
                <button
                    onClick={() => setSelectedCategory('drinks')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'drinks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Drinks
                </button>
                <button
                    onClick={() => setSelectedCategory('desserts')}
                    className={`px-4 py-2 rounded ${selectedCategory === 'desserts' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Desserts
                </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-green-600">
                                £{item.price.toFixed(2)}
                            </span>
                            <button
                                onClick={() => handleAddToCart(item._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                        {item.popular && (
                            <span className="inline-block mt-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                                ⭐ Popular
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {menuItems.length === 0 && (
                <p className="text-center text-gray-500">No items found in this category.</p>
            )}
        </div>
    );
}

export default Menu;
