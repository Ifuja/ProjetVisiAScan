import React, { createContext, useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth/react-native';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, password) => {
          // TODO
        },
        register: async (displayName, email, password) => {
          setLoading(true);

          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth, email, password);

            await updateProfile(auth.currentUser, {
              displayName: displayName
            });

            // Signed-in Firebase user
            const currentUser = userCredential.user;

            console.log("Firebase user created: ", currentUser);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        },
        logout: async () => {
          // TODO
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};