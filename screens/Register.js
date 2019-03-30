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

    _alertText(text,callback) {
        Alert.alert(
            '提醒',
            text,
            [
                {
                    text: '确定',
                    onPress: () => {
                        callback;
                    }
                }
            ],{ cancelable: false }
        )
    }
    //注册
    _register = (callback) => {
        if (this.state.userCode  == "" ) {
            this._alertText('用户名不能为空',()=>{
               // this.setState({"password1": ""});
            })
             return;
        }
        if (this.state.password == "" ) {
            this._alertText('密码不能为空',()=>{
                this.setState({"password1": ""});
            })
            return;
        }
        if (this.state.password1 == "" ) {
            this._alertText('确认密码不能为空',()=>{
                this.setState({"password1": ""});
            })
            return;
        }
        if (this.state.password1 !== this.state.password ) {
            this._alertText('两次密码不一致',()=>{

            })
            return;
        }
        if (this.state.userName =="" ) {
            this._alertText('姓名不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }
        if (this.state.idCard =="" ) {
            this._alertText('身份证不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }
        if (this.state.bsPwd =="" ) {
            this._alertText('病史密码不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }
        let reg=/^[1-9]\d*$/;
        let pattern=new RegExp(reg);
        if(pattern.test(this.state.bsPwd)&&this.state.bsPwd.length>=6){

        }else{
            this._alertText('病史密码为6位数字',()=>{
            }) ;
            return;
        }
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
                                    this.setState({"password1": text})
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
                                    this.setState({"bsPwd": text})
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