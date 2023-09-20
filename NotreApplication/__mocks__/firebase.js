// __mocks__/firebase.js

const auth = {
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    // Ajoutez d'autres méthodes Firebase utilisées dans LoginScreen
};
  
const messaging = {
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    getInitialNotification: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    onMessage: jest.fn(),
};

export { auth, messaging };
  