const mongoose = require('mongoose')
const MenuItem = require('./models/MenuItem')
require('dotenv').config()

// Sample menu items for PuffPuffMan
const menuItems = [
    // ORIGINALS
    {
        name: '2 Puff Puff Bites',
        description: '2 Golden fried dough balls, lightly sweetened and crispy on the outside, fluffy inside',
        price: 3.00,
        category: 'originals',
        image: '/public/images/Plain_Puff_Puff_1.jpg',
        popular: true,
        available: true
    },
    {
        name: '4 Puff Puff Bites',
        description: '4 Golden fried dough balls, lightly sweetened and crispy on the outside, fluffy inside',
        price: 5.00,
        category: 'originals',
        image: '/public/images/Plain_Puff_Puff_1.jpg',
        available: true
    },
    {
        name: '6 Puff Puff Bites',
        description: '6 Golden fried dough balls, lightly sweetened and crispy on the outside, fluffy inside',
        price: 7.00,
        category: 'originals',
        image: '/public/images/Plain_Puff_Puff_1.jpg',
        popular: true,
        available: true
    },

    // TOPPINGS
    {
        name: 'Chocolate',
        description: 'Choco sauce drizzled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Chocolate,_White_Chocolate_Puff_Puff.jpg',
        popular: true,
        available: true
    },
    {
        name: 'White Chocolate',
        description: 'White chocolate sauce drizzled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Chocolate,_White_Chocolate_Puff_Puff.jpg',
        available: true
    },
    {
        name: 'Rasberry',
        description: 'Rasberry sauce drizzled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Valentines_Puff_Puff.jpg',
        available: true
    },
    {
        name: 'Golden Syrup',
        description: 'Silky golden syrup squirted all over',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Golden_Syrup_Puff_Puff_1.jpg',
        available: true
    },
    {
        name: 'Cinnamon Sugar',
        description: 'Sprinkled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Plain_Puff_Puff_1.jpg',
        available: true
    },
    {
        name: 'Iced Sugar',
        description: 'Sprinkled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Icing_Sugar_Puff_Puff_1.jpg',
        available: true
    },
    {
        name: 'Biscoff',
        description: 'Crumbled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Biscoff,_White_Chocolate_Puff_Puff_1.jpg',
        available: true
    },
    {
        name: 'Hersheys',
        description: 'Crumbled on top',
        price: 0.50,
        category: 'toppings',
        image: '/public/images/Chocolate,_White_Chocolate,_Oreo_Puff_Puff_1.jpg',
        available: true
    },




    // DRINKS
    {
        name: 'Rubicon',
        description: 'Canned beverage',
        price: 1.50,
        category: 'drinks',
        available: true
    },
    {
        name: 'Coca-cola',
        description: 'Canned beverage',
        price: 1.50,
        category: 'drinks',
        available: true
    },
    {
        name: 'Fanta',
        description: 'Canned beverage',
        price: 1.50,
        category: 'drinks',
        available: true
    },
    {
        name: 'Sprite',
        description: 'Canned beverage',
        price: 1.50,
        category: 'drinks',
        available: true
    },

    // SPECIAL OFFERS
    {
        name: '6 Puff Puff, 4 Toppings',
        description: 'A deal you cannot miss',
        price: 7.00,
        category: 'special offers',
        image: '/public/images/Oreo_Biscoff_Fusion_Puff_Puff_2.jpg',
        popular: true,
        available: true
    },
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing menu items
        await MenuItem.deleteMany({});
        console.log('🗑️  Cleared old menu items');

        // Insert new menu items
        await MenuItem.insertMany(menuItems);
        console.log(`✅ Added ${menuItems.length} menu items`);

        // Close connection
        await mongoose.connection.close();
        console.log('👋 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();