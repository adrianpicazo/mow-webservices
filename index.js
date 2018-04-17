import { AppRegistry } from 'react-native';
import Reactotron from 'reactotron-react-native';
import App from './src/App';

// To ignore specific warning messages
console.ignoredYellowBox = ['Remote debugger'];

console.log = Reactotron.log;
console.warn = Reactotron.warn;

AppRegistry.registerComponent('mealsOnWheel_JavaScript', () => App);
