import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { logOut } from '../apis/userAPI';

const useAuthentication = () => {
  const { setUser, setUserPageId } = useContext(UserContext);
  
  const login = () => {
    
  }
  
  const logout = () => {
    logOut()
      .then(() => {
        setUser({ loggedIn: false });
        setUserPageId(null);
      });
  }
  
  return { login, logout };
}

export default useAuthentication;