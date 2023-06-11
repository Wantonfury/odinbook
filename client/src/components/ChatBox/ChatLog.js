import LoadingIcon from "../LoadingIcon";
import { useState, useEffect, useReducer, useContext } from "react";
import { getMessages } from "../../apis/chatAPI";
import UserName from "../UserName";
import UserProfilePicture from "../UserProfilePicture";
import SocketContext from '../../contexts/SocketContext';
import ChatContext from "../../contexts/ChatContext";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.messages;
     case 'ADD':
       return state[0][0].user.id === action.message.user.id ? state.map((groupedMessages, index) => index === 0 ? [...groupedMessages, action.message] :
        groupedMessages) : [[action.message]].concat(state);
    default:
      return state;
  }
}

const ChatLog = ({ user }) => {
  const [messages, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  useEffect(() => {
    if (!chatBoxId) return;
    
    getMessages(chatBoxId)
      .then(res => {
        const data = res.data.toReversed();
        
        let dataGrouped = [];
        
        for (let i = 0, arr = []; i < data.length; ++i) {
          arr.push(data[i]);
          
          if (i < data.length - 1 && data[i].user.id === data[i + 1].user.id)
            continue;
          
          dataGrouped.push(arr.reverse());
          arr = [];
        }
        
        dispatch({ type: 'SET', messages: dataGrouped });
      })
      .finally(() => setLoading(false));
  }, [chatBoxId, loading]);
  
  useEffect(() => {
    const eventListener = (message) => {
      dispatch({ type: 'ADD', message });
    }
    
    socket.on('receive_message', eventListener);
    
    return () => socket.off('receive_message', eventListener);
  }, [socket]);
  
  useEffect(() => {
    if (!loadingMore) return;
    
    getMessages(chatBoxId, messages[messages.length - 1][0].date)
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
                <li className={`log ${messageGroup[0].user.id === user.id ? 'current-user': ''}`} key={indexGroup}>
                  { messageGroup[0].user.id === user.id ? null : <UserProfilePicture id={messageGroup[0].user.id} pfp={messageGroup[0].user.pfp} /> }
                  
                  <div className='log-cnt'>
                    <div className='log-header'>
                      { messageGroup[0].user.id === user.id ? null : <UserName id={messageGroup[0].user.id} full_name={messageGroup[0].user.full_name} /> }
                      <p className="log-date">{ dayjs(messageGroup[messageGroup.length - 1].date).fromNow() }</p>
                    </div>
                    <div className={`log-content ${messageGroup[0].user.id === user.id ? 'current-user': ''}`}>
                      {
                        messageGroup.map((message, index) => {
                          return <span className='log-message' key={index}>{message.message}</span>
                        })
                      }
                    </div>
                  </div>
                </li>
              )
            })
        }
      </ul>
  );
}

export default ChatLog;