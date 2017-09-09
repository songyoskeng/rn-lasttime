import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,Image } from 'react-native';
import firebase from '../Firebase'
import _ from 'lodash'
import {signOut} from './utils'
export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email : "test@test.com",
            password: "111111"
        }
    }
    componentWillMount() {
        // console.log('firebase current user',firebase.auth().currentUser);
        AsyncStorage.getItem('rn_lasttime.user').then((value) => {
            console.log('value: ', value);

            var _user = JSON.parse(value);
            if(!_.isEmpty(value) && !_.isEmpty(_user)){
               
                console.log('_user: ', _user);

                this.setState({loading: false})
                this.props.updateuser(_user);
                firebase.auth().signInWithEmailAndPassword(_user.email, _user.password)
                .then((user) => {
                  console.log('User successfully logged in', user)
                  
                })
                .catch((err) => {
                    signOut();
                    this.props.updateuser({})
                });
            } else {
                this.setState({loading: false})
            }
           
        })
    }
    handleLogin = ()=> {
        // console.log(this.state.email, this.state.password);
        this.setState({loading: true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log('User successfully logged in', user)
          this.setState({loading: false})
          this.props.updateuser({uid: user.uid, email: this.state.email, password: this.state.password});
        })
        .catch((err) => {
          console.error('User signin error', err);
          this.setState({loading: false})
        });
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading?
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image 
                            style={{width:150,height:150}}
                            source={require('../img/loading.gif')} 
                        />
                    </View>
                        
                    :
                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={{flex:1,justifyContent:'center'}}>
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
                
                        </View>
                       
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={this.handleLogin}>
                            <Text style={styles.label}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    
                }
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    textInput: {
        fontSize: 28,
        textAlign: 'center',
        // textDecorationLine: 'underline',
        marginTop: 25,
        alignSelf: 'stretch'
    },
    btn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'lightseagreen'
    },
    label: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    }
})