import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, ScrollView
} from 'react-native';

import GoogleFit, { Scopes } from 'react-native-google-fit'

const {width} = Dimensions.get('window');
const options = {
    scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE,
    ],
}
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import Constant from "../util/Constant";
export default class SportManage extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            step:0
        }

    }
    componentDidMount(){
        GoogleFit.authorize(options)
            .then(() => {
                dispatch('AUTH_SUCCESS')
            })
            .catch(() => {
                dispatch('AUTH_ERROR')
            })
        this._retrieveDailyStepCountSamples((new Date()).setHours(0, 0, 0, 0),(new Date()).valueOf(),(res, result)=>{
            console.log(res);
            this.setState({
                step:1
            })
        })
    }

    _retrieveDailyStepCountSamples = (startDate, endDate, callback) => {
        googleFit.getDailyStepCountSamples(startDate, endDate,
            (msg) => callback(msg, false),
            (res) => {
                if (res.length > 0) {
                    callback(false, res.map(function (dev) {
                        const obj = {}
                        obj.source = dev.source.appPackage + ((dev.source.stream) ? ':' + dev.source.stream : '')
                        obj.steps = dev.steps
                        return obj
                    }, this))
                } else {
                    callback('There is no any steps data for this period', false)
                }
            }
        )
    }

    render(){
        const { step } = this.state;
        return(
            <View style={{flex:1}}>
                <Text>{step}</Text>
            </View>
        )
    }
}