class SweetShop{
    constructor(){
        this.sweets = [];
    }
    addSweet(sweet){
        this.sweets.push(sweet);
    }
    getAllSweets(){
        return this.sweets
    }
}
module.exports = SweetShop;