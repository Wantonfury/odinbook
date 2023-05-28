import LoadingIcon from "../LoadingIcon";
import { useState, useEffect, useReducer } from "react";
import { getMessages } from "../../apis/chatAPI";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import UserName from "../UserName";
import UserProfilePicture from "../UserProfilePicture";
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
        
        let dataGrouped = [];
        
        for (let i = 0, arr = []; i < data.length; ++i) {
          arr.push(data[i]);
          
          if (i < data.length - 1 && data[i].user._id === data[i + 1].user._id)
            continue;
          
          dataGrouped.push(arr);
          arr = [];
        }
        
        dispatch({ type: 'UPDATE', messages: dataGrouped })
      })
      .finally(() => setLoading(false));
  }, [user.chatbox, loading]);
  
  return (
    <ul className="chatbox-log">
        {
          loading ? <LoadingIcon /> :
            messages.map((messageGroup, indexGroup) => {
              return (
                <li className="log-cnt" key={indexGroup}>
                  {/* <span className="log-user">{`${messageGroup[0].user.full_name}: `}</span> */}
                  <div className="log-user">
                    <UserProfilePicture id={messageGroup[0].user._id} />
                    <UserName id={messageGroup[0].user._id} full_name={messageGroup[0].user.full_name} />
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