import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithCredential, GoogleAuthProvider} from 'firebase/auth/react-native';
import { auth } from '../firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { database } from '../firebase/index';
import { remove, set, ref as dbRef } from "firebase/database";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ initializing, setInitializing ] = useState(true);
 
  const userToken = 'd4XymCvyQIy5pd9KEmOkba:APA91bGCS5T0s_cAJtzMV6ejHq58vFWR1tyZtPJjAgZy2ICiNw-kOM0oOWu6zCV_pN9ylFc0MbEWCQsbjGIY1UUH3s74Rd03DmNMKk8njO9XEcgv0eAeY_rcrWBpPg5NGKpOJSLyGxYH';
  // Utilisez dbRef pour créer une référence à la base de données Firebase
  const tokenRef = dbRef(database, 'token/user1');

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
            set(tokenRef, userToken)
              .then(() => {
                console.log('Token stocké avec succès');
              })
              .catch((error) => {
                console.error('Erreur lors de la sauvegarde du token :', error);
              });
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

            const photoURL = currentUser.photoURL || '../../assets/logo_app.png';
      
            // Mise à jour du profil de l'utilisateur avec des informations de Google
            await updateProfile(currentUser, {
              displayName: currentUser.displayName || 'Utilisateur Google',
              photoURL: photoURL,
            });
            // Mise à jour du contexte d'authentification avec l'utilisateur connecté
            if (!currentUser) {
              googleSignin;
              signInWithEmailAndPassword;
            }
            //await auth.signIn();
            setUser(currentUser);
            console.log(currentUser);
            set(tokenRef, userToken)
              .then(() => {
                console.log('Token stocké avec succès');
              })
              .catch((error) => {
                console.error('Erreur lors de la sauvegarde du token :', error);
              });
          } catch (error) {
            console.error('Google login error:', error);
          }
        },
        logoutWithGoogle: async () => {
          try {
            // Révoquer l'accès au compte Google
            await GoogleSignin.revokeAccess();
            // Déconnecter l'utilisateur de son compte Google
            await GoogleSignin.signOut();
            // Vous pouvez effectuer d'autres actions de déconnexion ici, comme déconnecter l'utilisateur de votre propre système d'authentification si nécessaire.
            console.log('Déconnexion réussie.');
        
            // Mettre à jour le contexte d'authentification pour indiquer que l'utilisateur n'est pas connecté
            setUser(null);
            remove(tokenRef);
          } catch (error) {
            console.error('Erreur lors de la déconnexion de Google :', error);
          }
        },
        logout: async () => {
          try {
            await auth.signOut();
            setUser(null);
            remove(tokenRef);
            console.log('Vous êtes déconnecté.');
          } catch (error) {
            console.error('Logout error:', error);
          }
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};