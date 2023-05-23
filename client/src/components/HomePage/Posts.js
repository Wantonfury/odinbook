import { useContext, useEffect, useState } from 'react';
import '../../styles/Posts.css';
import UserContext from '../../contexts/UserContext';
import ArrowRight from '../../assets/images/arrow-right.svg';
import { ModalContext } from '../../contexts/ModalContext';
import PostForm from './PostForm';
import '../../styles/SVG.css';
import LoadingIcon from '../LoadingIcon';
import { getPosts } from '../../apis/postsAPI';
import Post from './Post';

const Posts = () => {
  const { user } = useContext(UserContext);
  const { handleModal } = useContext(ModalContext);
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (!loading) return;
    
    getPosts()
      .then(posts => {
        setPosts(posts.data ? posts.data : []);
      })
      .finally(() => setLoading(false));
  }, [loading]);
  
  return (
    loading ? <LoadingIcon /> :
      <div className="posts">
        <div className="card post-input">
          <input readOnly={true} type="text" placeholder={`What's on your mind, ${user.first_name}?`} value={message} onFocus={() => handleModal(<PostForm message={message} setMessage={setMessage} reload={setLoading} />)} />
          <img className="svg" src={ArrowRight} alt="Arrow Right" />
        </div>
        
        {
          posts.map((post, index) => {
            return (
              <Post key={index} post={post} />
            );
          })
        }
      </div>
  );
}

export default Posts;