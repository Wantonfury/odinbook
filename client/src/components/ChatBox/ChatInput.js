import { useState, useContext } from "react";
import { addMessage } from '../../apis/chatAPI';
import SocketContext from "../../contexts/SocketContext";
import ChatContext from "../../contexts/ChatContext";

const ChatInput = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    addMessage(message, chatBoxId)
      .then(res => {
        socket.emit('send_message', { chat: chatId, message: res.data });
      })
      .finally(() => {
        setMessage('');
      });
  }
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  
  return (
    <form className="chatbox-input" onSubmit={handleSubmit}>
      <textarea value={message} onChange={handleChange} />
      <button type="submit" className="btn">Send</button>
    </form>
  );
}

export default ChatInput;