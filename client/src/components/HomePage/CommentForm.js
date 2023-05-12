import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import ArrowRight from '../../assets/images/arrow-right.svg';

const CommentForm = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="card comment-form">
      <input type="text" placeholder={`What's on your mind, ${user.first_name}?`} />
      <img src={ArrowRight} alt="Arrow Right" />
    </div>
  );
}

export default CommentForm;