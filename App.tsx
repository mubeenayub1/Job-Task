/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNav from './src/navigation';
import { AlertNotificationRoot } from 'react-native-alert-notification';

function App(): JSX.Element {
  return (
    <AlertNotificationRoot>
      <MainNav />
    </AlertNotificationRoot>
  );
}

export default App;
