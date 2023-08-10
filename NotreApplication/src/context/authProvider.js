import React, { createContext, useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth/react-native';
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
          setLoading(true);
          try {
            const signInWithEmail = await signInWithEmailAndPassword(auth, email, password);
        
            // Utilisateur Firebase connecté
            const currentUser = signInWithEmail.user;
            setUser(currentUser); // Met à jour la valeur de user avec l'utilisateur connecté
            console.log("Firebase user connected: ", currentUser);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
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