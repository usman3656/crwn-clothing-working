import { Fragment, useContext } from 'react';
import {Outlet,Link} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/card-dropdown.component';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { SignOutUser } from '../../utils/firebase/firebase.utils';


const Navigation=() =>{

  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  // console.log(currentUser);


  return(
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
     <CrwnLogo className='logo'/>
     </Link>
     <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>
            SHOP
        </Link>
        { currentUser ?(
          <span className='nav-link' onClick={SignOutUser}>Sign Out</span>
        ) :(
          
        <Link className='nav-link' to='/auth'>
        sign -in 
    </Link>

        )
        };
            <CartIcon/>

     </div>
     {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet/>
    </Fragment>

  );
}

export default Navigation;