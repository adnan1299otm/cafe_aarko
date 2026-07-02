export type MenuItem = {
  name: string;
  price?: string | number; // For single price
  prices?: { label: string; price: string | number }[]; // For multiple sizes/portions
  description?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    id: "appetizer",
    name: "Appetizer",
    items: [
      { name: "B.B.Q Lollipop (6 pc)", price: 310 },
      { name: "Wonton (6 pc)", price: 240 },
      { name: "Chicken Cutlet", price: 340 },
      { name: "Prawn Toast (8 pc)", price: 340 },
      { name: "Chicken Lollipop (6 pc)", price: 340 },
      { name: "Fish Cake (8 pc)", price: 320 },
      { name: "Honey Glaze Chicken Wings (6 pc)", price: 350 },
      { name: "Squid Fry with French Fry", price: 310 },
      { name: "Grilled Squid with French Fry", price: 340 },
      { name: "Prawn Fry with French Fry", price: 340 },
      { name: "Fish Finger with French Fry (8 pc)", price: 310 },
      { name: "Thai Fried Chicken with French Fry (4 pc)", price: 390 },
      { name: "Foil Fried Chicken with French Fry (4 pc)", price: 410 },
      { name: "French Fry", price: 170 },
      { name: "Nachos", price: 310 },
      { name: "Chicken Quesadilla", price: 410 },
      { name: "Szechuan Fried Chicken", price: 390 },
    ],
  },
  {
    id: "burger",
    name: "Burger",
    items: [
      { name: "Crispy Chicken Burger with French Fry", price: 230 },
      { name: "BBQ Chicken Burger with Cheese & French Fry", price: 250 },
      { name: "Naga Chicken Burger with Cheese & French Fry", price: 260 },
      { name: "American Burger", price: 330 },
      { name: "Aarko Special Burger", price: 350 },
    ],
  },
  {
    id: "soup",
    name: "Soup",
    items: [
      { name: "Chicken Corn Soup", prices: [{ label: "Regular", price: 130 }, { label: "Large", price: 300 }] },
      { name: "Chicken Vegetable Soup", prices: [{ label: "Regular", price: 140 }, { label: "Large", price: 330 }] },
      { name: "Thai Soup", prices: [{ label: "Regular", price: 150 }, { label: "Large", price: 360 }] },
      { name: "Hot and Sour Soup", prices: [{ label: "Regular", price: 150 }, { label: "Large", price: 360 }] },
      { name: "Tom Yam Soup", prices: [{ label: "Regular", price: 170 }, { label: "Large", price: 420 }] },
      { name: "Thai Clear Soup", prices: [{ label: "Regular", price: 180 }, { label: "Large", price: 430 }] },
      { name: "Aarko Special Soup", prices: [{ label: "Regular", price: 190 }, { label: "Large", price: 460 }] },
    ],
  },
  {
    id: "salad",
    name: "Salad",
    items: [
      { name: "Sichuan Salad", price: 300 },
      { name: "Chicken Cashew Nut Salad", price: 320 },
      { name: "Larb Gai Salad", price: 330 },
      { name: "Sea Food Salad", price: 380 },
      { name: "Aarko Special Salad", price: 360 },
      { name: "Mix Salad", price: 150 },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    items: [
      { name: "Pizza Margherita", description: "Cheese, fresh tomato slice, mushroom", prices: [{ label: "S", price: 380 }, { label: "M", price: 500 }, { label: "L", price: 610 }] },
      { name: "BBQ Pizza", description: "BBQ chicken, cheese, mushroom, onion", prices: [{ label: "S", price: 510 }, { label: "M", price: 620 }, { label: "L", price: 740 }] },
      { name: "Four Season Pizza", description: "Chicken, cheese, capsicum, sausage, black olive", prices: [{ label: "S", price: 520 }, { label: "M", price: 630 }, { label: "L", price: 780 }] },
      { name: "Mexican Hot Pizza", description: "Spicy chicken, cheese, mushroom, tomato, capsicum", prices: [{ label: "S", price: 570 }, { label: "M", price: 760 }, { label: "L", price: 890 }] },
      { name: "Pizza Italiano", description: "Chicken, cheese, mushroom, sausage", prices: [{ label: "S", price: 560 }, { label: "M", price: 690 }, { label: "L", price: 830 }] },
      { name: "Beef Lovers Pizza", description: "Beef, cheese, mushroom, onion, capsicum, sausage, black olive", prices: [{ label: "S", price: 590 }, { label: "M", price: 780 }, { label: "L", price: 890 }] },
      { name: "Spicy Naga Pizza", description: "Naga chicken, cheese, mushroom, sausage", prices: [{ label: "S", price: 590 }, { label: "M", price: 720 }, { label: "L", price: 840 }] },
      { name: "Texas Pizza", description: "Chicken cheese, chicken salami, mushroom, capsicum, black olive", prices: [{ label: "S", price: 860 }, { label: "L", price: 970 }] },
      { name: "Seafood Pizza", description: "Squid, prawn, boneless fish, mushroom, black olive, capsicum", prices: [{ label: "S", price: 810 }, { label: "L", price: 910 }] },
      { name: "Double Standard Pizza", description: "Double layer cheese, chicken, capsicum, tomato, sweet corn, black olive, onion", prices: [{ label: "S", price: 770 }, { label: "L", price: 890 }] },
      { name: "Aarko Special Pizza", description: "Chicken, cheese, mushroom, capsicum, onion, sausage, black olive", prices: [{ label: "S", price: 700 }, { label: "M", price: 890 }, { label: "L", price: 1020 }] },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      { name: "Spicy Pasta", price: 260 },
      { name: "White Sauce Pasta", price: 270 },
      { name: "Pink Prawn Pasta", price: 280 },
      { name: "Oven Baked Pasta", price: 290 },
      { name: "Beef Oven Baked Pasta", price: 320 },
      { name: "Pasta Basta", price: 340 },
      { name: "Meat Sauce Pasta", price: 340 },
      { name: "Aarko Special Pasta", price: 360 },
    ],
  },
  {
    id: "choumein",
    name: "Choumein",
    items: [
      { name: "Chicken Chowmein", prices: [{ label: "Regular", price: 210 }, { label: "Large", price: 360 }] },
      { name: "Thai Chowmein", prices: [{ label: "Regular", price: 230 }, { label: "Large", price: 480 }] },
      { name: "Mix Chowmein", prices: [{ label: "Regular", price: 220 }, { label: "Large", price: 440 }] },
      { name: "American Choupsey", prices: [{ label: "Large", price: 370 }] },
    ],
  },
  {
    id: "chinese-set-menu",
    name: "Chinese - Set Menu",
    items: [
      { name: "Crispy Chicken", description: "Includes Egg Fried Rice + Chinese Veg", price: 220 },
      { name: "Chicken Chilli", description: "Includes Egg Fried Rice + Chinese Veg", price: 230 },
      { name: "Beef Chilli Onion", description: "Includes Egg Fried Rice + Chinese Veg", price: 260 },
      { name: "Chicken Masala", description: "Includes Egg Fried Rice + Chinese Veg", price: 250 },
      { name: "Beef Masala", description: "Includes Egg Fried Rice + Chinese Veg", price: 270 },
      { name: "Tandoori Chicken", description: "Includes Egg Fried Rice + Chinese Veg", price: 290 },
      { name: "BBQ Chicken", description: "Includes Egg Fried Rice + Chinese Veg", price: 300 },
    ],
  },
  {
    id: "mexican-set-menu",
    name: "Mexican - Set Menu",
    items: [
      { name: "Mexican Chicken", description: "Includes Fried Rice + Spicy Salad", price: 310 },
      { name: "Dry Red Chilli Chicken", description: "Includes Fried Rice + Spicy Salad", price: 320 },
      { name: "Dry Red Chilli Beef", description: "Includes Fried Rice + Spicy Salad", price: 340 },
      { name: "Szechuan Chicken", description: "Includes Fried Rice + Spicy Salad", price: 340 },
      { name: "Beef Black Pepper Mushroom", description: "Includes Fried Rice", price: 350 },
    ],
  },
  {
    id: "continental-set-menu",
    name: "Continental - Set Menu",
    items: [
      { name: "Spanish Chicken", description: "Includes Mexican Rice", price: 340 },
      { name: "Garlic Prawn", description: "Includes Fried Rice", price: 360 },
      { name: "Fish Grill", description: "Includes Mexican Rice + Mashed Potatoes", price: 400 },
      { name: "Parmesan Chicken", description: "Includes Spicy Rice + Ring Onion + Boiled Veg", price: 380 },
      { name: "Peri Peri Chicken", description: "Includes Mushroom Rice + French Fry + Peri Peri Sauce", price: 390 },
      { name: "Orange Chicken", description: "Includes Spicy Rice + Veg + Orange Slice", price: 380 },
      { name: "Smokey Creamy Chicken", description: "Includes Spicy Rice + Veg", price: 380 },
      { name: "B.B.Q Prawn", description: "Includes Green Rice + Grilled Mushroom", price: 400 },
      { name: "Parmesan Chicken", description: "Includes Spaghetti", price: 400 },
      { name: "Teriyaki Chicken", description: "Includes Fried Rice", price: 370 },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    items: [
      { name: "Chinese Vegetables", prices: [{ label: "Regular", price: 110 }, { label: "Large", price: 240 }] },
      { name: "Grilled Vegetables", prices: [{ label: "Regular", price: 120 }, { label: "Large", price: 250 }] },
      { name: "Thai Vegetables", prices: [{ label: "Regular", price: 160 }, { label: "Large", price: 260 }] },
      { name: "Garlic Mushroom", prices: [{ label: "Large", price: 260 }] },
    ],
  },
  {
    id: "indian-curry",
    name: "Indian Curry",
    items: [
      { name: "Chicken Jhalfrezi", prices: [{ label: "Regular", price: 190 }, { label: "Large", price: 380 }] },
      { name: "Chicken Dopiaza", prices: [{ label: "Regular", price: 200 }, { label: "Large", price: 390 }] },
      { name: "Chicken Korai", prices: [{ label: "Regular", price: 210 }, { label: "Large", price: 400 }] },
      { name: "Chicken Tikka Masala", prices: [{ label: "Large", price: 370 }] },
      { name: "Mutton Dopiaza", prices: [{ label: "Large", price: 480 }] },
      { name: "Beef Korai", prices: [{ label: "Large", price: 490 }] },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    items: [
      { name: "Egg Fried Rice", prices: [{ label: "Regular", price: 160 }, { label: "Large", price: 290 }] },
      { name: "Chicken Fried Rice", prices: [{ label: "Regular", price: 190 }, { label: "Large", price: 330 }] },
      { name: "Vegetable Rice", prices: [{ label: "Large", price: 310 }] },
      { name: "Masala Fried Rice", prices: [{ label: "Large", price: 320 }] },
      { name: "Szechuan Rice", prices: [{ label: "Large", price: 370 }] },
      { name: "Thai Fried Rice", prices: [{ label: "Large", price: 380 }] },
      { name: "Fantastic Fried Rice", prices: [{ label: "Large", price: 390 }] },
    ],
  },
  {
    id: "biriyani",
    name: "Biriyani",
    items: [
      { name: "Chicken Biriyani", price: 240 },
      { name: "BBQ Biriyani", price: 270 },
      { name: "Mutton Biriyani", price: 330 },
      { name: "Hyderabadi Biriyani", price: 360 },
      { name: "Persian Biriyani", price: 320 },
      { name: "Aarko Special Biriyani", price: 380 },
    ],
  },
  {
    id: "beef",
    name: "Beef",
    items: [
      { name: "Beef Masala", prices: [{ label: "Regular", price: 260 }, { label: "Large", price: 410 }] },
      { name: "Beef Chilli Onion", prices: [{ label: "Regular", price: 270 }, { label: "Large", price: 410 }] },
      { name: "Beef Sizzling", prices: [{ label: "Large", price: 470 }] },
      { name: "Beef Chilli Dry", prices: [{ label: "Large", price: 490 }] },
    ],
  },
  {
    id: "fish",
    name: "Fish",
    items: [
      { name: "Fish Masala", prices: [{ label: "Regular", price: 240 }, { label: "Large", price: 420 }] },
      { name: "Prawn Masala", prices: [{ label: "Regular", price: 260 }, { label: "Large", price: 440 }] },
      { name: "Prawn Sizzling", prices: [{ label: "Large", price: 470 }] },
      { name: "Pomfret Fry", prices: [{ label: "Large", price: 480 }] },
      { name: "Red Snapper Sweet and Sour", prices: [{ label: "Large", price: 700 }] },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    items: [
      { name: "Chicken Masala", prices: [{ label: "Regular", price: 200 }, { label: "Large", price: 350 }] },
      { name: "Chicken Chilli Onion", prices: [{ label: "Regular", price: 220 }, { label: "Large", price: 370 }] },
      { name: "Chicken Sizzling", prices: [{ label: "Large", price: 410 }] },
      { name: "Chicken Chilli Dry", prices: [{ label: "Regular", price: 230 }, { label: "Large", price: 390 }] },
    ],
  },
  {
    id: "steak",
    name: "Steak",
    items: [
      { name: "American Chicken Steak", description: "Rice, boiled vegetables", price: 460 },
      { name: "Paprika Chicken Steak", description: "French fry, mushroom", price: 500 },
      { name: "American Steak", description: "Rice, boiled vegetables", price: 650 },
    ],
  },
  {
    id: "kebab",
    name: "Kebab",
    items: [
      { name: "Chicken Tikka", description: "Includes Naan & Raita Salad", price: 280 },
      { name: "Afgani Kebab", description: "Includes Naan & Raita Salad", price: 310 },
      { name: "Tandoori Chicken", description: "Includes Naan & Raita Salad", price: 290 },
      { name: "Hariyali Kebab", description: "Includes Naan & Raita Salad", price: 310 },
      { name: "Tangri Kebab", description: "Includes Naan & Salad", price: 320 },
      { name: "Beef Hariyali Kebab", description: "Includes Naan & Raita Salad", price: 350 },
    ],
  },
  {
    id: "naan",
    name: "Naan",
    items: [
      { name: "Plain Naan", price: 60 },
      { name: "Spicy Naan", price: 70 },
      { name: "Butter Naan", price: 80 },
      { name: "Garlic Naan", price: 90 },
    ],
  },
  {
    id: "shakes-and-drinks",
    name: "Shakes and Drinks",
    items: [
      { name: "Cocktail", price: 130 },
      { name: "Blue Shot", price: 140 },
      { name: "Lemonade", price: 120 },
      { name: "Lassi", price: 140 },
      { name: "Frappe", price: 180 },
      { name: "Lover Delight", price: 170 },
      { name: "KitKat Shake", price: 170 },
      { name: "Virgin Mojito", price: 130 },
      { name: "Ice Cream", price: 120 },
      { name: "Cold Coffee", price: 150 },
      { name: "Milk Shake", price: 160 },
      { name: "Oreo Shake", price: 190 },
      { name: "Faluda", price: 200 },
    ],
  },
  {
    id: "seasonal-juice",
    name: "Seasonal Juice",
    items: [
      { name: "Apple Juice", price: 170 },
      { name: "Mango Juice", price: 180 },
      { name: "Orange Juice", price: 190 },
      { name: "Pineapple Juice", price: 160 },
      { name: "Mint Lemon Juice", price: 150 },
      { name: "Aarko Special Drink", price: "—" }, // no price on source menu
    ],
  },
  {
    id: "coffee",
    name: "Coffee",
    items: [
      { name: "Black Coffee", price: 80 },
      { name: "Hot Coffee", price: 120 },
      { name: "Cappuccino", price: 140 },
      { name: "Hot Chocolate", price: 160 },
      { name: "Latte", price: 170 },
    ],
  },
];
