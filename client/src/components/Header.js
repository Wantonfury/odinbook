import '../styles/Header.css';
import UserProfilePicture from './UserProfilePicture';
import HomeIcon from '../assets/images/home.svg';
import { useContext } from "react";
import UserContext from '../contexts/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  
  const handleHome = () => {
    setUser({
      ...user,
      userPageId: ''
    });
  }
  
  return (
    <div id="header">
      <div className='header-left'>
        <img className='header-home' src={HomeIcon} alt="Home Page" onClick={handleHome} />
        <input type='text' />
      </div>
      
      <UserProfilePicture id={user.id} />
    </div>
  );
}

export default Header;