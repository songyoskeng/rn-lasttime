import firebase from '../Firebase'
import { AsyncStorage } from 'react-native';

export var signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('User signed out successfully');
      AsyncStorage.clear()
    })
    .catch();
}