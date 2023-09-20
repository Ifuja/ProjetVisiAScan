// __mocks__/google-signin.js

const GoogleSignin = {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    revokeAccess: jest.fn(),
};
  
export { GoogleSignin };
  