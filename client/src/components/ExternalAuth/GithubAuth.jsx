import styles from './ExternalAuth.module.css';
import GithubIcon from '../../assets/github-icon.svg';
import { auth , githubProvider} from "../../config/firebase.js";
import { signInWithPopup, linkWithCredential } from "firebase/auth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export let pendingCred

export const GithubAuth = () => {
  
  const navigate = useNavigate();

  const signInWithGithub = async (e) => {
    e.preventDefault()
    try {
      const githubData = await signInWithPopup(auth,githubProvider);
      console.log(githubData);
      
      const githubUser = {
        firstName: githubData._tokenResponse.screenName,
        // lastName: '',
        username: githubData._tokenResponse.screenName,
        email: githubData._tokenResponse.email,
        password: githubData._tokenResponse.photoUrl,
        extPicture: githubData._tokenResponse.photoUrl,
        isExt: true
      };
      console.log(githubUser);
      const response = await axios.post(
          `${import.meta.env.VITE_AXIOS_URI}/users/extLogin`,
          githubUser
      );

      const token = response.data.authToken;

      sessionStorage.setItem('token', token);
      navigate('/redirect');
    } catch (error){
        if (error.code === "auth/account-exists-with-different-credential") {
            pendingCred = error.credential;
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
                error.message,
            );
        }
    }
  };

  return (
    <button
        className={styles.googleLogin}
        onClick={signInWithGithub}>
        <img src={GithubIcon} alt='Google-icon' />
        <p>Sign in with Github</p>
    </button>
  );
};
