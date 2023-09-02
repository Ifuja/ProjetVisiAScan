import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithCredential, GoogleAuthProvider} from 'firebase/auth/react-native';
import { auth } from '../firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ initializing, setInitializing ] = useState(true);
 
  GoogleSignin.configure({
    webClientId: '922703610991-0fvd4dd344dhehfn8qp50b8go5c23c3j.apps.googleusercontent.com', // Remplacez par votre web client ID
    
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

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
            if (!currentUser) {
              signInWithEmailAndPassword;
            }
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
        loginWithGoogle: async () => { // Ajout de la fonction de connexion via Google
          try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            
            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(idToken);
            
            // Sign-in the user with the credential
            const googleSignin = await signInWithCredential(auth, googleCredential);
            
            const currentUser = googleSignin.user;
      
            // Mise à jour du profil de l'utilisateur avec des informations de Google
            await updateProfile(currentUser, {
              displayName: currentUser.displayName || 'Utilisateur Google',
              photoURL: currentUser.photoURL || '',
            });
            // Mise à jour du contexte d'authentification avec l'utilisateur connecté
            if (!currentUser) {
              googleSignin;
              signInWithEmailAndPassword;
            }
            //await auth.signIn();
            setUser(currentUser);
            console.log(currentUser);
          } catch (error) {
            console.error('Google login error:', error);
          }
        },
        logoutWithGoogle: async () => {
          try {     
            await auth.signOut();

            // Révoquer l'accès Google indépendamment de la connexion Firebase
            await GoogleSignin.revokeAccess();
        
            // Mettre à jour le contexte d'authentification pour indiquer que l'utilisateur n'est pas connecté
            setUser(null);
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
        logout: async () => {
          try {
            await auth.signOut();
            setUser(null);
          } catch (error) {
            console.error('Logout error:', error);
          }
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};