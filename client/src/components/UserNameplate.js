import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/Contacts.css';
import { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/UserContext';
import ChatContext from '../contexts/ChatContext';
import { getUnreadMessagesCount } from '../apis/chatAPI';

const UserNameplate = (props) => {
  const { user, setUser } = useContext(UserContext);
  const { setChatBoxId } = useContext(ChatContext);
  const [unreadMessages, setUnreadMessages] = useState();
  const [updateUnreadMessages, setUpdateUnreadMessages] = useState(false);
  
  useEffect(() => {
    getUnreadMessagesCount(props.user.id)
      .then(res => {
        setUnreadMessages(res.data);
        setUpdateUnreadMessages(false);
      });
  }, [props.user, updateUnreadMessages]);
  
  useEffect(() => {
    if (user.updateRead === props.user.id) {
      setUpdateUnreadMessages(true);
      setUser({
        ...user,
        updateRead: false
      })
    }
  }, [user.updateRead, props.user, setUser]);
  
  const handleClick = () => {
    // setUser({
    //   ...user,
    //   chatbox: props.user.id
    // })
    setChatBoxId(props.user.id);
  }
  
  return (
    <div className={`contact ${unreadMessages > 0 ? 'contact-notification' : ''}`} onClick={handleClick}>
      <img src={props.user.pfp ? props.user.pfp : DefaultProfileImage} alt='Profile' />
      <span>{ props.user.first_name + ' ' + props.user.last_name }</span>
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