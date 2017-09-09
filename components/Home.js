import React from 'react';
import { StyleSheet, Text, View, ListView, AsyncStorage } from 'react-native';
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
    componentWillMount() {
        firebase.messaging().subscribeToTopic('news');        
    }
    updateuser = (user) => {
        this.setState({user: user})
        // console.log(user);
        AsyncStorage.setItem('rn_lasttime.user', JSON.stringify({...user}));
    }
  
    render() {
        // console.log( this.state.user);
        return (
            <View style={styles.container}>
              {
                _.isEmpty(this.state.user)?
                <Login updateuser={this.updateuser}/>
                :
                <Lasttimelist updateuser={this.updateuser}  user={this.state.user}/>
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