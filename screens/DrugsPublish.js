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
export  default  class DrugsPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drugsBody: {
                drugsName: '',
                drugsNum: '',
                drugsTime: '',
                startTime: '',
                endTime: '',
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
        let body = this.state.drugsBody;
        if(key=="drugsNum"){
            let reg=/^[1-9]\d*$/;
            var pattern=new RegExp(reg);
            if(pattern.test(text)){
                body[key] = text;
                this.setState({
                    drugsBody: body
                }, () => {
                    console.log(this.state.drugsBody)
                });
            }else{
                Alert.alert("请输入正在数");
            }
        }else{
            body[key] = text;
            this.setState({
                drugsBody: body
            }, () => {
                console.log(this.state.drugsBody)
            });
        }

    };

    //提交饮食数据
    submitFood = (callback) => {
        let body = this.state.drugsBody;
        if (body.drugsName == '') {
            Alert.alert('药物名称不得为空');
        } else if (body.drugsName.length > 32) {
            Alert.alert('药物名称长度不得超过32位');
        } else if (body.drugsNum == '') {
            Alert.alert('每次喝药量不得为空');
        }
        else if (body.drugsTime == '') {
            Alert.alert('每次喝药时间不得为空');
        }
        else if (body.startTime == '') {
            Alert.alert('每次喝药开始日期不得为空');
        }
        else if (body.endTime == '') {
            Alert.alert('每次喝药结束日期不得为空');
        }else {
            let url =Config.DRUGS_SAVE+"?token=ly&userId="+Constant.user.id;
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
                    centerComponent={{text: '添加饮食', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>药物名称</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.drugsName}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入药物名称'
                                   onChangeText={(text) => this._inputInvite(text, 'drugsName')}/>
                    </View>

                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>药品用量</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.drugsNum}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入用量'
                                   onChangeText={(text) => this._inputInvite(text, 'drugsNum')}/>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>用药时间</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.drugsTime}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入用药时间'
                                   onChangeText={(text) => this._inputInvite(text, 'drugsTime')}/>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>开始日期</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.startTime}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入开始日期'
                                   onChangeText={(text) => this._inputInvite(text, 'startTime')}/>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>结束日期</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.endTime}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入结束日期'
                                   onChangeText={(text) => this._inputInvite(text, 'endTime')}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.submitFood((data)=>{
                            if(data){
                                DeviceEventEmitter.emit('drugsAddPage');
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