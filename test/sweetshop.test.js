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
    
});