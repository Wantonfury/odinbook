import '../../styles/NavBar.css';
import HomeIcon from '../../assets/images/home.svg';
import { useContext } from "react";
import UserContext from '../../contexts/UserContext';
import NavSearch from './NavSearch';
import NavAccount from './NavAccount';

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
      
      <NavAccount user={user} />
    </div>
  );
}

export default NavBar;