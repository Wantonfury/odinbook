import '../../styles/Button.css';
import '../../styles/Options.css';

const Options = (props) => {
  return (
    <div id="options">
      <button className='btn' type='button' onClick={() => props.setOption(props.options.recent)}>Recent</button>
      <button className='btn' type='button' onClick={() => props.setOption(props.options.findFriends)}>Find Friends</button>
    </div>
  );
}

export default Options;