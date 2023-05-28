import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/User.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const UserProfilePicture = ({ id, large }) => {
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = () => {
    if (id) setUser({
      ...user,
      userPageId: id
    });
  }
  
  return (
    <img className={`user-profile-picture ${large ? 'user-profile-picture-large': ''}`} src={DefaultProfileImage} alt="Profile" onClick={handleClick} />
  );
}

export default UserProfilePicture;