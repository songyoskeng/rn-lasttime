import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import firebase from '../Firebase'
import _ from 'lodash'
import {signOut} from './utils'
export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email : "test@test.com",
            password: "111111",
        }
    }
    componentWillMount() {
        // console.log('firebase current user',firebase.auth().currentUser);
        AsyncStorage.getItem('rn_lasttime.user').then((value) => {
            console.log('value: ', value);

            var _user = JSON.parse(value);
            if(!_.isEmpty(value) && !_.isEmpty(_user)){
               
                console.log('_user: ', _user);
                this.props.updateuser(_user);

                firebase.auth().signInWithEmailAndPassword(_user.email, _user.password)
                .then((user) => {
                  console.log('User successfully logged in', user)
                  
                })
                .catch((err) => {
                    signOut();
                    this.props.updateuser({})
                });
            }
           
        })
    }
    handleLogin = ()=> {
        console.log(this.state.email, this.state.password);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log('User successfully logged in', user)
          this.props.updateuser({uid: user.uid, email: this.state.email, password: this.state.password});
        })
        .catch((err) => {
          console.error('User signin error', err);
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value = {this.state.email}
                    placeholder = {"Email"}
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({email: text})}
                    style={styles.textInput}
                />
                <TextInput
                    value = {this.state.password}
                    placeholder = {"Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={this.handleLogin}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center'
    },
    textInput: {
        fontSize: 28,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 25,
        alignSelf: 'stretch'
    }
})