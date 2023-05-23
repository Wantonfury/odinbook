import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/User.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const UserProfilePicture = (props) => {
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = () => {
    if (props.id) setUser({
      ...user,
      userPageId: props.id
    });
  }
  
  return (
    <img className={`user-profile-picture ${props.large ? 'user-profile-picture-large': ''}`} src={DefaultProfileImage} alt="Profile" onClick={handleClick} />
  );
}

export default UserProfilePicture;