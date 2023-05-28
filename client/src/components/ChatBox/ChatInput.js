import { useState } from "react";
import { addMessage } from '../../apis/chatAPI';

const ChatInput = ({ user }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    addMessage(message, user.chatbox)
      .finally(() => setMessage(''));
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