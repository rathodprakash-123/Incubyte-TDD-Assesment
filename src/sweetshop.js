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
    //  Delete Sweet by ID
    deleteSweet(id) {
        const initialLength = this.sweets.length;
        this.sweets = this.sweets.filter(s => s.id != id);

        if (this.sweets.length === initialLength) {
        throw new Error("Sweet not found with given ID.");
        }
    }
    // Search by Name
    searchByName(name) {
        return this.sweets.filter(s =>
        s.name.toLowerCase().includes(name.toLowerCase())
        );
    }
        // Search by Category
    searchByCategory(category) {
        return this.sweets.filter(s =>
        s.category.toLowerCase() === category.toLowerCase()
        );
    }
    // Search by Price Range
    searchByPriceRange(minPrice, maxPrice) {
        return this.sweets.filter(s =>
        s.price >= minPrice && s.price <= maxPrice
        );
    }
        // Sort Sweets
    sortBy(field, order = 'asc') {
        const validFields = ['name', 'category', 'price', 'quantity'];
        if (!validFields.includes(field)) {
        throw new Error(`Cannot sort by "${field}"`);
        }

        const sorted = [...this.sweets].sort((a, b) => {
        if (typeof a[field] === 'string') {
            return a[field].localeCompare(b[field]);
        } else {
            return a[field] - b[field];
        }
        });

        return order === 'desc' ? sorted.reverse() : sorted;
    }
        // Purchase Sweet
    purchaseSweet(id, quantity) {
        const sweet = this.sweets.find(s => s.id == id);
        if (!sweet) throw new Error("Sweet not found.");
        if (quantity <= 0) throw new Error("Quantity must be greater than zero.");
        if (sweet.quantity < quantity) {
        throw new Error(`Only ${sweet.quantity} in stock. Cannot complete purchase.`);
        }

        sweet.quantity -= quantity;
    }
}
module.exports = SweetShop;