import { useContext } from 'react';
import '../../styles/Button.css';
import ChatContext from '../../contexts/ChatContext';

const BtnMessage = ({ id }) => {
  const { setChatBoxId } = useContext(ChatContext);
  
  const handleClick = () => {
    setChatBoxId(id);
  }
  
  return (
    <button type='button' className='btn' onClick={handleClick}>Message</button>
  );
}

export default BtnMessage;