import styles from './ExternalAuth.module.css';
import GoogleIcon from '../../assets/google-icon.svg';
import { auth , googleProvider} from "../../config/firebase.js";
import { signInWithPopup, linkWithCredential } from "firebase/auth";
import { pendingCred } from '../../components/ExternalAuth/GithubAuth.jsx'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const GoogleAuth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const googleData = await signInWithPopup(auth,googleProvider);
      // if (pendingCred !== null) {
      //   // As you have access to the pending credential, you can directly call the
      //   // link method.
      //   let user = await linkWithCredential(result.user, pendingCred);
      // }
      const extUser = {
        firstName: googleData._tokenResponse.firstName,
        lastName: googleData._tokenResponse.lastName,
        username: googleData._tokenResponse.displayName,
        email: googleData._tokenResponse.email,
        password: googleData._tokenResponse.photoUrl,
        extPicture: googleData._tokenResponse.photoUrl,
        isExt: true
      };
      
      const response = await axios.post(
          `${import.meta.env.VITE_AXIOS_URI}/users/extLogin`,
          extUser
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
    </button>
  );
};

