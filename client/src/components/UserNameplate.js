import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/Contacts.css';
import { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/UserContext';
import ChatContext from '../contexts/ChatContext';
import { getUnreadMessagesCount } from '../apis/chatAPI';

const SERVER = process.env.REACT_APP_SERVER;

const UserNameplate = ({ user }) => {
  const { currentUser, setUser } = useContext(UserContext);
  const { chatBoxId, setChatBoxId } = useContext(ChatContext);
  const [unreadMessages, setUnreadMessages] = useState();
  const [updateUnreadMessages, setUpdateUnreadMessages] = useState(false);
  
  // useEffect(() => {
  //   getUnreadMessagesCount(user.id)
  //     .then(res => {
  //       setUnreadMessages(res.data);
  //       setUpdateUnreadMessages(false);
  //     });
  // }, [user, updateUnreadMessages]);
  
  // useEffect(() => {
  //   if (currentUser.updateRead === user.id) {
  //     setUpdateUnreadMessages(true);
  //     setUser({
  //       ...currentUser,
  //       updateRead: false
  //     })
  //   }
  // }, [currentUser.updateRead, user, setUser]);
  
  useEffect(() => {
    getUnreadMessagesCount(user.id)
      .then(res => {
        setUnreadMessages(res.data);
      });
  }, [user]);
  
  useEffect(() => {
    if (chatBoxId === user.id) {
      getUnreadMessagesCount(user.id)
        .then(res => {
          setUnreadMessages(res.data);
        });
    }
  }, [chatBoxId, user.id]);
  
  const handleClick = () => {
    setChatBoxId(user.id);
  }
  
  return (
    <div className={`contact ${unreadMessages > 0 ? 'contact-notification' : ''}`} onClick={handleClick}>
      <img src={user.pfp && user.pfp.length > 0 ? `${SERVER}/${user.pfp}` : DefaultProfileImage} alt='Profile' />
      <span>{ user.first_name + ' ' + user.last_name }</span>
      <p style={{
        textAlign: 'right',
        margin: '0',
        marginLeft: 'auto',
        padding: '0',
        paddingRight: '8px'
      }}>{unreadMessages === 0 ? '' : unreadMessages}</p>
    </div>
  );
}

export default UserNameplate;