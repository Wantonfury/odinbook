import LoadingIcon from "../LoadingIcon";
import { useState, useEffect, useReducer } from "react";
import { getMessages } from "../../apis/chatAPI";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.messages;
    default:
      return state;
  }
}

const ChatLog = ({ user }) => {
  const [messages, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getMessages(user.chatbox)
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
        
        dispatch({ type: 'UPDATE', messages: data })
      })
      .finally(() => setLoading(false));
  }, [user.chatbox, loading]);
  
  return (
    <ul className="chatbox-window">
        {
          loading ? <LoadingIcon /> :
            messages.map((message, index, oldArr) => {
              return (
                <li key={index}>
                  { index < oldArr.length - 1 && message.user._id === oldArr[index + 1].user._id ? null : <span>{`${message.user.full_name}: `}</span> }
                  <span className="chatbox-text">{message.message}</span>
                </li>
              );
            })
        }
      </ul>
  );
}

export default ChatLog;