import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      data: userCredential,
    }
  }catch(e) {
    return {
      success: false,
      data: {
        code: e.code,
        message: e.message
      }
    }
  }
}
