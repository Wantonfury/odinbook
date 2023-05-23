import { useState, useEffect } from "react";
import '../../styles/Form.css';
import '../../styles/Button.css';
import { post } from "../../apis/postsAPI";

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    message: props.message
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    post(formData)
      .then(() => {
        props.setMessage('');
        props.reload(true);
        document.querySelector('#modal-close').click();
      });
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  useEffect(() => {
    props.setMessage(formData.message);
  }, [props, formData]);
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea rows="20" name="message" value={formData.message} onChange={handleChange} />
      <button className="btn btn-wide" type="submit">Post</button>
    </form>
  );
}

export default PostForm;