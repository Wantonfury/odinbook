import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/User.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const UserProfilePicture = ({ id, large }) => {
  const { setUserPageId } = useContext(UserContext);
  
  const handleClick = () => {
    if (id) setUserPageId(id);
  }
  
  return (
    <input type='image' className={`user-profile-picture ${large ? 'user-profile-picture-large': ''}`} src={DefaultProfileImage} alt="Profile" onClick={handleClick} />
  );
}

export default UserProfilePicture;