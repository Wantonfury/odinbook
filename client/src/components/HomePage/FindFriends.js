import { useState, useEffect } from "react";
import { getNonFriends, addFriend, getPendingFriends } from '../../apis/userAPI';
import '../../styles/User.css';
import '../../styles/Button.css';
import LoadingIcon from "../LoadingIcon";
import '../../styles/FindFriends.css';
import '../../styles/Card.css';
import UserProfilePicture from "../UserProfilePicture";
import UserName from "../UserName";

const FindFriends = (props) => {
  const [users, setUsers] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  let userCount = 10;
  
  useEffect(() => {
    if (!loading) return;
    
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
      .then(() => {
        setLoading(true);
        props.updateContacts(true);
      })
      .catch(err => console.log(err));
  }
  
  const generateUserCard = (user, index, status) => {
    return (
      <div key={index} className="user-detailed">
        <UserProfilePicture id={user.id} large={true} pfp={user.pfp} />
        <UserName id={user.id} full_name={user.full_name} />
        { status === 'Pending' ? <button type='button' className='btn btn-wide'>{status}</button> : <button type="button" className="btn btn-wide" value={user.id} onClick={handleAdd}>{status}</button> }
      </div>
    );
  }
  
  const listNonFriends = () => {
    if (users.length === 0) return;
    
    const nonFriends = users.map((user, index) => generateUserCard(user, index, 'Add'));
    
    return (
      nonFriends.length > 0 ? (
        <div className="card find-friends-cnt">
          <p className="card-title">Recommended new friends:</p>
          <div className='find-friends-list'>
            { nonFriends }
          </div>
        </div>
      ) : null
    );
  }
  
  const listFriendsConfirm = () => {
    if (pendingFriends.length === 0) return;
    
    const listConfirm = pendingFriends.filter(user => user.pending !== true).map((user, index) => generateUserCard(user, index, 'Confirm'));
    const confirmFriendships = listConfirm.length > 0 ? (
      <div className="card find-friends-cnt">
        <p className="card-title">Confirm friendships:</p>
        <div className='find-friends-list'>
          { listConfirm }
        </div>
      </div>
    ) : null;
    
    return confirmFriendships;
  }
  
  const listFriendsPending = () => {
    if (pendingFriends.length === 0) return;
    
    const listPending = pendingFriends.filter(user => user.pending === true).map((user, index) => generateUserCard(user, index, 'Pending'));
    const pendingFriendships = listPending.length > 0 ? (
      <div className="card find-friends-cnt">
        <p className="card-title">Pending friendships:</p>
        <div className='find-friends-list'>
          { listPending }
        </div>
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