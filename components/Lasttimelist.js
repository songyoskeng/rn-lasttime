import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
// import firebase from './firebase'
import { Actions } from 'react-native-router-flux'
import firebase from '../Firebase'

import LasttimeItem from './LasttimeItem'

export default class Lasttimelist extends React.Component {
    constructor(){
        super();
        this.ref = null;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
      
        this.state = {
            lasttimes: this.ds.cloneWithRows({}),
        };
    
        // Keep a local reference of the TODO items
        this.lasttimes = {};
    }
    componentDidMount() {
        this.ref = firebase.database().ref('todos');
        this.ref.on('value', this.handleItemUpdate);
    }
    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleItemUpdate);
        }
    }

    handleItemUpdate = (snapshot) => {
        this.lasttimes = snapshot.val() || {};
    
        this.setState({
            lasttimes: this.ds.cloneWithRows(this.lasttimes),
        });
    }
    renderRow(item) {
        return (
            <LasttimeItem {...item} />
        );
    }
    
    handleAddLasttime = () => {
        console.log("Yolo");
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.lasttimes}
                    renderRow={(...args) => this.renderRow(...args)}
                    enableEmptySections={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleAddLasttime}
                >
                    <Text style={styles.label}>ADD</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn: {
        backgroundColor: 'lightseagreen',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    }
})