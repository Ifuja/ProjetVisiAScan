module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
      '^.+\\.(js|jsx)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect', // Pour les extensions d'assertions de @testing-library/react-native
    ],
};
  