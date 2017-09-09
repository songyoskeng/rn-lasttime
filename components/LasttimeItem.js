import React from 'react';
import { StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

const LasttimeItem = (props) => {
    const DATE_FORMAT = "YY-MM-DD HH:mm"
    console.log(props.id);
    return(
        <View style={styles.row}>
            <TouchableOpacity  onPress={() => Actions.lasttime_detail(props)}>
                <Text style={styles.bigText}>{props.activity}</Text>
                <Text>{moment(props.lasttime,DATE_FORMAT).fromNow()}</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => props.handleDelete(props.id)} style={{justifyContent:'center'}}>
                <View  style={styles.delBtn}>
                    <Text style={styles.delLabel}>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    row: {
        margin: 7,
        padding: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    delBtn : {
        opacity:.75  ,
        borderRadius: 15,
        width: 30,
        height: 30,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    delLabel : {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default (LasttimeItem);