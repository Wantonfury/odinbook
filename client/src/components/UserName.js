import '../styles/User.css';
import { useContext } from "react";
import UserContext from '../contexts/UserContext';

const UserName = (props) => {
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = () => {
    if (!props.id) return;
    
    setUser({
      ...user,
      userPageId: props.id
    });
    console.log("User changed");
  }
  
  return (
    <span className="user-profile-name" onClick={handleClick}>{props.full_name}</span>
  );
}

export default UserName;