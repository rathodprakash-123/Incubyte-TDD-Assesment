class SweetShop{
    constructor(){
        this.sweets = [];
    }
    addSweet(sweet){
        const { id, name, category, price, quantity } = sweet;

        // valid input 
        if( !id || !name || !category || price<0 || quantity<0){
            throw new Error("Inavalid sweet Data");   
        }
        // check unique ID
        const exists = this.sweets.find(s => s.id == id);
        if (exists) {
        throw new Error("Sweet with this ID already exists.");
        }
        this.sweets.push({ id, name, category, price, quantity });
    }
    getAllSweets(){
        return this.sweets
    }
}
module.exports = SweetShop;