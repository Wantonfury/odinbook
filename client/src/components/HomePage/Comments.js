import '../../styles/Comments.css';
import '../../styles/Button.css';
import ArrowRight from '../../assets/images/arrow-right.svg';
import { useState, useEffect, useContext } from "react";
import LoadingIcon from '../LoadingIcon';
import { getComments, addComment } from '../../apis/postsAPI';
import UserProfilePicture from '../UserProfilePicture';
import UserName from '../UserName';
import { ModalContext } from '../../contexts/ModalContext';
import ErrorModal from '../ErrorModal';

const Comments = ({ id, updateCommentsCount }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { handleModal } = useContext(ModalContext);
  
  useEffect(() => {
    if (!loading) return;
    
    getComments(id)
      .then(res => {
        setComments(res.data ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, [id, loading]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    addComment(id, comment)
      .then(res => {
        setLoading(true);
        updateCommentsCount(res.data)
      })
      .catch(err => handleModal(<ErrorModal errors={err.response.data.errors } />))
      .finally(() => setComment(''));
  }
  
  const handleChange = (e) => {
    setComment(e.target.value);
  }
  
  return (
    <>
      <hr />
      
      <div className="comments-cnt">
        {
          loading ? <LoadingIcon /> :
            <div className="comments">
              {
                comments.map((comment, index) => {
                  return (
                    <div key={index} className='comment'>
                      <UserProfilePicture pfp={comment.user.pfp} />
                      <div className='comment-text'>
                        <UserName full_name={`${comment.user.first_name} ${comment.user.last_name}`} id={comment.user.id} />
                        <span>{comment.comment}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>  
        }
        
        <form className="post-input" onSubmit={handleSubmit}>
          <input type="text" placeholder='Write a comment...' value={comment} onChange={handleChange} />
          <button type='submit' className='btn-transparent btn-no-border'><img className="svg" src={ArrowRight} alt="Arrow Right" /></button>
        </form>
      </div>
    </>
  );
}

export default Comments;