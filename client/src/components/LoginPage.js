import LoginForm from './LoginForm';
import OBPresentation from './OBPresentation';

const LoginPage = () => {
  return (
    <div className="cnt-horizontal cnt-screen-width cnt-screen-height" style={{
      backgroundColor: 'var(--background)'
    }}>
      <OBPresentation />
      <LoginForm />
    </div>
  );
}

export default LoginPage;