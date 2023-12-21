import styles from './ExternalAuth.module.css';
import GithubIcon from '../../assets/github-icon.svg';
import { auth , facebookProvider} from "../../config/firebase.js";
import { signInWithPopup, linkWithCredential } from "firebase/auth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export let pendingCred

export const FacebookAuth = () => {
  
  const navigate = useNavigate();

  const signInWithFacebook = async (e) => {
    e.preventDefault()
    try {
      const facebookData = await signInWithPopup(auth,facebookProvider);
      
      const facebookUser = {
        firstName: facebookData._tokenResponse.firstName,
        lastName: facebookData._tokenResponse.lastName,
        username: facebookData._tokenResponse.displayName,
        email: facebookData._tokenResponse.email,
        password: facebookData._tokenResponse.email,
      };

      const response = await axios.post(
          `${import.meta.env.VITE_AXIOS_URI}/users/extLogin`,
          facebookUser
      );

      const token = response.data.authToken;

      sessionStorage.setItem('token', token);
      navigate('/redirect');
    } catch (error){
        if (error.code === "auth/account-exists-with-different-credential") {
            pendingCred = error.credential;
            console.log(error);
            navigate('/login')
            setTimeout(function(){
              alert('You already have an account with a different provider, please try again.')
          }, 300);
        } else if (error.response) {
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
                error,
            );
        }
    }
  };

  return (
    <button
        className={styles.googleLogin}
        onClick={signInWithFacebook}>
        <img src={GithubIcon} alt='Google-icon' />
    </button>
  );
};
