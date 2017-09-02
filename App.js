import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './firebase'
export default class App extends React.Component {
    constructor(){
      super();
      this.ref = null;
    }
    componentDidMount() {
      this.ref = firebase.database().ref('todos');
      this.ref.on('value', this.handleToDoUpdate);
    }

    componentWillUnmount() {
      if (this.ref) {
        this.ref.off('value', this.handleToDoUpdate);
      }
    }

    handleToDoUpdate = (snapshot) => {
      this.todos = snapshot.val() || {};
      console.log('this.todos: ', this.todos);
  
      // this.setState({
      //   todos: this.listView.cloneWithRows(this.todos),
      // });
    }

    
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
