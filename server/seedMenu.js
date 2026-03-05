const mongoose = require('mongoose')
const MenuItem = require('./models/MenuItem')
require('dotenv').config()

// Sample menu items for PuffPuffMan
const menuItems = [
    // APPETIZERS
    {
        name: 'Puff Puff Bites',
        description: 'Golden fried dough balls, lightly sweetened and crispy on the outside, fluffy inside',
        price: 5.99,
        category: 'appetizers',
        image: 'https://via.placeholder.com/300/FFB6C1/000000?text=Puff+Puff+Bites',
        popular: true,
        available: true
    },
    {
        name: 'Plantain Chips',
        description: 'Crispy plantain chips served with spicy pepper sauce',
        price: 4.99,
        category: 'appetizers',
        available: true
    },
    {
        name: 'Suya Skewers',
        description: 'Spiced beef skewers with onions and tomatoes',
        price: 8.99,
        category: 'appetizers',
        popular: true,
        available: true
    },

    // MAINS
    {
        name: 'Jollof Rice Bowl',
        description: 'Smoky jollof rice with grilled chicken, plantains, and coleslaw',
        price: 14.99,
        category: 'mains',
        popular: true,
        available: true
    },
    {
        name: 'Waakye Platter',
        description: 'Rice and beans with spaghetti, gari, boiled egg, and shito sauce',
        price: 13.99,
        category: 'mains',
        available: true
    },
    {
        name: 'Banku & Tilapia',
        description: 'Grilled tilapia served with fermented corn dough and pepper sauce',
        price: 16.99,
        category: 'mains',
        available: true
    },

    // SIDES
    {
        name: 'Kelewele',
        description: 'Spicy fried plantains with ginger and pepper',
        price: 6.99,
        category: 'sides',
        available: true
    },
    {
        name: 'Fried Yam',
        description: 'Crispy fried yam served with pepper sauce',
        price: 5.99,
        category: 'sides',
        available: true
    },

    // DRINKS
    {
        name: 'Sobolo',
        description: 'Refreshing hibiscus drink with ginger and cloves',
        price: 3.99,
        category: 'drinks',
        popular: true,
        available: true
    },
    {
        name: 'Fresh Coconut Water',
        description: 'Chilled coconut water straight from the shell',
        price: 4.99,
        category: 'drinks',
        available: true
    },

    // DESSERTS
    {
        name: 'Chin Chin',
        description: 'Crunchy, sweet fried dough snacks',
        price: 4.99,
        category: 'desserts',
        available: true
    }
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