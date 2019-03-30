import React, {PureComponent} from 'react';
import {View, Image, Dimensions, Text, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";

const {width} = Dimensions.get('window');
export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            userCode:"",
            password:"",
            password1:'',
            role:"doctor",
            userName:"",
            idCard:'',
            offices:'',//科式
            certificateNo:'',//证件号
            hospital:''
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
        if (this.state.hospital =="" ) {
            this._alertText('医院不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }
        if (this.state.offices =="" ) {
            this._alertText('科室不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }

        if (this.state.certificateNo =="" ) {
            this._alertText('证件号不能为空',()=>{
                //this.setState({"password1": ""});
            })
            return;
        }

        let param =this.state;
        console.log(param);
        let url = Config.REGISTER+"?token=lhy";
        FetchUtil.httpGet(url,param,callback);
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <Image source={require('../images/login_poster.jpg')} style={{height:200}} />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',padding:10}}>
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
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text)=>this.setState({"userCode":text})}
                            value={this.state.userCode}
                        />
                        <Input
                            placeholder='6-16位密码，区分大小写'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'password'}
                            containerStyle={{
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text)=>this.setState({"password":text})}
                            value={this.state.password}
                        />
                        <Input
                            placeholder='确认密码'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'password'}
                            containerStyle={{
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text)=>{
                                    this.setState({"password1":text});
                            }}
                            value={this.state.password1}
                        />
                        <Input
                            placeholder='姓名'
                            leftIcon={
                                <Icon
                                    name='user'
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
                            onChangeText={(text)=>this.setState({"userName":text})}
                            value={this.state.userName}
                        />
                        <Input
                            placeholder='身份证号'
                            leftIcon={
                                <Icon
                                    name='lock'
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
                            onChangeText={(text)=>this.setState({"idCard":text})}
                            value={this.state.idCard}
                        />
                        <Input
                            placeholder='所属医院'
                            leftIcon={
                                <Icon
                                    name='home'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}

                            onChangeText={(text)=>this.setState({"hospital":text})}
                            value={this.state.hospital}
                        />
                        <Input
                            placeholder='所属科室'
                            leftIcon={
                                <Icons
                                    name='home-city-outline'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text)=>this.setState({"offices":text})}
                            value={this.state.offices}
                        />
                        <Input
                            placeholder='医师证号'
                            leftIcon={
                                <Icon
                                    name='credit-card'
                                    size={22}
                                    color='black'
                                    style={{marginRight: 10}}
                                />
                            }
                            inputContainerStyle={{borderColor: 'transparent'}}
                            textContentType={'text'}
                            containerStyle={{
                                flex:1,
                                width: width * 0.8,
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                marginBottom: 30
                            }}
                            onChangeText={(text)=>this.setState({"certificateNo":text})}
                            value={this.state.certificateNo}
                        />
                        <View style={{flexDirection:'row',width:width*0.8,alignItems:'center'}}>
                            <Button
                                title="注册"
                                buttonStyle={{borderRadius: 2,width:100}}
                                onPress={()=>{
                                    this._register((data)=>{
                                        //注册回调
                                        console.log(data);
                                        if(data){
                                            Constant['user']=data;
                                            this.props.navigation.navigate('Home');
                                        }

                                    })
                                }}
                            />
                            <View style={{flex:1,alignItems:'flex-end'}}>
                                <Text style={{color:'#1890ff'}} onPress={()=>{this.props.navigation.navigate('Login')}}>使用已有帐户登录</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    };
}