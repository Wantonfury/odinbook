import { addLike } from "../../apis/postsAPI";
import Comments from "./Comments";
import { useState } from "react";
import UserProfilePicture from "../UserProfilePicture";
import UserName from "../UserName";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = (e) => {
    e.target.classList.contains('liked') ? e.target.classList.remove('liked') : e.target.classList.add('liked');
    
    addLike(props.post.id)
      .then(res => {
        res.data.liked ? e.target.classList.add('liked') : e.target.classList.remove('liked');
      });
  }

  const handleComments = () => {
    //e.target.parentNode.parentNode.querySelector('.post-reply').classList.toggle('post-disabled');
    setShowComments(!showComments);
  }
  
  return (
    <div className="card post">
      <div>
        <div className="post-user">
          <UserProfilePicture pfp={props.post.user.pfp} id={props.post.user.id} />
          
          <div className="post-user-info">
            <UserName full_name={`${props.post.user.first_name} ${props.post.user.last_name}`} id={props.post.user.id} />
            <span>{props.post.date}</span>
          </div>
        </div>
        
        <p>{props.post.message}</p>
      </div>
      
      <hr />
      
      <div className="post-options">
        <button className={"btn btn-transparent" + (props.post.liked ? ' liked' : '')} type="button" onClick={handleLike}>Like</button>
        <button className="btn btn-transparent" type="button" onClick={handleComments}>Comment</button>
      </div>
      
      {
        showComments ? <Comments id={props.post.id} /> : null
      }
    </div>
  );
}

export default Post;