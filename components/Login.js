import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../Firebase'
export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email : "test@test.com",
            password: "111111",
        }
    }
    handleLogin = ()=> {
        console.log(this.state.email, this.state.password);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log('User successfully logged in', user)
          this.props.updateuser(user);
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