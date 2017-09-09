import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, DatePickerIOS, DatePickerAndroid, Platform } from 'react-native';
import {Actions} from 'react-native-router-flux'
// import firebase from './firebase'
import moment from 'moment'
import _ from 'lodash'

const DATE_FORMAT = 'YY-MM-DD HH:mm'
export default class LasttimeForm extends React.Component {
    constructor(){
        super();
        var today = new Date();

        this.state = {
            title : "",
            description: "",
            lasttime: moment().format(DATE_FORMAT),
            date : today,
        }
    }
    onDateChange = (date) => {
        this.setState({date})
    }

    handleDatePickerAndroid = () => {
        DatePickerAndroid.open({
            // Use `new Date()` for current date.
            // May 25 2020. Month 0 is January.
            date: this.state.date
        }).then(date => {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log(date);
                var datestr = date.day+'/'+(date.month+1)+'/'+date.year
                this.setState({lasttime : datestr})
            }
        })
    }

    handleAddItem = () => {
        if(this.state.title.length > 2){
            Actions.pop()
            var _lasttime = moment(this.state.date).format(DATE_FORMAT)
            var newItem = {
                activity: this.state.title,
                lasttime: _lasttime,
                description: this.state.description
            }
            console.log('newItem: ', newItem);
            this.props.handleAddLasttime(newItem)
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>  
                    <TextInput
                        value = {this.state.title}
                        placeholder = {"Your Activity..."}
                        onChangeText={(text) => this.setState({title: text})}
                        style={styles.textInput}
                    />
                    {/*
                    <TextInput
                        value = {this.state.description}
                        placeholder = {"Description ..."}
                        onChangeText={(text) => this.setState({description: text})}
                        style={[styles.textInput, {fontSize:18}]}
                    />*/}
                    {
                        Platform.OS == 'ios'?
                        <DatePickerIOS
                            style={{alignSelf:'stretch',height: 75,justifyContent:'center',overflow:'hidden',marginVertical:25}}
                            date = {this.state.date}
                            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                            onDateChange={this.onDateChange}
                            mode={'datetime'}
                            minuteInterval={5}
                        />
                        :
                        <TouchableOpacity
                            onPress = {this.handleDatePickerAndroid}
                        >
                            <Text>{this.state.lasttime}</Text>
                        </TouchableOpacity>
                        
                    }
                    
                </View>
               

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleAddItem}
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
        justifyContent:'space-between'
    },
    textInput: {
        fontSize: 28,
        textAlign: 'center',
        // textDecorationLine: 'underline',
        marginTop: 25,
        alignSelf: 'stretch'
    },
    btn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightseagreen'
    },
    label: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white'
    }
})