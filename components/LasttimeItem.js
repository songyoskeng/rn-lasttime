import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

const LasttimeItem = (props) => {
    const DATE_FORMAT = "YY-MM-DD HH:mm"
    return(
        <View style={styles.row}>
            <Text style={styles.bigText}>{props.title}</Text>
            <Text>{moment(props.lasttime,DATE_FORMAT).fromNow()}</Text>
        </View>
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