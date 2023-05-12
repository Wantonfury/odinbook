import '../styles/Button.css';
import '../styles/HomePage.css';
import { logout } from '../apis/userAPI';
import UserContext from '../contexts/UserContext';
import { useState, useContext } from "react";
import Options from './HomePage/Options';
import Comments from './HomePage/Comments';
import Contacts from './HomePage/Contacts';
import FindFriends from './HomePage/FindFriends';

const options = {
  recent: 0,
  findFriends: 1
}

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [ option, setOption ] = useState(options.recent);
  const [ updateContacts, setUpdateContacts ] = useState(false);
  
  const handleLogout = () => {
    logout()
      .then(() => setUser({
        loggedIn: false
      }))
      .catch(err => console.log(err));
      
    return true;
  }
  
  const handleOptions = () => {
    switch (option) {
      case options.recent:
        return <Comments />
      case options.findFriends:
        return <FindFriends updateContacts={setUpdateContacts} />
      default:
        return <Comments />
    }
  }
  
  return (
    <div id="homepage">
      <Options options={options} setOption={setOption} />
      <div className="middle">
        {handleOptions()}
      </div>
      <Contacts update={updateContacts} />
    </div>
  );
}

export default HomePage;