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

        <div className='bg-amber-400 bg'>
            <div id='menu' className="container p-6 w-screen mx-auto">
                <h1 className="headertext text-5xl md:text-7xl font-bold mb-8 text-white text-center">Menu</h1>

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
