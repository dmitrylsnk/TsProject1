// 1 типи товарів 
// Базовий тип товару
type BaseProduct = {
    id: number;
    name: string;
    price: number;
};

// Специфічні типи
type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number; // місяць
    brand: string;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: 'S' | 'M' | 'L' | 'XL';
    material: string;
};

type Book = BaseProduct & {
    category: 'book';
    author: string;
    pages: number;
};

// 2 функцій для пошуку та фільтрації

// пошук товару за idб generic для того щоб повертати правильний тип який нам потрібен
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

// фільтрація товарів за ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

// 3 кошик  generic
type CartItem<T> = {
    product: T;
    quantity: number;
};

// додавання товару до кошика(якщо товар є - збільшуємо кількість, якщо ні - додаємо новий)
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
        const newCart = [...cart];
        const existing = newCart[existingItemIndex];
        if (existing) {
            existing.quantity += quantity;
        }
        return newCart;
    }

    return [...cart, { product, quantity }];
};

// загальна вартость
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// 4 функцій 

// тестові дані
const phones: Electronics[] = [
    { id: 1, name: "iPhone 15", price: 35000, category: 'electronics', warrantyPeriod: 12, brand: "Apple" },
    { id: 2, name: "Samsung S24", price: 32000, category: 'electronics', warrantyPeriod: 24, brand: "Samsung" }
];

const tshirts: Clothing[] = [
    { id: 3, name: "White T-Shirt", price: 500, category: 'clothing', size: 'M', material: "Cotton" },
    { id: 4, name: "Jeans", price: 1500, category: 'clothing', size: 'L', material: "Denim" }
];

console.log("--- Тест пошуку ---");
const foundPhone = findProduct(phones, 1);
console.log("Знайдено телефон:", foundPhone); // програма знає що це Electronics

const foundShirt = findProduct(tshirts, 3);
console.log("Знайдено футболку:", foundShirt); // программа знаєщо це Clothing

console.log("\n--- Тест фільтрації ---");
const cheapPhones = filterByPrice(phones, 33000);
console.log("Телефони дешевше 33000:", cheapPhones);

console.log("\n--- Тест кошика ---");
// новий кошик для електроніки
let electronicsCart: CartItem<Electronics>[] = [];

if (foundPhone) {
    // додаємо 1 телефон
    electronicsCart = addToCart(electronicsCart, foundPhone, 1);
    // додаємо ще 2 таких самих
    electronicsCart = addToCart(electronicsCart, foundPhone, 2); 
}

console.log("Кошик електроніки:", electronicsCart);
console.log("Загальна вартість:", calculateTotal(electronicsCart));

// створюємо змішаний кошик через BaseProduct
let mixedCart: CartItem<BaseProduct>[] = [];
if (foundShirt) mixedCart = addToCart(mixedCart, foundShirt, 5);
if (foundPhone) mixedCart = addToCart(mixedCart, foundPhone, 1);

console.log("Змішаний кошик всього:", calculateTotal(mixedCart));