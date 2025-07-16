const SweetShop = require("../src/sweetshop");

describe('SweetShop',()=>{
    let shop;
    
    beforeEach(()=>{
        shop = new SweetShop();
    });

    // addSweet() testing
    test('Shoud add Sweet',()=>{
        const sweet = {
            id:'1001',
            name: 'Kaju Katli',
            category: 'Nut-Based',
            price: 50,
            quantity: 10,
        };
        shop.addSweet(sweet);
        const all = shop.getAllSweets();
        expect(all.length).toBe(1);
        expect(all[0].name).toBe('Kaju Katli');
    });
    test('throws erroron duplicate sweet ID', () => {
        const sweet = { id: '1', name: 'Barfi', category: 'Milk', price: 15, quantity: 10 };
        shop.addSweet(sweet);
        expect(() => shop.addSweet(sweet)).toThrow("Sweet with this ID already exists.");
    });
    // deleteSweet() testing
    test('deletes a sweet successfully', () => {
        shop.addSweet({ id: '2', name: 'Kaju Katli', category: 'Nut', price: 20, quantity: 10 });
        shop.deleteSweet('2');
        expect(shop.getAllSweets().length).toBe(0);
    });

    test('throws when deleting non-existent sweet', () => {
        expect(() => shop.deleteSweet('999')).toThrow("Sweet not found with given ID.");
    });

    // Searchby name,category, price-range testing
    test('searches by name', () => {
        shop.addSweet({ id: '3', name: 'Rasgulla', category: 'Milk', price: 25, quantity: 10 });
        const results = shop.searchByName('ras');
        expect(results.length).toBe(1);
    });

    test('searches by category', () => {
        shop.addSweet({ id: '4', name: 'Jalebi', category: 'Sugar', price: 30, quantity: 15 });
        const results = shop.searchByCategory('sugar');
        expect(results[0].name).toBe('Jalebi');
    });

    test('searches by price range', () => {
        shop.addSweet({ id: '5', name: 'Halwa', category: 'Sweet', price: 40, quantity: 5 });
        const results = shop.searchByPriceRange(30, 50);
        expect(results[0].name).toBe('Halwa');
    });
    
        // sortBy() testing
    test('sorts sweets by price ascending', () => {
        shop.addSweet({ id: '6', name: 'Barfi', category: 'Milk', price: 15, quantity: 3 });
        shop.addSweet({ id: '7', name: 'Gulab Jamun', category: 'Milk', price: 25, quantity: 3 });
        const sorted = shop.sortBy('price', 'asc');
        expect(sorted[0].price).toBe(15);
    });

    // Purchase testing
    test('purchases sweet and reduces stock', () => {
        shop.addSweet({ id: '8', name: 'Peda', category: 'Milk', price: 10, quantity: 10 });
        shop.purchaseSweet('8', 4);
        expect(shop.getAllSweets()[0].quantity).toBe(6);
    });
    
    test('throws on insufficient stock purchase', () => {
        shop.addSweet({ id: '9', name: 'Candy', category: 'Hard', price: 5, quantity: 2 });
        expect(() => shop.purchaseSweet('9', 5)).toThrow("Only 2 in stock. Cannot complete purchase.");
    });  
});