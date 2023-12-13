import styles from './ExternalAuth.module.css';
import GoogleIcon from '../../assets/google-icon.svg';
import { auth , googleProvider} from "../../config/firebase.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const ExternalAuth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const googleData = await signInWithPopup(auth,googleProvider);
      
      const googleUser = {
        firstName: googleData._tokenResponse.firstName,
        lastName: googleData._tokenResponse.lastName,
        username: googleData._tokenResponse.displayName,
        email: googleData._tokenResponse.email,
        password: googleData._tokenResponse.photoUrl,
      };
      
      const response = await axios.post(
          `${import.meta.env.VITE_AXIOS_URI}/users/extLogin`,
          googleUser
      );

      const token = response.data.authToken;

      sessionStorage.setItem('token', token);
      navigate('/redirect');
    } catch (error){
      if (error.response) {
        console.error(
            'Server responded with an error:',
            error.response.data,
      );
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error(
            'Error setting up the request:',
            error.message,
        );
      }
    }
  };

  return (
    <button
        className={styles.googleLogin}
        onClick={signInWithGoogle}>
        <img src={GoogleIcon} alt='Google-icon' />
        <p>Sign in with Google</p>
    </button>
  );
};

