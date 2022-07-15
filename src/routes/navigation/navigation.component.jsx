import { Fragment, useContext } from 'react';
import {Outlet,Link} from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
import { SignOutUser } from '../../utils/firebase/firebase.utils';


const Navigation=() =>{

  const {currentUser} = useContext(UserContext);
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

        )}
     </div>
      </div>
      <Outlet/>
    </Fragment>

  );
}

export default Navigation;