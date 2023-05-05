import '../styles/Button.css';
import { logout } from '../apis/userAPI';
import UserContext from '../contexts/UserContext';
import { useContext } from "react";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  
  const handleLogout = () => {
    logout()
      .then(() => setUser({
        ...user,
        loggedIn: false
      }))
      .catch(err => console.log(err));
  }
  
  return (
    <div>
      <p>Logged in!</p>
      <button className="btn" type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserPage;