import React, {PureComponent} from 'react';
import {View, Image, Dimensions, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';

const {width} = Dimensions.get('window');
export default class Register extends PureComponent {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        // this.fetchIndexArtical(1);
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <Image source={require('../images/login_poster.jpg')} style={{height:240}} />
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center',padding:10}}>
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
                        />
                        <Input
                            placeholder='11位手机号'
                            leftIcon={
                                <Icon
                                    name='phone'
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
                        />
                        <View style={{flexDirection:'row',width:width*0.8,alignItems:'center'}}>
                            <Button
                                title="注册"
                                buttonStyle={{borderRadius: 2,width:100}}
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