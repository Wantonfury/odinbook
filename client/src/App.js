import './styles/App.css';
import './styles/Container.css';
import LoginPage from './components/LoginPage';
import UserContext from './contexts/UserContext';
import SocketContext from './contexts/SocketContext';
import { useState, useEffect } from "react";
import HomePage from './components/HomePage';
import LoadingIcon from './components/LoadingIcon';
import { checkLogin } from './apis/userAPI';
import { ModalProvider } from './contexts/ModalContext';
import NavBar from './components/NavBar/NavBar';
import UserPage from './components/UserPage';
import ChatBox from './components/ChatBox/ChatBox';
import ChatContext from './contexts/ChatContext';
import io from 'socket.io-client';

const SERVER = process.env.REACT_APP_SERVER;
const socket = io.connect(SERVER);

const defaultUser = {
  username: '',
  loggedIn: false
}

function App() {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(<HomePage />);
  const [chatBoxId, setChatBoxId] = useState(null);
  const [userPageId, setUserPageId] = useState(null);
  
  useEffect(() => {
    checkLogin()
      .then(res => {
        setUser({
          ...res.data,
          loggedIn: true
        })
      })
      .catch(() => {
        setUser({ loggedIn: false });
      })
      .finally(() => setLoading(false));
  }, [loading]);
  
  // const handlePage = () => {
  //   if (user.userPageId) {
  //     return <UserPage />;
  //   }
    
  //   return <HomePage />;
  // }
  
  useEffect(() => {
    if (userPageId) setCurrentPage(<UserPage />);
    else setCurrentPage(<HomePage />);
  }, [userPageId]);
  
  return (
    <SocketContext.Provider value={{ socket }}>
      <UserContext.Provider value={{ user, setUser, userPageId, setUserPageId }}>
        <ChatContext.Provider value={{ chatBoxId, setChatBoxId }}>
          <ModalProvider>
            <div className="App">
              {loading ? null : <NavBar />}
              
              {
                loading ? <LoadingIcon /> : 
                  user.loggedIn ? currentPage : <LoginPage reload={setLoading} />
              }
              
              { chatBoxId && user.loggedIn ? <ChatBox /> : null }
            </div>
          </ModalProvider>
        </ChatContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
