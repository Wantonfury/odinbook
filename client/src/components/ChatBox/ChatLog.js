import LoadingIcon from "../LoadingIcon";
import { useState, useEffect, useReducer, useContext } from "react";
import { getMessages, readMessages } from "../../apis/chatAPI";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import UserName from "../UserName";
import UserProfilePicture from "../UserProfilePicture";
import SocketContext from '../../contexts/SocketContext';
import ChatContext from "../../contexts/ChatContext";
dayjs.extend(relativeTime);

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.messages;
    default:
      return state;
  }
}

const ChatLog = ({ user, setUser }) => {
  const [messages, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  useEffect(() => {
    if (!chatBoxId) return;
    
    getMessages(chatBoxId)
      .then(res => {
        const data = !res.data ? [] : res.data.map(message => {
          return {
            ...message,
            date: dayjs(message.date).fromNow(),
            user: {
              ...message.user,
              full_name: message.user.first_name + ' ' + message.user.last_name
            }
          }
        });
        
        data.reverse();
        
        let dataGrouped = [];
        
        for (let i = 0, arr = []; i < data.length; ++i) {
          arr.push(data[i]);
          
          if (i < data.length - 1 && data[i].user._id === data[i + 1].user._id)
            continue;
          
          dataGrouped.push(arr.reverse());
          arr = [];
        }
        
        dispatch({ type: 'UPDATE', messages: dataGrouped })
      })
      .finally(() => setLoading(false));
  }, [chatBoxId, loading]);
  
  useEffect(() => {
    const messagesId = [];
    
    for (let i = 0; i < messages.length; ++i) {
      for (let j = 0; j < messages[i].length; ++j) {
        if (user.id !== messages[i][j].user._id && !messages[i][j].read.includes(user.id))
          messagesId.push(messages[i][j]._id);
      }
    }
    
    readMessages(user.id, messagesId)
      .then(() => setUser({
        ...user,
        updateRead: user.chatbox
      }));
  }, [messages, setUser]);
  
  useEffect(() => {
    socket.on('receive_message', () => {
      setLoading(true);
    });
  }, [socket]);
  
  return (
    <ul className="chatbox-log">
        {
          loading ? <LoadingIcon /> :
            messages.map((messageGroup, indexGroup) => {
              return (
                <li className="log-cnt" key={indexGroup}>
                  <div className="log-user">
                    <UserProfilePicture id={messageGroup[0].user._id} />
                    <UserName id={messageGroup[0].user._id} full_name={messageGroup[0].user.full_name} />
                    <p className="log-date">{ messageGroup[messageGroup.length - 1].date }</p>
                  </div>
                  
                  {
                    messageGroup.map((message, index) => {
                      return <span className="log-message" key={index}>{message.message}</span>
                    })
                  }
                </li>
              )
            })
        }
      </ul>
  );
}

export default ChatLog;