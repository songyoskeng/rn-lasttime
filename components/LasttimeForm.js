import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux'
// import firebase from './firebase'
import moment from 'moment'
const DATE_FORMAT = 'YY-MM-DD HH:mm'
export default class LasttimeForm extends React.Component {
    constructor(){
        super();
        this.state = {
            title : "Have Lunch",
            lasttime: moment().format(DATE_FORMAT)
        }
    }

    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value = {this.state.title}
                    placeholder = {"Your title..."}
                    onChangeText={(text) => this.setState({title: text})}
                    style={styles.textInput}
                />
                <TextInput
                    value = {this.state.lasttime}
                    placeholder = {"Your lasttime..."}
                    onChangeText={(text) => this.setState({lasttime: text})}
                    style={styles.textInput}
                />

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        Actions.pop()
                        this.props.handleAddLasttime(this.state.title, this.state.lasttime)
                    }}
                >
                    <Text style={styles.label}>ADD</Text>
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