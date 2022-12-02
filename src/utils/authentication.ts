import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { app } from './firebaseConfig';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signinWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { email, displayName, photoURL, uid } = res.user;
    const user = { email, displayName, photoURL, uid };

    console.log('User logged in', user);
  } catch (err) {
    console.error("User couldn't log in", err);
  }
};

const signinWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const { email, displayName, photoURL, uid } = res.user;
    const user = { email, displayName, photoURL, uid };

    console.log('User logged in', user);
  } catch (err) {
    console.error("User couldn't log in", err);
  }
};

const signinWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const { email, displayName, photoURL, uid } = res.user;
    res.user.getIdToken();
    const user = { email, displayName, photoURL, uid };

    console.log('User logged in', user);
  } catch (err) {
    console.error("User couldn't log in", err);
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
    console.log('User logged out successfully');
  } catch (err) {
    console.error("User couldn't logout", err);
  }
};

export { signinWithGoogle, signinWithGithub, signinWithFacebook, signOut };
export { auth };
