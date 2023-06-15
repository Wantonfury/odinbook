import '../../styles/Form.css';
import '../../styles/ErrorModal.css';
import { uploadProfileFile } from '../../apis/fileAPI';
import { useContext, useState} from 'react';
import { ModalContext } from '../../contexts/ModalContext';

const EditProfileForm = () => {
  const { handleModal } = useContext(ModalContext);
  const [profile, setProfile] = useState('');
  const [errors, setErrors] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 'profile': profile });
    
    uploadProfileFile({ 'profile': profile })
      .then(() => handleModal())
      .catch(err => setErrors(err.response.data.errors));
  }
  
  const handleChange = (e) => {
    setProfile(e.target.files[0]);
  }
  
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <input type='file' name='profile' onChange={handleChange} />
        
        <button type='submit' className='btn btn-wide'>Submit</button>
      </form>
      
      {
        errors ? 
        <ul className='errors'>
          { errors.map((err, index) => <li key={index}>{err}</li>) }
        </ul> : null
      }
    </>
  );
}

export default EditProfileForm;