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
class TopicPublish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            essayBody: {
                title: '',
                context: '',
                essayType: ''
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
            essayBody: body
        }, () => {
            console.log(this.state.essayBody)
        });
    };

    //提交文章
    submitEssay = (callback) => {
        let body = this.state.essayBody;
        if (body.title == '') {
            Alert.alert('文章标题不得为空');
        } else if (body.title.length > 32) {
            Alert.alert('标题长度不得超过32位');
        } else if (body.context == '') {
            Alert.alert('内容不得为空');
        } else if (body.context.length > 60000) {
            Alert.alert('内容长度不得超过6万位');
        } else {
            let url =Config.ESSAY_SAVE+"?token=ly&userId="+Constant.user.id;
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
                    centerComponent={{text: '文章发表', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>文章标题</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.essayBody.title}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入文章标题'
                                   onChangeText={(text) => this._inputInvite(text, 'title')}/>
                    </View>

                    <View style={[styles.voteGroup, {flexDirection: 'column', marginBottom: 10}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>类型</Text>
                        <TextInput ref={'voteTitle'}
                                   onLayout={this._inputOnLayout.bind(this)}
                                   style={styles.voteInput}
                                   value={this.state.essayBody.essayType}
                                   underlineColorAndroid={'transparent'}
                                   maxLength={32}
                                   placeholder='请输入类型'
                                   onChangeText={(text) => this._inputInvite(text, 'essayType')}/>
                    </View>
                    <View style={[styles.voteGroup, {flexDirection: 'column', marginBottom: 10}]}
                          onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
                        <Text style={styles.voteTitle}>文章内容</Text>
                        <View style={{flex: 1, borderWidth: 1, borderColor: '#f0f0f0'}}
                              onStartShouldSetResponder={() => this.refs.textArea.focus()}>
                            <TextInput ref="textArea"
                                       style={{fontSize: 16, padding: 2, height: 100, textAlignVertical: 'top'}}
                                       onLayout={this._inputOnLayout.bind(this)}
                                       multiline={true}
                                       numberOfLines={10}
                                       maxLength={60000}
                                       placeholder='请输入文章内容'
                                       underlineColorAndroid={'transparent'}
                                       onChangeText={(text) => this._inputInvite(text, 'context')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.submitEssay((data)=>{
                            if(data){
                                DeviceEventEmitter.emit('topicAddPage');
                                this.props.navigation.goBack();
                            }

                        });
                    }}>
                        <Text style={{fontSize: 15, color: '#fff'}}>发表</Text>
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
