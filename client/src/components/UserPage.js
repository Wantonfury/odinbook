import '../styles/UserPage.css';
import UserPosts from './UserPage/UserPosts';
import { useState } from 'react';
import UserFriends from './UserPage/UserFriends';
import UserInfo from './UserPage/UserInfo';

const UserPage = () => {
  const [friendsCount, setFriendsCount] = useState('');
  
  return (
    <div className="user-page">
      <UserInfo friendsCount={friendsCount} />
      
      <div className="user-page-cnt">
        <UserFriends setFriendsCount={setFriendsCount} />
        <UserPosts />
      </div>
    </div>
  );
}

export default UserPage;