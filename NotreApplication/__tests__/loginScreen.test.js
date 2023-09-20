import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/loginScreen';
import { AuthProvider } from '../src/context/authProvider';
import { GoogleSignin } from '../__mocks__/google-signin';

// Vous devrez peut-être ajouter des mocks pour Firebase et d'autres dépendances utilisées dans LoginScreen.

it('performs Google authentication', async () => {
  // Mock de la fonction signIn de Google Sign-In
  GoogleSignin.signIn.mockResolvedValue({ idToken: 'mockIdToken' });

  // Rendre le composant LoginScreen enveloppé dans AuthProvider
  const { getByText, findByText } = render(
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );

  // Simuler un clic sur le bouton de connexion Google
  fireEvent.press(getByText('Google Sign-In'));

  // Attendre que l'authentification Google soit terminée (vous pouvez ajouter un délai ou une promesse si nécessaire)
  const loggedInMessage = await findByText('Logged in with Google');

  // Vérifier si le message "Logged in with Google" est présent après la connexion réussie
  expect(loggedInMessage).toBeTruthy();

  // Vous pouvez également vérifier si un utilisateur est connecté en fonction de la logique de votre application.
  // Par exemple, si votre contexte d'authentification est configuré correctement, vous pouvez vérifier
  // si l'utilisateur est connecté comme ceci :
  // const user = yourAuthContext.getCurrentUser(); // Obtenez l'utilisateur actuel depuis votre contexte
  // expect(user).not.toBeNull(); // Assurez-vous que l'utilisateur est non nul

  // Vous pouvez également vérifier d'autres comportements attendus après la connexion Google.

  // Remarque : assurez-vous d'ajuster les assertions en fonction de la logique de votre application.
});
