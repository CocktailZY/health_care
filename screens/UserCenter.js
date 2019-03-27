import React, {Component} from 'react';
import {
    Platform, StyleSheet,
    Text, View, Image, TouchableOpacity, Alert,
    Dimensions, DeviceEventEmitter, NetInfo,
    ScrollView, Linking
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import {StackActions, NavigationActions} from 'react-navigation';
const {width} = Dimensions.get('window');
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            hospital: '',
            offices: '',
            certificateNo: '',
            medicalHistory: '',//病情
        }
    };

    //组件渲染完毕时调用此方法
    componentDidMount() {
        if(Constant.user.role==="doctor"){
            this.fetchDoctor((data)=>{
                if(data){
                    this.setState({
                        userName:data.user.userName,
                        hospital: data.hospital,
                        offices: data.offices,
                        certificateNo: data.certificateNo,
                    });
                }
            });
        }else{
            this.setState({
                userName:Constant.user.userName,
                medicalHistory: '',//病情
            });
        }
    };

    fetchDoctor = (callback) => {
        let url=Config.DOCTOR_DETAil+"?token=lhy&userId="+Constant.user.id;
        let params={}
        FetchUtil.httpGet(url,params,callback);
    };

//推出登陆，直接退出，不用调请求
    _logout = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'}),
            ]
        }))
    };
    render(){
        const {showAlert, tipMsg} = this.state;
        return (
            <View style={styles.container}>
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
                    centerComponent={{text: '个人中心', style: {color: '#fff', fontSize: 18}}}
                />
                <View style={{
                    position: 'relative',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../images/default_poster.jpg')}
                        style={{
                            width: width,
                            height: width * 233 / 720,
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}>
                      <Image
                                source={
                                    require('../images/default_poster.jpg')
                                }
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderRadius: Platform.OS == 'ios' ? 30 : 50,
                                    borderColor: '#fff'
                                }}/>
                        <View style={{marginLeft: 15}}>
                            <Text style={{color: '#FFFFFF', marginBottom: 5}}>{Constant.user.userCode}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{backgroundColor: '#fff', paddingLeft: 8}}>
                        <View style={styles.menuList}>
                            <View style={styles.icons}>
                                <Icons name={'ios-person'} size={22} color={'#8d8d8d'}/>
                            </View>
                            <View style={[styles.menuListText, {borderTopColor: 'transparent'}]}>
                                <Text style={styles.settingText}>{this.state.userName}</Text>
                            </View>
                        </View>
                        {
                            Constant.user.role=="doctor" ?
                                     <View>
                                        <View style={styles.menuList}>
                                            <View style={styles.icons}>
                                                <Icons name={'ios-git-network'} size={22} color={'#eccc68'}/>
                                            </View>
                                            <View style={[styles.menuListText]}>
                                                <Text style={styles.settingText}>{this.state.hospital}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.menuList}>
                                            <View style={styles.icons}>
                                                <Icons name={'ios-git-network'} size={22} color={'#eccc68'}/>
                                            </View>
                                            <View style={[styles.menuListText]}>
                                                <Text style={styles.settingText}>{this.state.offices}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.menuList}>
                                                <View style={styles.icons}>
                                                    <Icons name={'ios-git-network'} size={22} color={'#eccc68'}/>
                                                </View>
                                                <View style={[styles.menuListText]}>
                                                    <Text style={styles.settingText}>{this.state.certificateNo}</Text>
                                                </View>
                                            </View>

                                     </View>
                             :      <View style={{backgroundColor: '#fff', marginTop: 10}}>
                                        <TouchableOpacity
                                        style={[styles.menuList, styles.menuTouch, {borderTopColor: 'transparent'}]}
                                        onPress={() => {
                                            this.props.navigation.navigate('CheckPassword');
                                        }
                                        }>
                                        <Text style={[styles.settingText, {flex: 1}]}>健康信息</Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Icons name={'ios-arrow-forward'} size={25} color={'#CCCCCC'}/>
                                        </View>
                                    </TouchableOpacity>
                                     </View>
                        }
                    </View>

                    <View style={{flex:1,backgroundColor: '#fff', marginTop: 10, height: 48, marginBottom: 10}}>
                        <TouchableOpacity
                            style={[styles.menuList, styles.menuTouch, {borderTopColor: 'transparent'}]}
                            onPress={() => {
                                this._logout()
                            }}>
                            <Text style={[styles.settingText, {flex: 1, textAlign: 'center'}]}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        // paddingBottom: 20
    },
    menuList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 48,
    },
    icons: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'tomato'
        // marginLeft: 12,
        // marginRight: 10,
    },
    menuListText: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#cecece',
    },
    iconRight: {
        width: 10,
        textAlign: 'right',
        marginRight: 12,
    },
    btn: {
        height: 43,
        borderRadius: 4,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        marginLeft: 12,
        marginRight: 12
    },
    settingText: {
        lineHeight: 48,
        color: '#333',
        fontSize: 14,
    },
    menuTouch: {
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: '#cecece',
        borderTopWidth: 1,
    },
});
