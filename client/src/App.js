import './styles/App.css';
import './styles/Container.css';
import LoginPage from './components/LoginPage';
import UserContext from './contexts/UserContext';
import { useState, useEffect } from "react";
import HomePage from './components/HomePage';
import LoadingIcon from './components/LoadingIcon';
import { checkLogin } from './apis/userAPI';

const defaultUser = {
  username: '',
  loggedIn: false
}

function App() {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkLogin()
      .then(res => {
        console.log(res.data);
        setUser({
          ...res.data,
          loggedIn: true
        })
      })
      .catch(() => {
        setUser({ loggedIn: false });
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {loading ? <LoadingIcon /> : user.loggedIn ? <HomePage /> : <LoginPage />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
