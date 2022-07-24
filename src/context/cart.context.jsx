import { createContext, useEffect, useState } from 'react';
import CartDropdown from '../components/cart-dropdown/card-dropdown.component';

const addCartItem= (cartItems , productToAdd)=>{
    const existingCardItem= cartItems.find((cartItems) =>
        cartItems.id == productToAdd.id
    );

    if (existingCardItem)
    {

        return cartItems.map((cartItems) =>

            cartItems.id == productToAdd.id?
            {
                ...cartItems, 
                quantity :cartItems.quantity + 1
               
            }
            :cartItems
        );
        
    }
    return [...cartItems,{...productToAdd,quantity:1}];
};


const clearCartItem=(cartItems,cartItemToClear)=>{
    const existingCardItem= cartItems.find((cartItems) =>
    cartItems.id == cartItemToClear.id
    );

    return(
        cartItems.filter((cartItem) => 
            cartItem.id !== cartItemToClear.id
        ));

} 

const removeCartItem=(cartItems,cartItemToRemove)=>{

    const existingCardItem= cartItems.find((cartItems) =>
        cartItems.id == cartItemToRemove.id
    );

    if (existingCardItem.quantity == 1)
    {
        return(
        cartItems.filter((cartItem) => 
            cartItem.id !== cartItemToRemove.id
        ));
    };

    return cartItems.map((cartItems) =>

            cartItems.id == cartItemToRemove.id?
            {
                ...cartItems, 
                quantity :cartItems.quantity - 1
               
            }
            :cartItems
        );
};

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () =>{},
    cartItems : [],
    addItemToCart: () =>{},
    removeItemFromCart: () =>{},
    cartCount: 0,
    clearItemFromCart:() =>{},
    cartTotal:0,

});

export const CartProvider = ({children}) =>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce(
            (total,cartItem) => total +cartItem.quantity,0);
            setCartCount(newCartCount);


    },[cartItems])

    useEffect(()=> {
        const newCartTotal = cartItems.reduce(
            (total,cartItem) => total +cartItem.quantity * cartItem.price ,0);
            setCartTotal(newCartTotal);

    },[cartItems])

    const addItemToCart = (productToAdd) =>{

        setCartItems(addCartItem(cartItems,productToAdd));

    }

    const removeItemFromCart = (cartItemToRemove) =>{

        setCartItems(removeCartItem(cartItems,cartItemToRemove));

    }
    const clearItemFromCart = (cartItemToClear) =>{

        setCartItems(clearCartItem(cartItems,cartItemToClear));

    }

    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,
        removeItemFromCart,clearItemFromCart,cartTotal};
return(

    <CartContext.Provider value={value}>{children}</CartContext.Provider>
);
}