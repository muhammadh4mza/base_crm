import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Performance Track Suit",
    image: require("../assets/images/tracksuit.png"),
    status: "Active",
    inventory: "5 in Stock",
    type: "Physical",
    price: "$89.99",
    category: "Active Wear",
    vendor: "Nike",
  },
  {
    id: 2,
    name: "Premium Yoga Pants",
    image: require("../assets/images/tracksuit.png"),
    status: "Draft",
    inventory: "0 in Stock",
    type: "Physical",
    price: "$59.99",
    category: "Active Wear",
    vendor: "Lululemon",
  },
  {
    id: 3,
    name: "Breathable Running Shorts",
    image: require("../assets/images/tracksuit.png"),
    status: "Active",
    inventory: "12 in Stock",
    type: "Physical",
    price: "$39.99",
    category: "Active Wear",
    vendor: "Adidas",
  },
  {
    id: 4,
    name: "Online Fitness Program",
    image: require("../assets/images/tracksuit.png"),
    status: "Archived",
    inventory: "Unlimited",
    type: "Digital",
    price: "$29.99",
    category: "Fitness",
    vendor: "FitPro",
  },
  {
    id: 5,
    name: "Weightlifting Gloves",
    image: require("../assets/images/tracksuit.png"),
    status: "Active",
    inventory: "8 in Stock",
    type: "Physical",
    price: "$24.99",
    category: "Accessories",
    vendor: "Under Armour",
  },
  {
    id: 6,
    name: "Hydration Backpack",
    image: require("../assets/images/tracksuit.png"),
    status: "Active",
    inventory: "3 in Stock",
    type: "Physical",
    price: "$49.99",
    category: "Accessories",
    vendor: "CamelBak",
  },
];

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
