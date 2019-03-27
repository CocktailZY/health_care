import React, {PureComponent} from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import MD5 from "../util/MD5";
import Constant from "../util/Constant";

const {width} = Dimensions.get('window');
export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userCode: 'admin',
            password: '1'
        };
    };

    componentDidMount() {
        // this.fetchIndexArtical(1);
        // let time = 1553503205414 + 120000;
        // RNAlarm.setAlarm(Date.parse('Mon March 25 2019 16:57:00 GMT+0000 (GMT)').toString(),
        //     'Meeting with customer',
        //     '',
        //     '忆往事',
        //     () => {
        //         console.log("闹钟设置成功");
        //         //http://www.cnblogs.com/mengdd/p/3819806.html
        //         // Success callback function
        //     },
        //     () => {
        //         console.log("闹钟设置失败");
        //         // Fail callback function
        //     });
    }

    //登陆接口
    _login = (url, param, callback) => {
        url += "?token=lhy";
        FetchUtil.httpGet(url, param, callback);
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <Image source={require('../images/login_poster.jpg')} style={{height: 200}}/>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 44}}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <Input
                            placeholder='用户名/邮箱'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'username'}
                            containerStyle={{
                                width: width * 0.7,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => this.setState({"userCode": text})}
                            value={this.state.userCode}
                        />
                        <Input
                            placeholder='密码'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            keyboardType={'numeric'}
                            secureTextEntry={true}
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'password'}
                            containerStyle={{
                                width: width * 0.7,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 50
                            }}
                            onChangeText={(text) => this.setState({"password": text})}
                            value={this.state.password}
                        />
                        <Button
                            title="登录"
                            buttonStyle={{
                                width: width * 0.7,
                                borderRadius: 2,
                                backgroundColor: '#1890ff',
                                marginBottom: 60
                            }}
                            onPress={() => {
                                let loginParam = {
                                    userCode: this.state.userCode,
                                    password: MD5.hex_md5(this.state.password)
                                };
                                this._login(Config.LOGIN, loginParam, (data) => {
                                    if (data.status) {
                                        Constant['user'] = data;
                                        this.props.navigation.navigate('Home')
                                    } else {
                                        Alert.alert('提示', '用户名密码错误');
                                    }
                                });
                            }}
                        />
                        <View style={{width: width * 0.7, alignItems: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#1890ff', marginRight: 20}} onPress={() => {
                                    this.props.navigation.navigate('RegisterDoctor')
                                }}>医生注册</Text>
                                <Text style={{color: '#1890ff'}} onPress={() => {
                                    this.props.navigation.navigate('Register')
                                }}>用户注册</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    };
}