import { createContext, useState, } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => { 

  const [isAuthenticated, setIsAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {setCart([...cart, product]);};

    return (
        <CartContext.Provider value={
            
            {isAuthenticated, setIsAuth, cart, setCart, handleAddToCart}
            
            }>
            {children}
        </CartContext.Provider>
    )

}