import { useState, useEffect } from "react";
import { getNonFriends, addFriend, getPendingFriends } from '../../apis/userAPI';
import '../../styles/User.css';
import '../../styles/Button.css';
import LoadingIcon from "../LoadingIcon";
import DefaultProfileImage from '../../assets/images/account-default-image.svg';
import '../../styles/FindFriends.css';
import '../../styles/Card.css';

const FindFriends = (props) => {
  const [users, setUsers] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  let userCount = 10;
  
  useEffect(() => {
    Promise.all([
    getNonFriends(userCount, userCount + 10)
      .then(res => setUsers(res.data))
      .catch(err => {
        console.log(err);
        setUsers([]);
      }),
    
    getPendingFriends()
      .then(res => setPendingFriends(res.data))
      .catch(err => {
        console.log(err);
        setPendingFriends([]);
      }),
    ])
    .finally(() => setLoading(false));
  }, [userCount, loading]);
  
  const handleAdd = (e) => {
    addFriend(e.target.value)
      .then(res => {
        setLoading(true);
        props.updateContacts(true);
      })
      .catch(err => console.log(err));
  }
  
  const generateUserCard = (user, index, status) => {
    return (
      <div key={index} className="user-detailed">
        <img src={user.pfp ? user.pfp : DefaultProfileImage} alt='Profile' />
        <span>{user.first_name + ' ' + user.last_name}</span>
        <button type="button" className="btn btn-wide" value={user.id} onClick={handleAdd}>{status}</button>
      </div>
    );
  }
  
  const listNonFriends = () => {
    if (users.length === 0) return;
    
    const nonFriends = users.map((user, index) => generateUserCard(user, index, 'Add'));
    
    return (
      nonFriends.length > 0 ? (
        <div className="card">
          <p className="card-title">Recommended new friends:</p>
          { nonFriends }
        </div>
      ) : null
    );
  }
  
  const listFriendsConfirm = () => {
    if (pendingFriends.length === 0) return;
    
    const listConfirm = pendingFriends.filter(user => user.pending !== true).map((user, index) => generateUserCard(user, index, 'Confirm'));
    const confirmFriendships = listConfirm.length > 0 ? (
      <div className="card">
        <p className="card-title">Confirm friendships:</p>
        { listConfirm }
      </div>
    ) : null;
    
    return confirmFriendships;
  }
  
  const listFriendsPending = () => {
    if (pendingFriends.length === 0) return;
    
    const listPending = pendingFriends.filter(user => user.pending === true).map((user, index) => generateUserCard(user, index, 'Pending'));
    const pendingFriendships = listPending.length > 0 ? (
      <div className="card">
        <p className="card-title">Pending friendships:</p>
        { listPending }
      </div>
    ) : null;
    
    return pendingFriendships;
  }
  
  return (
    <>
      {
        loading ?
          <LoadingIcon /> :
          <div id="find-friends">
              { listFriendsConfirm() }
              { listFriendsPending() }
              { listNonFriends() }
          </div>
      }
    </>
  );
}

export default FindFriends;