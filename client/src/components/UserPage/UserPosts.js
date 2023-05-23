import '../../styles/Posts.css';
import { useState, useEffect, useContext } from "react";
import { getPostsUser } from '../../apis/postsAPI';
import Post from '../HomePage/Post';
import LoadingIcon from '../LoadingIcon';
import UserContext from '../../contexts/UserContext';

const UserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    getPostsUser(user.userPageId)
      .then(res => 
        {
          setPosts(res.data ? res.data : []);
        })
      .finally(() => setLoading(false));
  }, [loading, user.userPageId]);
  
  return (
    <div className="posts posts-narrow">
      {
        loading ? <LoadingIcon /> :
          (!posts || posts.length === 0) ? null :
            posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })
      }
    </div>
  );
}

export default UserPosts;