import '../../styles/ChatBox.css';
import '../../styles/Form.css';
import '../../styles/Button.css';
import '../../styles/SVG.css';
import { useContext, useState, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import { getChatId } from '../../apis/chatAPI';
import SocketContext from '../../contexts/SocketContext';
import IconClose from '../../assets/images/close-circle.svg';
import ChatContext from '../../contexts/ChatContext';

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { chatBoxId, setChatBoxId } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const [chatId, setChatId] = useState(null);
  
  useEffect(() => {
    if (!chatBoxId) return;
    
    getChatId(chatBoxId)
      .then(res => {
        if (chatId) socket.emit('leave_chat', chatId);
        setChatId(res.data);
        socket.emit('join_chat', { chat: res.data });
      });
  }, [chatBoxId, socket, chatId]);
  
  const handleClose = () => {
    setChatBoxId(null);
  }
  
  return (
    <div className="chatbox card">
      <input type='image' className='svg' src={IconClose} alt='Close Chat' onClick={handleClose} style={{
        width: '30px',
        height: 'auto',
        marginLeft: 'auto'
      }} />
      <ChatLog user={user} />
      
      <ChatInput chatId={chatId} />
    </div>
  );
}

export default ChatBox;