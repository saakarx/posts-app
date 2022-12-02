import React, { useEffect, createContext, useContext, useState } from 'react';
import { User } from 'firebase/auth';

import { auth } from '../utils/authentication';

type AuthProviderProps = {
  children: React.ReactNode;
};
type AuthApiContextType = React.Dispatch<
  React.SetStateAction<User | null>
> | null;

const AuthDataContext = createContext<User | null>(null);
const AuthApiContext = createContext<AuthApiContextType>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      currentUser => setCurrUser(currentUser),
      err => {
        console.error(err);
      }
    );
  }, []);

  return (
    <AuthApiContext.Provider value={setCurrUser}>
      <AuthDataContext.Provider value={currUser}>
        {children}
      </AuthDataContext.Provider>
    </AuthApiContext.Provider>
  );
};

const useAuthData = () => {
  return useContext(AuthDataContext);
};
const useAuthApi = () => {
  return useContext(AuthApiContext);
};

export { useAuthData, useAuthApi };
export default AuthProvider;
