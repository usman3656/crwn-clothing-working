import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler=() =>{
        navigate('/checkout');
    }

    return (

        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ?
                cartItems.map((item) => (

                    <CartItem key={item.id} cartItem={item}/>

                )):(

                    <span className='empty-message'> YOUR CART IS EMPTY</span>
                )
            }
            </div>
            <Button onClick={goToCheckoutHandler}> Go to Checkout</Button>
        </div>
    );
};

export default CartDropdown;