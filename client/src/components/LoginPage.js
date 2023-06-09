import LoginForm from './LoginForm';
import OBPresentation from './OBPresentation';

const LoginPage = ({ reload }) => {
  return (
    <div className="cnt-horizontal cnt-screen-width cnt-screen-height" style={{
      backgroundColor: 'var(--background)'
    }}>
      <OBPresentation />
      <LoginForm reload={reload} />
    </div>
  );
}

export default LoginPage;