import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
// import firebase from './firebase'
import firebase from '../Firebase'
import Lasttimelist from './Lasttimelist'
import Login from './Login'
import _ from 'lodash'
export default class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            user: {}
        }
    }
    updateuser = (user) => {
        this.setState({user: user})
    }
    componentWillUnmount() {
        firebase.auth().signOut()
        .then(() => {
          console.log('User signed out successfully');
        })
        .catch();
    }
    render() {
        return (
            <View style={styles.container}>
              {
                _.isEmpty(this.state.user)?
                <Login updateuser={this.updateuser}/>
                :
                <Lasttimelist/>
              }  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb'
    }
})