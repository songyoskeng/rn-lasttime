import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
// import firebase from './firebase'
import Lasttimelist from './Lasttimelist'
import LasttimeItem from './LasttimeItem'

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Lasttimelist />       
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