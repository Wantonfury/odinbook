import '../../styles/NavBar.css';
import UserProfilePicture from '../UserProfilePicture';
import HomeIcon from '../../assets/images/home.svg';
import { useContext } from "react";
import UserContext from '../../contexts/UserContext';
import NavSearch from './NavSearch';

const NavBar = () => {
  const { user, setUserPageId } = useContext(UserContext);
  
  const handleHome = () => {
    setUserPageId(null);
  }
  
  return (
    <div id="navbar">
      <div className='nav-left'>
        <img className='nav-home' src={HomeIcon} alt="Home Page" onClick={handleHome} />
        <NavSearch />
      </div>
      
      <UserProfilePicture id={user.id} />
    </div>
  );
}

export default NavBar;