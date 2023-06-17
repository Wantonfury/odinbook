import '../styles/Form.css';
import '../styles/Button.css';
import { useState, useContext } from "react";
import { login } from "../apis/userAPI";
import UserContext from '../contexts/UserContext';

const LoginForm = ({ reload }) => {
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
        });
        reload();
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
    <form className="form form-border form-shadows" onSubmit={handleSubmit}>
      <h2 className='login-page-title'>Log In</h2>
      
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className="btn" type="submit">Log in</button>
      <button className="btn" type="button">Sign up</button>
      
      <hr style={{
        width: '80%',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        border: 'none',
        height: '1px'
      }} />
      
      <button className='btn btn-short' type='button'>Try Demo Account 1</button>
      <button className='btn btn-short' type='button'>Try Demo Account 2</button>
    </form>
  );
}

export default LoginForm;