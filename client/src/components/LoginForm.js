import '../styles/Form.css';
import '../styles/Button.css';
import { useState, useContext } from "react";
import { login } from "../apis/userAPI";
import UserContext from '../contexts/UserContext';

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    login(data)
      .then(res => {
        setUser({
          ...res.data,
          loggedIn: true
        })
      })
      .catch(err => console.log(err));
    
    return true;
  }
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <form className="form form-border" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="btn" type="submit">Log in</button>
      <button className="btn" type="button">Sign up</button>
    </form>
  );
}

export default LoginForm;