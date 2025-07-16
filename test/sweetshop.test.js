const SweetShop = require("../src/sweetshop");

describe('SweetShop',()=>{
    let shop;
    
    beforeEach(()=>{
        shop = new SweetShop();
    });
    
    test("Shoud add Sweet",()=>{
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
    
});