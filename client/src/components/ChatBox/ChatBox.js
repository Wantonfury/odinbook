import '../../styles/ChatBox.css';
import '../../styles/Form.css';
import '../../styles/Button.css';
import { useContext } from "react";
import UserContext from '../../contexts/UserContext';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

const ChatBox = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="chatbox card">
      <ChatLog user={user} />
      
      <ChatInput user={user} />
    </div>
  );
}

export default ChatBox;