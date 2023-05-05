import './styles/App.css';
import './styles/Container.css';
import LoginPage from './components/LoginPage';
import UserContext from './contexts/UserContext';
import { useState, useEffect } from "react";
import UserPage from './components/UserPage';

const defaultUser = {
  username: '',
  loggedIn: false
}

function App() {
  const [user, setUser] = useState(defaultUser);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {user.loggedIn ? <UserPage /> : <LoginPage />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
