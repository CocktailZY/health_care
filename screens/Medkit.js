import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, ScrollView,
    DatePickerAndroid
} from 'react-native';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNAlarm from 'react-native-alarm';
import {Header} from "react-native-elements";
const {width} = Dimensions.get('window');

export default class Medkit extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            title:'该吃药啦！',
            time: new Date()+''
        }
    }
    componentDidMount(){
        // let time=1553503205414+120000;
        let time=Date.parse('Mon March 25 2019 23:27:00 GMT+0800 (GMT)').toString();
        console.log(time);
        RNAlarm.setAlarm(time,
            'Meeting with customer',
            '',
            '',
            () => {
                console.log("闹钟设置成功");
                //http://www.cnblogs.com/mengdd/p/3819806.html
                // Success callback function
            },
            () => {
                console.log("闹钟设置失败");
                // Fail callback function
            });
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    placement="left"
                    leftComponent={
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            color='#ffffff'
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{text: '用药提醒', style: {color: '#fff', fontSize: 18}}}
                />
                <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>

                </View>
            </View>
        )
    }
}