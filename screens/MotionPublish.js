/*
 * 文章发布
 * 页面元素 标题 内容 上传附件
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    DeviceEventEmitter,
    TouchableOpacity, Keyboard,
    ScrollView,
     Alert
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
const inputComponents = [], ACT_HEIGHT = 38;
export  default class MotionPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            motionBody: {
                motionName: '跑步',
                stepNum: '',
            },
        }
    };

    componentDidMount() {

    }

    //处理TextInput失焦聚焦问题 start
    _onStartShouldSetResponderCapture(event) {
        let target = event.nativeEvent.target;
        if (!inputComponents.includes(target)) {
            Keyboard.dismiss();
        }
        return false;
    };

    _inputOnLayout(event) {
        inputComponents.push(event.nativeEvent.target);
    };

    //处理TextInput失焦聚焦问题 end

    _inputInvite = (text, key) => {
        let body = this.state.motionBody;
        if(key=="stepNum"){
            let reg=/^[1-9]\d*$/;
            var pattern=new RegExp(reg);
            if(pattern.test(text)){
                body[key] = text;
                this.setState({
                    motionBody: body
                }, () => {
                });
            }else{
                Alert.alert("请输入正在数");
            }
        }else{
            body[key] = text;
            this.setState({
                motionBody: body
            }, () => {
                console.log(this.state.motionBody)
            });
        }

    };

    //提交饮食数据
    submitMotion = (callback) => {
        let body = this.state.motionBody;
        body['motionName']='跑步'
        if (body.setpNum == '') {
            Alert.alert('步数不得为空');
        }else {
            let url =Config.MOTION_SAVE+"?token=ly&userId="+Constant.user.id;
            FetchUtil.httpGet(url,body,callback);
        }
    };

    render() {
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
                    centerComponent={{text: '添加步数', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={[styles.voteGroup, {flexDirection: 'column', marginBottom: 10}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>步数</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.motionBody.stepNum}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入步数'
                                   onChangeText={(text) => this._inputInvite(text, 'stepNum')}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.submitMotion((data)=>{
                            if(data){
                                DeviceEventEmitter.emit('motionAddPage');
                                this.props.navigation.goBack();
                            }

                        });
                    }}>
                        <Text style={{fontSize: 15, color: '#fff'}}>添加</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#979394'}]} onPress={() => {
                            this.props.navigation.goBack();
                    }}>
                        <Text style={{fontSize: 15, color: '#fff'}}>取消</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF'},
    voteGroup: {
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    voteTitle: {
        fontSize: 16,
        color: '#333',
        height: ACT_HEIGHT,
        lineHeight: ACT_HEIGHT,
    },
    voteInput: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
        padding: 0,
    },
    btn: {
        height: 43,
        borderRadius: 4,
        backgroundColor: '#4e71ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    }
});