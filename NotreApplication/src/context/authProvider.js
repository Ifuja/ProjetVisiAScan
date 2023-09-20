import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithCredential, GoogleAuthProvider} from 'firebase/auth/react-native';
import { auth } from '../firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { database } from '../firebase/index';
import { remove, set, get, ref as dbRef } from "firebase/database";
import messaging from '@react-native-firebase/messaging';

export const AuthContext = createContext({});

const extractFirstName = (email) => {
  // Exemple simple : en supposant que l'adresse e-mail est au format "prenom.nom@example.com"
  // Vous pouvez personnaliser cette logique en fonction de votre cas d'utilisation
  const parts = email.split('@');
  if (parts.length === 2) {
    const firstName = parts[0].split('.')[0]; // Utilisation de la première partie du nom avant "@"
    return firstName;
  }
  return email; // Si la logique d'extraction échoue, renvoyez l'adresse e-mail complète
};

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState();
  const [ currentUser ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ initializing, setInitializing ] = useState(true);
 
  // Lorsque vous avez besoin du token pour un utilisateur spécifique
  const getTokenForUser = async (uniqueIdentifier) => {
    // Créez un chemin de référence pour l'utilisateur spécifique
    const userTokenRef = dbRef(database, `token/${uniqueIdentifier}`);

    // Récupérez le token à partir du chemin de référence
    const userTokenSnapshot = await get(userTokenRef);

    if (userTokenSnapshot.exists()) {
      const userToken = userTokenSnapshot.val();
      console.log('Token de l\'utilisateur:', userToken);
      return userToken;
    } else {
      console.log('Aucun token trouvé pour cet utilisateur.');
      return null;
    }
  };

  const cleanIdentifier = (email) => {
    // Vous pouvez mettre en œuvre votre logique de nettoyage ici, par exemple, en supprimant les caractères spéciaux
    // ou en transformant l'identifiant en un format accepté par Firebase Realtime Database
    return email.replace(/[^a-zA-Z0-9]/g, ''); // Cela supprime tous les caractères non alphanumériques
  };

  // const userToken = 'dEi3a12HQ06xCvyljmdPbO:APA91bEvePjSXcGi8C-l_wKsng0b1p8edWdwTYBXx3GcpStY3VhZLNte6-BT6ewMUW8_tf6vkzRXOY-4pdCurauNMNT1m6780oVCH6PRroCgyn0o7dR0TgPDKn-OJuAWRhHxuBfGGDdH';
  // Utilisez dbRef pour créer une référence à la base de données Firebase
  // const tokenRef = dbRef(database, 'token/user1');

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
        currentUser,
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
        
            const uniqueIdentifier = extractFirstName(email);
            const userToken = await messaging().getToken();
            
            // Appelez getTokenForUser avec l'identifiant unique
            const userTokenForUser = await getTokenForUser(uniqueIdentifier);
        
            if (userTokenForUser) {
              console.log('Token déjà stocké pour cet utilisateur:', userTokenForUser);
            } else {
              // Définissez userTokenRef à l'intérieur de cette fonction
              const userTokenRef = dbRef(database, `token/${uniqueIdentifier}`);
              await set(userTokenRef, userToken);
              console.log('Token stocké avec succès');
            }
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
        loginWithGoogle: async () => {
          setLoading(true);
          try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken, user } = await GoogleSignin.signIn();
        
            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(idToken);
        
            // Sign-in the user with the credential
            const googleSignin = await signInWithCredential(auth, googleCredential);
        
            const currentUser = googleSignin.user;
            console.log('Google user connected :', currentUser);
        
            const photoURL = currentUser.photoURL;
        
            // Mise à jour du profil de l'utilisateur avec des informations de Google
            await updateProfile(currentUser, {
              displayName: currentUser.displayName || 'Utilisateur Google',
              photoURL: photoURL,
            });
            
            if (!currentUser) {
              // Gestion des erreurs ici si nécessaire
              console.error('Utilisateur non trouvé.');
              return;
            }
        
            const uniqueIdentifier = extractFirstName(currentUser.uid); // Utilisez l'e-mail comme identifiant unique ici
            const userToken = await messaging().getToken();
        
            // Appelez getTokenForUser avec l'identifiant unique
            const userTokenForUser = await getTokenForUser(uniqueIdentifier);
        
            if (userTokenForUser) {
              console.log('Token déjà stocké pour cet utilisateur:', userTokenForUser);
            } else {
              // Définissez userTokenRef à l'intérieur de cette fonction
              const userTokenRef = dbRef(database, `token/${uniqueIdentifier}`);
              await set(userTokenRef, userToken);
              console.log('Token stocké avec succès');
            }
          } catch (error) {
            console.error('Google login error:', error);
          } finally {
            setLoading(false);
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

            // Assurez-vous que currentUser est défini
            const currentUser = auth.currentUser;

            if (currentUser) {
              // Obtenir le token de l'utilisateur connecté (peut-être basé sur son email)
              const uniqueIdentifier = extractFirstName(currentUser.email);
              const userTokenForUser = await getTokenForUser(uniqueIdentifier);
          
              if (userTokenForUser) {
                // Supprimer le token de l'utilisateur
                await remove(userTokenForUser);
                console.log('Token supprimé avec succès');
              }
            }
        
            // Mettre à jour le contexte d'authentification pour indiquer que l'utilisateur n'est pas connecté
            setUser(null);
          } catch (error) {
            console.error('Erreur lors de la déconnexion de Google :', error);
          }
        },
        logout: async () => {
          try {
            await auth.signOut();
            // Assurez-vous que currentUser est défini
            const currentUser = auth.currentUser;

            if (currentUser) {
              // Obtenir le token de l'utilisateur connecté (peut-être basé sur son email)
              const uniqueIdentifier = extractFirstName(currentUser.email);
              const userTokenForUser = await getTokenForUser(uniqueIdentifier);
          
              if (userTokenForUser) {
                // Supprimer le token de l'utilisateur
                await remove(userTokenForUser);
                console.log('Token supprimé avec succès');
              }
            }
            setUser(null);

            console.log('Vous êtes déconnecté.');
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
        getTokenForUser: getTokenForUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};