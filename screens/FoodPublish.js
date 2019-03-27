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
class FoodPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foodBody: {
                foodName: '',
                num: '',
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
        let body = this.state.essayBody;
        body[key] = text;
        this.setState({
            foodBody: body
        }, () => {
            console.log(this.state.foodBody)
        });
    };

    //提交饮食数据
    submitFood = (callback) => {
        let body = this.state.foodBody;
        if (body.foodName == '') {
            Alert.alert('名称不得为空');
        } else if (body.foodName.length > 32) {
            Alert.alert('名称长度不得超过32位');
        } else if (body.num == '') {
            Alert.alert('内容不得为空');
        }else {
            let url =Config.FOOD_SAVE+"?token=ly&userId="+Constant.user.id;
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
                        <Text style={styles.voteTitle}>名称</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.foodBody.foodName}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入名称'
                                   onChangeText={(text) => this._inputInvite(text, 'foodName')}/>
                    </View>

                    <View style={[styles.voteGroup, {flexDirection: 'column', marginBottom: 10}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>热烈</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.foodBody.num}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入类型'
                                   onChangeText={(text) => this._inputInvite(text, 'num')}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.submitFood((data)=>{
                            if(data){
                                DeviceEventEmitter.emit('foodAddPage');
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
export default TopicPublish;
