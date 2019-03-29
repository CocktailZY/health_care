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
    Alert,
    DatePickerAndroid,
    TimePickerAndroid
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
import RNAlarm from "react-native-alarm";
const inputComponents = [], ACT_HEIGHT = 38;
export  default  class DrugsPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: 0,
            minute: 0,
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
        // console.log(11111111111111111111111111111111111111111111);
        // console.log(text);
        let body = this.state.drugsBody;
        if(key=="drugsNum"){
            let reg=/^[1-9]\d*$/;
            var pattern=new RegExp(reg);
            if(pattern.test(text)){
                body[key] = text;
                this.setState({
                    drugsBody: body
                });
            }else{
                Alert.alert("请输入正整数");
            }
        }else{
            body[key] = text;
            this.setState({
                drugsBody: body
            });
        }

    };

    //提交饮食数据
    submitFood = () => {
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
            FetchUtil.httpGet(url,body,(data)=>{
                if(data){
                    DeviceEventEmitter.emit('drugsAddPage');
                    this.props.navigation.goBack();
                }

            });
        }
    };
    /**
     *时间字符串时间戳字符串
     */
    strToStemp(time){
        time = time.replace(/-/g,':').replace(' ',':');
        time = time.split(':');
        return new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]?time[5]:"00").getTime();
    }
    //设置闹钟
    _serAlarm = () => {
        let time = this.state.drugsBody.startTime+" "+this.state.drugsBody.drugsTime+":00";//Date.parse('Mon March 27 2019 22:47:00 GMT+0800 (GMT)').toString();
        let t=this.strToStemp(time);
        if(t>new Date().getTime()){
            RNAlarm.setAlarm(t+'',
                this.state.drugsBody.drugsName+':'+this.state.drugsBody.drugsNum,
                '5',
                '',
                () => {
                    console.log("闹钟设置成功");
                    this.submitFood();
                },
                () => {
                    console.log("闹钟设置失败");
                    // Fail callback function
                    Alert.alert('请确保选择的开始时间大于当前时间');
                });
        }else{
            Alert.alert('请重新选择时间和开始日期');
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
                        <TouchableOpacity style={{flex: 1}} onPress={()=>{
                           try {
                             TimePickerAndroid.open({
                              hour: new Date().getHours(),
                              minute: new Date().getMinutes(),
                              is24Hour: true, // Will display '2 PM'
                            }).then(({action, hour, minute})=>{
                                 if (action !== TimePickerAndroid.dismissedAction) {
                                     this.setState({hour:hour,minute:minute});
                                     let tempBody = {...this.state.drugsBody};
                                     tempBody.drugsTime = (hour < 10 ? ('0'+hour) : hour)+':'+(minute < 10 ? ('0'+minute) : minute);
                                     this.setState({
                                         drugsBody: tempBody
                                     })
                                 }
                             })
                              } catch ({code, message}) {
                                console.warn('Cannot open time  picker', message);
                              }
                        }}>
                            <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.drugsBody.drugsTime}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   editable={false}
                                   placeholder='请输入用药时间'
                                   onChangeText={(text) => this._inputInvite(text, 'drugsTime')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>开始日期</Text>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>{
                            try {
                                DatePickerAndroid.open({
                                  // 要设置默认值为今天的话，使用`new Date()`即可。
                                  // 下面显示的会是2020年5月25日。月份是从0开始算的。
                                    // date: new Date(2020, 4, 25)
                                    date:new Date()
                                }).then(({action, year, month, day})=>{
                                    if (action !== DatePickerAndroid.dismissedAction) {
                                        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                                        let tempBody = {...this.state.drugsBody};
                                        let m = month+1;
                                        tempBody.startTime = year+'-'+(m < 10 ? ('0'+m) : m)+'-'+(day < 10 ? ('0'+day) : day);
                                        this.setState({
                                            drugsBody: tempBody
                                        })
                                    }
                                });
                              } catch ({code, message}) {
                                console.warn('Cannot open date picker', message);
                              }
                        }}>
                            <TextInput ref={'voteTitle'}
                                    onLayout={this._inputOnLayout.bind(this)}
                                    style={styles.voteInput}
                                    value={this.state.drugsBody.startTime}
                                    underlineColorAndroid={'transparent'}
                                    maxLength={32}
                                    placeholder='请输入开始日期'
                                    editable={false}
                                    onChangeText={(text) => this._inputInvite(text, 'startTime')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>结束日期</Text>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>{
                            try {
                                DatePickerAndroid.open({
                                  // 要设置默认值为今天的话，使用`new Date()`即可。
                                  // 下面显示的会是2020年5月25日。月份是从0开始算的。
                                //   date: new Date(2020, 4, 25)
                                    date:new Date()
                                }).then(({action, year, month, day})=>{
                                    if (action !== DatePickerAndroid.dismissedAction) {
                                        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                                        let tempBody = {...this.state.drugsBody};
                                        let m = month+1;
                                        tempBody.endTime = year+'-'+(m < 10 ? ('0'+m) : m)+'-'+(day < 10 ? ('0'+day) : day);
                                        this.setState({
                                            drugsBody: tempBody
                                        })
                                    }
                                });

                              } catch ({code, message}) {
                                console.warn('Cannot open date picker', message);
                              }
                        }}>
                            <TextInput ref={'voteTitle'}
                                    onLayout={this._inputOnLayout.bind(this)}
                                    style={styles.voteInput}
                                    value={this.state.drugsBody.endTime}
                                    underlineColorAndroid={'transparent'}
                                    maxLength={32}
                                    editable={false}
                                    placeholder='请输入结束日期'
                                    onChangeText={(text) => this._inputInvite(text, 'endTime')}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._serAlarm();
                        // this.submitFood();
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
