import IconGithub from '../assets/images/github-mark.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div id='footer'>
      <span>Created by Wantonfury</span>
      <a href='https://github.com/Wantonfury/odinbook' target='_blank' rel='noreferrer noopener'>
        <img src={IconGithub} alt='Link to GitHub' />
      </a>
    </div>
  );
}

export default Footer;