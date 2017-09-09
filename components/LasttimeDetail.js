import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux'
import firebase from '../Firebase'
import moment from 'moment'
export default  class LasttimeDetail extends React.Component {
    componentWillMount() {
        this.ref = firebase.database().ref(this.props.uid+'/todos/'+this.props.id);
    }

    doItNow = () => {
        this.ref.set({
            id: this.props.id,
            activity: this.props.activity,
            description: this.props.description,
            lasttime: moment().format('YY-MM-DD HH:mm')
        })
        Actions.pop()
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={styles.bigText}>{this.props.activity}</Text>
                    <Text style={styles.smallText}>{moment(this.props.lasttime, 'YY-MM-DD HH:mm').fromNow()}</Text>
                    <Text>{this.props.description}</Text>
                </View>
               

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: 'lightseagreen', marginTop: 10}]}
                    onPress={this.doItNow}
                >
                    <Text style={styles.label}>Do it Now!</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'space-between'
    },
    btn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    },
    bigText: {
        fontSize: 36,
        fontWeight: 'bold',

    },
    smallText : {
        fontSize : 20,
        fontWeight: '300'
    }
})

