import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/Contacts.css';
import { useContext } from "react";
import UserContext from '../contexts/UserContext';

const UserNameplate = (props) => {
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = () => {
    setUser({
      ...user,
      chatbox: props.user.id
    })
  }
  
  return (
    <div className="contact" onClick={handleClick}>
      <img src={props.user.pfp ? props.user.pfp : DefaultProfileImage} alt='Profile' />
      <span>{ props.user.first_name + ' ' + props.user.last_name }</span>
    </div>
  );
}

export default UserNameplate;