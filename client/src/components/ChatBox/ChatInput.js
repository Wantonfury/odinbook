import { useState, useContext } from "react";
import { addMessage } from '../../apis/chatAPI';
import SocketContext from "../../contexts/SocketContext";
import ChatContext from "../../contexts/ChatContext";

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { socket } = useContext(SocketContext);
  const { chatBoxId } = useContext(ChatContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    addMessage(chatBoxId, message)
      .then(res => {
        socket.emit('send_message', { chat: chatBoxId, message: res.data });
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