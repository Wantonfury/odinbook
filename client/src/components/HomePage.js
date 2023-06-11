import '../styles/Button.css';
import '../styles/HomePage.css';
import { useState } from "react";
import Options from './HomePage/Options';
import Posts from './HomePage/Posts';
import Contacts from './HomePage/Contacts';
import FindFriends from './HomePage/FindFriends';

const options = {
  recent: 0,
  findFriends: 1
}

const HomePage = () => {
  const [ option, setOption ] = useState(options.recent);
  const [ updateContacts, setUpdateContacts ] = useState(false);
  
  const handleOptions = () => {
    switch (option) {
      case options.recent:
        return <Posts />
      case options.findFriends:
        return <FindFriends updateContacts={setUpdateContacts} />
      default:
        return null;
    }
  }
  
  return (
    <div id="homepage">
      <div className='homepage-left'>
        <Options options={options} setOption={setOption} />
      </div>
      
      <div className="homepage-middle">
        {handleOptions()}
      </div>
      
      <div className="homepage-right">
        <Contacts update={updateContacts} />
      </div>
    </div>
  );
}

export default HomePage;