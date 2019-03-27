import React, {Component} from 'React'
import {View, Text, Button} from 'react-native'
import GoogleFitManager from './GoogleFitManager'
let googleFitManager=null;
export default class AndroidGoogleFit extends React.Component {

    constructor() {
        console.log('constructor')
        super();
        this.state = {
            step: 0,
            weight: 0,
        }
    }
    componentDidMount() {
        googleFitManager = GoogleFitManager.getInstance();
        this.reloadData = this.reloadData.bind(this)
        googleFitManager.setReloadCallback(this.reloadData)
    }
    reloadData() {
        this.setState({
                step: googleFitManager.getStepCount(),
                weight: googleFitManager.getWeight()
            }
        )
    }

    render() {
        return (
            <View>
                <Text>
                    Step: {this.state.step}
                </Text>
                <Text>
                    Weight: {this.state.weight}
                </Text>
            </View>
        )
    }
}