import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const LasttimeItem = (props) => {
    const DATE_FORMAT = "YY-MM-DD HH:mm"
    return(
        <TouchableOpacity style={styles.row} onPress={() => Actions.lasttime_detail(props)}>
            <Text style={styles.bigText}>{props.title}</Text>
            <Text>{moment(props.lasttime,DATE_FORMAT).fromNow()}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    row: {
        margin: 7,
        padding: 12,
        backgroundColor: '#fff'
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default (LasttimeItem);