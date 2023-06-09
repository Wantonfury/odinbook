import LoadingIcon from "../LoadingIcon";
import { useState, useEffect, useReducer, useContext } from "react";
import { getMessages, getMessagesUnread, readMessages } from "../../apis/chatAPI";
import UserName from "../UserName";
import UserProfilePicture from "../UserProfilePicture";
import SocketContext from '../../contexts/SocketContext';
import ChatContext from "../../contexts/ChatContext";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.messages;
     case 'ADD':
       //console.log(state[0][state[0].length - 1].user._id === action.message.user);
       return state[0][state[0].length - 1].user._id === action.message.user._id ? [...state[0], action.message] : state ;
    default:
      return state;
  }
}

const ChatLog = ({ user, setUser }) => {
  const [messages, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  useEffect(() => {
    if (!chatBoxId) return;
    
    getMessages(chatBoxId)
      .then(res => {
        const data = !res.data ? [] : res.data.map(message => {
          return {
            ...message,
            user: {
              ...message.user
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
    socket.on('receive_message', (message) => {
      //setLoadingMore(true);
      //dispatch({ type: 'ADD', message });
    });
  }, [socket]);
  
  useEffect(() => {
    if (!loadingMore) return;
    
    getMessagesUnread(chatBoxId, messages[0][messages[0].length - 1].date)
      .then(res => {
        console.log(res.data);
      })
      .finally(() => setLoadingMore(false));
  }, [loadingMore, messages, chatBoxId]);
  
  return (
    <ul className="chatbox-log">
        {
          loading ? <LoadingIcon /> :
            messages.map((messageGroup, indexGroup) => {
              return (
                <li className="log-cnt" key={indexGroup}>
                  <div className="log-user">
                    <UserProfilePicture id={messageGroup[0].user._id} pfp={messageGroup[0].user.pfp} />
                    <UserName id={messageGroup[0].user._id} full_name={messageGroup[0].user.full_name} />
                    <p className="log-date">{ dayjs(messageGroup[messageGroup.length - 1].date).fromNow() }</p>
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