import '../styles/User.css';
import { useContext } from "react";
import UserContext from '../contexts/UserContext';

const UserName = ({ id, full_name }) => {
  const { user, setUser } = useContext(UserContext);
  
  const handleClick = () => {
    if (!id) return;
    
    setUser({
      ...user,
      userPageId: id
    });
    console.log("User changed");
  }
  
  return (
    <span className="user-profile-name" onClick={handleClick}>{full_name}</span>
  );
}

export default UserName;