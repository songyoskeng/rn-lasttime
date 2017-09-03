import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import firebase from './firebase'
import moment from 'moment'
const LasttimeDetail = (props) => (
    <View style={styles.container}>
        <Text>{props.title}</Text>
        <Text>{moment(props.lasttime, 'YY-MM-DD HH:mm').fromNow()}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems :'center'
    }
})

export default (LasttimeDetail);