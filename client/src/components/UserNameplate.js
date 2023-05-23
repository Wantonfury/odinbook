import DefaultProfileImage from '../assets/images/account-default-image.svg';
import '../styles/Contacts.css';

const UserNameplate = (props) => {
  return (
    <div className="contact">
      <img src={props.user.pfp ? props.user.pfp : DefaultProfileImage} alt='Profile' />
      <span>{ props.user.first_name + ' ' + props.user.last_name }</span>
    </div>
  );
}

export default UserNameplate;