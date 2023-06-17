import LoginForm from './LoginForm';
import OBPresentation from './OBPresentation';
import '../styles/LoginPage.css';

const LoginPage = ({ reload }) => {
  return (
    <div className='login-page'>
      <div className="login-page-cnt">
        <div><OBPresentation /></div>
        
        <div className='vl'></div>
        
        <div><LoginForm reload={reload} /></div>
      </div>
    </div>
  );
}

export default LoginPage;