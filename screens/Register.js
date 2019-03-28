import React, {PureComponent} from 'react';
import {View, Image,Alert, Dimensions, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Input, CheckBox, ListItem} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import Constant from "../util/Constant";

const {width} = Dimensions.get('window');
export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userCode: "",
            password: "",
            password1: '',
            role: "otherUser",
            userName: "",
            idCard: '',
            bsPwd: '',//病史密码
        };
    };

    componentDidMount() {
        // this.fetchIndexArtical(1);
    };

    //注册
    _register = (callback) => {
        let param = this.state;
        if(Constant.bsList &&Constant.bsList.length>0){
            let sick=''
            for(let i=0;i<Constant.bsList.length;i++){
                sick+='sick('+Constant.bsList[i].id+'),';
            }
            param['medicalHistory']=sick;
        }else{
            Alert.alert("请选择病史");
        }
        let url = Config.REGISTER + "?token=lhy";
        FetchUtil.httpGet(url, param, callback);
    };

    _renderBsListItem = ({item,index}) => {
        return (
            <View style={{flex:1}}>
                <CheckBox
                    center
                    title='Click Here'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    size={18}
                    checked={item.id}
                />
            </View>
        )
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <Image source={require('../images/login_poster.jpg')} style={{height: 200}}/>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <Input
                            placeholder='用户名/邮箱'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={18}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'username'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => this.setState({"userCode": text})}
                            value={this.state.userCode}
                        />
                        <Input
                            placeholder='6-16位密码，区分大小写'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={18}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'password'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => this.setState({"password": text})}
                            value={this.state.password}
                        />
                        <Input
                            placeholder='确认密码'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={18}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'password'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => {
                                if (this.state.password != "" && text === this.state.password) {
                                    this.setState({"password1": text})
                                } else {
                                    Alert.alert('提示', "密码不一致，请重新输入");
                                }
                            }}
                            value={this.state.password1}
                        />
                        <Input
                            placeholder='姓名'
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    size={18}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => this.setState({"userName": text})}
                            value={this.state.userName}
                        />
                        <Input
                            placeholder='身份证号'
                            leftIcon={
                                <Icon
                                    name='credit-card'
                                    size={18}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => this.setState({"idCard": text})}
                            value={this.state.idCard}
                        />
                        <Input
                            placeholder='病史密码,6位数字密码'
                            leftIcon={
                                <Ionicons
                                    name='ios-lock'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text) => {
                                let reg=/^[1-9]\d*$/;
                                var pattern=new RegExp(reg);
                                if(pattern.test(text)&&text.length==6){
                                    this.setState({"bsPwd": text})
                                }else{
                                    Alert.alert("该密码只能是6位数字");
                                }

                            }}
                            value={this.state.bsPwd}
                        />
                        <View style={{width: width * 0.8, alignItems: 'center', padding: 8}}>
                            <Button
                                title="选择病史"
                                buttonStyle={{borderRadius: 2, width: width * 0.8}}
                                onPress={() => {
                                    this.props.navigation.navigate('BsList');
                                }}
                            />
                        </View>

                        <View style={{flexDirection: 'row', width: width * 0.8, alignItems: 'center'}}>
                            <Button
                                title="注册"
                                buttonStyle={{borderRadius: 2, width: 100}}
                                onPress={() => {
                                    this._register((data) => {
                                        //注册回调
                                        if (data) {
                                            Constant['user'] = data;
                                            Constant.bsList = [];
                                            this.props.navigation.navigate('Home');
                                        }
                                    })
                                }}
                            />
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text style={{color: '#1890ff'}} onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}>使用已有帐户登录</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    };
}