import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity, AsyncStorage, Image,RefreshControl } from 'react-native';
// import firebase from './firebase'
import { Actions } from 'react-native-router-flux'
import firebase from '../Firebase'
import moment from 'moment'
import _ from 'lodash'
import LasttimeItem from './LasttimeItem'
import {signOut} from './utils'
export default class Lasttimelist extends React.Component {
    constructor(){
        super();
        this.ref = null;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
      
        this.state = {
            lasttimes: this.ds.cloneWithRows({}),
            loading : true,
            refreshing: false,
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
    _onRefresh = () =>  {
        this.setState({refreshing: true});
        this.ref.on('value', this.handleItemUpdate);
      }

    handleItemUpdate = (snapshot) => {

        this.lasttimes = snapshot.val() || {};
        this.lasttimes = _.orderBy(this.lasttimes, ['lasttime'],['desc'])
        
        console.log('this.lasttimes: ', this.lasttimes);
        this.setState({
            lasttimes: this.ds.cloneWithRows(this.lasttimes),
            loading: false,
            refreshing: false
        });

          
    }
    renderRow(item) {
        return (
            <LasttimeItem {...item} />
        );
    }
    
    handleAddLasttime = (item) => {
        var newItem = new Object()
        var newId = _.max(_.keys(this.lasttimes)) + 1;

        newItem[newId] = {
            id : newId,
            ...item
        }
        console.log(newItem);
        

        this.ref.set({
          ...this.lasttimes, 
          ...newItem
        })

    }

    handleSignout = () => {
        signOut();
        this.props.updateuser({})
    }
    handleReload = () => {
        console.log("Hello");
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
                    <View style={{flex:1}}>
                        <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            onMomentumScrollBegin = {this.handleReload}
                            dataSource={this.state.lasttimes}
                            renderRow={(...args) => this.renderRow(...args)}
                            enableEmptySections={true}
                        />
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: '#060606',marginVertical:0}]}
                            onPress={() => Actions.lasttime_form({handleAddLasttime:this.handleAddLasttime})}
                        >
                            <Text style={styles.label}>CREATE NEW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: 'crimson', marginTop: 10}]}
                            onPress={this.handleSignout}
                        >
                            <Text style={styles.label}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                }
                
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
})