import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      {/* Your main navigation */}
      <AppNavigation />
      
      {/* Toast configuration */}
      <Toast />
    </>
  );
};

export default App;

