import '../styles/User.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

const SERVER = process.env.REACT_APP_SERVER;

const UserProfilePicture = ({ id, pfp, large }) => {
  const { setUserPageId } = useContext(UserContext);
  const { icons } = useContext(ThemeContext);
  
  const handleClick = () => {
    if (id) setUserPageId(id);
  }
  
  return (
    <input type='image' className={`user-profile-picture ${large ? 'user-profile-picture-large': ''}`} src={pfp && pfp.length > 0 ? `${SERVER}/${pfp}` : icons.account} alt="Profile" onClick={handleClick} />
  );
}

export default UserProfilePicture;