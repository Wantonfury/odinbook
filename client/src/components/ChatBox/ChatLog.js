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
      return state[0][0].user.id === action.message.user.id ? state.map((groupedMessages, index) => index === 0 ? [...groupedMessages, action.message] : groupedMessages) : [[action.message]].concat(state);
    case 'PREPEND':
      console.log('messages prepend');
      console.log(action.messages);
      console.log(state[state.length - 1][0].user.id === action.messages[action.messages.length - 1][0].user.id ? [action.messages, ...state] : [action.messages, ...state]);
      return state;
    default:
      return state;
  }
}
/*
* A simple function to group messages sent by the same user into blocks
*/

const groupData = (dataToGroup) => {
  const data = dataToGroup.toReversed();
  
  let dataGrouped = [];
  
  for (let i = 0, arr = []; i < data.length; ++i) {
    arr.push(data[i]);
    
    if (i < data.length - 1 && data[i].user.id === data[i + 1].user.id)
      continue;
    
    dataGrouped.push(arr.reverse());
    arr = [];
  }
  
  return dataGrouped;
}

const ChatLog = ({ user }) => {
  const [messages, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [scrollReachedTop, setScrollReachedTop] = useState(false);
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  /*
  * This useEffect loads the initial 100 most recent messages
  */
 
  useEffect(() => {
    if (!chatBoxId) return;
    
    getMessages(chatBoxId)
      .then(res => {
        const dataGrouped = groupData(res.data);
        
        dispatch({ type: 'SET', messages: dataGrouped });
      })
      .finally(() => setLoading(false));
  }, [chatBoxId, loading]);
  
  
  /*
  * This useEffect handles the adding of new messages received from the other user
  * The message also gets added to the database, but we use socket io to circumvent database calls
  */
  
  useEffect(() => {
    const eventListener = (message) => {
      dispatch({ type: 'ADD', message });
    }
    
    socket.on('receive_message', eventListener);
    
    return () => socket.off('receive_message', eventListener);
  }, [socket]);
  
  
  /*
  * This useEffect handles the loading of previous messages once the user scrolls to the top of the chat window
  */
 
  useEffect(() => {
    const chatWindow = document.querySelector('.chatbox-log');
    
    const handleScroll = () => {
      if (finishedLoading) return;
      
      if (!scrollReachedTop && chatWindow.clientHeight + (-chatWindow.scrollTop) + 1 >= chatWindow.scrollHeight) {
        setScrollLoading(true);
        setScrollReachedTop(true);
        
        console.log(messages[messages.length - 1][0]);
        getMessages(chatBoxId, messages[messages.length - 1][0].date)
          .then(res => {
            if (!res.data || res.data.length === 0 || res.data === {}) setFinishedLoading(true);
            
            if (res.data && res.data.length > 0) dispatch({ type: 'PREPEND', messages: groupData(res.data) });
          })
          .finally(() => setScrollLoading(false));
      } else if (scrollReachedTop && chatWindow.clientHeight + (-chatWindow.scrollTop) + 1 <= chatWindow.scrollHeight) setScrollReachedTop(false);
    }
    
    chatWindow.addEventListener('scroll', handleScroll);
    
    return () => {
      chatWindow.removeEventListener('scroll', handleScroll);
    };
  }, [chatBoxId, finishedLoading, messages, scrollReachedTop]);
  
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
                      { scrollLoading ? <LoadingIcon /> : null }
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