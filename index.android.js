import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import codePush from 'react-native-code-push';

AppRegistry.registerComponent('kovu', () => codePush(App));
