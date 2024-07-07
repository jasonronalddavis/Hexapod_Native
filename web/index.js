import { AppRegistry } from 'react-native';
import App from '../App';  // Adjust the path to your App.js
import { name as appName } from '../app.json';
import { render } from 'react-dom';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
