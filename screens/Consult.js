import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Modal,
    Platform, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, TextInput,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard, DeviceEventEmitter, Alert, Linking
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

const {width} = Dimensions.get('window');
const SCREEN = width < 600 ? 6 : 10;
const MARGIN = (SCREEN - 2) * 20;
const headSize = (width - MARGIN) / SCREEN;
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
const  pageSize=10;
export default class Consult extends Component {
	constructor(props) {
		super(props);
		this.state = {
            commentList:[] ,
            talkerId: Constant.user.id,//说话者
            talkerName: Constant.user.userName,//说话者
            context: "",//说话内容
            hearerId:props.navigation.state.params.userId,//被说话者（听话者）
            hearerName:props.navigation.state.params.userName,//被说话者（听话者）
            pageStart:0,//开始条数
            pageEnd:0,//每页结束第几条
            count:0,//
            commentPid: Constant.user.id,
            inviteContent:""
		};
	}

	componentDidMount() {
		this._getChatHistory();//查询历史记录
    }
_getCount(callback){
    let url=Config.CHAT_COUNT+"?token=lhy&userId="+Constant.user.id;
    let params={
        talkerId: Constant.user.id,//说话者
		role:Constant.user.role,
        hearerId:this.state.hearerId,//被说话者（听话者）
    }
    FetchUtil.httpGet(url,params,callback);
}
	_getChatHistory(){
        this._getCount((data)=>{
            if(data<=0){
                this.setState({pageStart:0})
                this.setState({count:data,pageEnd:0})
            }
            else{
                if(data<=pageSize){
                    this.setState({pageStart:0})
                }else{
                    this.setState({pageStart:(data-pageSize)})
                }
                this.setState({count:data,pageEnd:data})
            }
            if(this.state.count>0){
                let url=Config.CHAT_HISTORY+"?token=lhy&userId="+Constant.user.id;
                let params={
                    talkerId: Constant.user.id,//说话者
                    role:Constant.user.role,
                    hearerId:this.state.hearerId,//被说话者（听话者）
                    pageStart:this.state.pageStart,//开始条数
                    pageEnd:this.state.pageEnd,//每页结束第几条 pageStart:this.state.pageStart,//开始条数
                }
                FetchUtil.httpGet(url,params,(data)=>{
                    this.setState({commentList:data})
                });
            }
        });//获取总条数 已经开始和结束的角码值
	}

//render处理 end
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
                    centerComponent={{text: '咨询', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this._scrollInviteDetails}
                    keyboardDismissMode={'on-drag'}>
                    <View style={[styles.inviteBox, {
                        backgroundColor: '#f0f0f0',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }]}>
                        <Text style={[styles.inviteTitle, {flex: 1}]}>{this.state.hearerName+" 医生"}</Text>
                    </View>
                    <View style={[styles.inviteBox, {flex: 1}]}>
                        {
                            this.state.commentList.map((item, index) => {
                                return <View key={index}
                                             style={[styles.inviteGroup, index == 0 ? {borderTopColor: 'transparent'} : null]}>
                                    <Image
                                        source={require('../images/head.jpg')}
                                        style={styles.inviteHeadImg}/>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <View style={{flexDirection: 'row', paddingLeft: 6}}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: '#333',
                                                flex: 1
                                            }}>{`${item.talkerName}  说`}</Text>
                                        </View>
                                        <Text style={{
                                            fontSize: 13,
                                            paddingLeft: 6
                                        }}>{item.context}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text
                                                style={styles.commitTime}>{item.createTime}</Text>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                        {this._commentFooter()}
                    </View>
                </ScrollView>
                <View style={styles.inviteComment}>
                    <TextInput
                        ref={'commentInput'}
                        style={styles.inviteCommentInput}
                        multiline={true}
                        value={this.state.inviteContent}
                        onChangeText={(text) => this.setState({
                            inviteContent: text,
                        })}
                        onBlur={() => {
                            this.setState({
                                inviteContent: ''//咨询内容清空
                            })
                        }}
                        placeholder={'请输入咨询内容'}
                        underlineColorAndroid={'transparent'}/>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._inviteComment();
                    }}>
                        <Text style={{fontSize: 14, color: '#fff'}}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>
		)
	};
    //提交评论或回复
    _inviteComment = () => {//提交评论 有pid是回复
        this.refs.commentInput.blur();
        let body = {
            context: this.state.inviteContent,
            talkerId: this.state.talkerId,//说话者
            talkerName:this.state.talkerName,//说话者
            hearerId:this.state.hearerId,//被说话者（听话者）
            hearerName:this.state.hearerName,//被说话者（听话者）

        };
        if (this.state.inviteContent == '' ||this.state.inviteContent == null) {
            Alert.alert('咨询内容不能为空');
        }else {
                let url=Config.CHATE_SAVE+"?token=lhy&userId="+Constant.user.id
                FetchUtil.httpGet(url,body,(data)=>{
                    if(data){
                        this.setState({
                            inviteContent: ''
                        }, () => {
                            this._getChatHistory();//查询历史记录
                        });
                    }
                });
        }
    };
	//
_commentFooter() {
    let foot;
    if (this.state.commentShowFoot == 0) {
        foot = <TouchableOpacity style={styles.footer} onPress={() => {
        }}>
            <Text style={styles.footerText}>还没有咨询</Text>
        </TouchableOpacity>
    } else if (this.state.commentShowFoot == 1) {
        foot = <View style={styles.footer}>
            <Text style={styles.footerText}>没有更多咨询了</Text>
        </View>
    } else if (this.state.commentShowFoot == 2) {
        foot = <View style={styles.footer}>
            <Text style={styles.footerText}>上拉加载更多</Text>
        </View>
    } else if (this.state.commentShowFoot == 3) {
        foot = <View style={styles.footer}>
            <ActivityIndicator/>
            <Text style={styles.footerText}>正在加载更多...</Text>
        </View>
    }
    return foot;
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative'
    },
    inviteBox: {
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    inviteInfor: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FFFFFF',
    },
    inforTitle: {
        fontSize: 16,
        color: '#333',
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    btn: {
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#3498db',
        borderRadius: 4,
        marginLeft: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 5,
        marginBottom: 5
    },
    inviteHeadImg: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 4
    },
    headMoreBtn: {
        width: headSize,
        height: headSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    inviteTitle: {
        color: '#333',
        fontSize: 16,
        borderLeftColor: '#ff9226',
        borderLeftWidth: 5,
        paddingLeft: 8
    },
    onlyTitle: {
        color: '#333',
        fontSize: 12
    },
    inviteComment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: '#d7d7d7',
        borderTopWidth: 1,
    },
    inviteCommentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        lineHeight: 24,
    },
    inviteGroup: {
        flexDirection: 'row',
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        paddingTop: 10,
    },
    inviteFileIcon: {
        width: 26,
        height: 26,
        marginRight: 5,
        marginLeft: 5
    },
    inviteFileInfor: {
        flex: 1,
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#999'
    },
    replyView: {
        flex: 1,
        paddingLeft: 6
    },
    commitTime: {flex: 1, marginRight: 10, textAlign: 'right', fontSize: 11, color: '#aaa'},
    replyBtn: {fontSize: 13, color: '#6173ff'},
});
