import '../../styles/Contacts.css';
import { useState, useEffect } from "react";
import { getFriends } from '../../apis/userAPI';
import LoadingIcon from '../LoadingIcon';
import DefaultProfileImage from '../../assets/images/account-default-image.svg';

const Contacts = (props) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    
    getFriends()
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [props.update]);
  
  const listFriends = () => {
    if (friends.length === 0) return <p>No friends :(</p>
    
    return (
      friends.map((friend, index) => {
        return (
          <div key={index} className="contact">
            <img src={friend.pfp ? friend.pfp : DefaultProfileImage} alt='Profile' />
            <span>{ friend.first_name + ' ' + friend.last_name }</span>
          </div>
        );
      })
    );
  }
  
  return (
    <div id="contacts">
      {
        loading ? <LoadingIcon /> : listFriends()
      }
    </div>
  );
}

export default Contacts;