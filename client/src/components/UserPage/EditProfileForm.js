import '../../styles/Form.css';
import { uploadProfileFile } from '../../apis/fileAPI';
import { useContext, useState} from 'react';
import { ModalContext } from '../../contexts/ModalContext';

const EditProfileForm = () => {
  const { handleModal } = useContext(ModalContext);
  const [profile, setProfile] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 'profile': profile });
    
    uploadProfileFile({ 'profile': profile })
      .then(() => handleModal());
  }
  
  const handleChange = (e) => {
    setProfile(e.target.files[0]);
  }
  
  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type='file' name='profile' onChange={handleChange} />
      
      <button type='submit' className='btn btn-wide'>Submit</button>
    </form>
  );
}

export default EditProfileForm;