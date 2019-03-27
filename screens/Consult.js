import Header from '../../component/common/Header';
import CustomTextInput from '../../component/common/TextInput';
import CustomBtn from '../../component/common/CommitBtn';
import BottomMenu from '../../component/common/BottomMenu';
import Icons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BottomPanel from './BottomPanel';
import FormatDate from '../../util/FormatDate';
import DeviceInfo from 'react-native-device-info';
import Path from '../../config/UrlConfig';
import FetchUtil from '../../util/FetchUtil';
import ToolUtil from '../../util/ToolUtil';
import GroupDetail from "../group/GroupDetail";
import AtMember from './AtMember';
import TranspondMember from './TranspondMember';
/import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableHighlight,
    DeviceEventEmitter,
    TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
const {height, width} = Dimensions.get('window');
let nowPageFlag = 0;//标记当前页
export default class Consult extends Component {
	constructor(props) {
		super(props);
		this.state = {
            talkerId: "",//说话者
            context: "",//说话内容
            hearerId:"",//被说话者（听话者）
            pageStart:"",//开始条数
            pageEnd:"",//每页结束第几条
            count:""//总条数
		};
	}

	componentDidMount() {
	};

	componentWillUnmount() {
	}


//render处理 end
	render() {
		const {showAlert, tipMsg} = this.state;
		tempTime = 0;
		return (
			<View style={styles.container}>
				<AwesomeAlert
					show={showAlert}
					alertContainerStyle={{zIndex: 999999}}
					showProgress={false}
					title="提示"
					message={tipMsg}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showCancelButton={false}
					showConfirmButton={true}
					// cancelText="No, cancel"
					confirmText="确定"
					confirmButtonColor="#278EEE"
					onCancelPressed={() => {
						this.hideAlert();
					}}
					onConfirmPressed={() => {
						this.hideAlert();
					}}
				/>
				<Toast ref="toast" opacity={0.6} fadeOutDuration={1500}/>
				<Modal
					visible={this.state.imgModalVisible}//
					//显示是的动画默认none
					//从下面向上滑动slide
					//慢慢显示fade
					animationType={'none'}
					//是否透明默认是不透明 false
					transparent={true}
					//关闭时调用
					onRequestClose={() => {
						this.setState({imgModalVisible: false, animatingOther: false})
					}}
				>
					<View style={{flex: 1}}>
						<ImageViewer
							style={{width: width, height: height}}
							imageUrls={this.state.msgImgList} // 照片路径this.state.msgImgList
							enableImageZoom={true} // 是否开启手势缩放
							index={this.state.chooseImgId} // 初始显示第几张this.state.msgImgList.length
							flipThreshold={10}
							maxOverflow={0}
							onClick={() => { // 图片单击事件
								this.setState({imgModalVisible: false, animatingOther: false})
							}}
							enablePreload={true}//开启预加载
							loadingRender={() => <View
								style={{width: width, height: height, justifyContent: 'center', alignItems: 'center'}}>
								<Image source={require('../../images/loading.png')}/>
							</View>}
							onLongPress={null}
							backgroundColor={'#000'}
						/>
					</View>
				</Modal>
				<Modal
					visible={this.state.pdfModalVisible}//
					//显示是的动画默认none
					//从下面向上滑动slide
					//慢慢显示fade
					animationType={'none'}
					//是否透明默认是不透明 false
					transparent={true}
					//关闭时调用
					onRequestClose={() => {
						this.setState({pdfModalVisible: false})
					}}
				>
					<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
						{Platform.OS == 'android' ? <Pdf
							source={this.state.source}
							onLoadComplete={(numberOfPages, filePath) => {
								this.setState({
									pdfInsideModalVisible: false
								})
							}}
							onPageChanged={(page, numberOfPages) => {
							}}
							onError={(error) => {
								this.setState({pdfInsideModalVisible: false, showAlert: true, tipMsg: '文件预览失败'});
							}}
							enablePaging={false}
							onPageSingleTap={() => {
								this.setState({pdfModalVisible: false})
							}}
							activityIndicator={() => {
								return null;
							}}
							style={{flex: 1}}/> : null}

					</View>
				</Modal>
				<Modal
					visible={this.state.pdfInsideModalVisible}//
					//显示是的动画默认none
					//从下面向上滑动slide
					//慢慢显示fade
					animationType={'none'}
					//是否透明默认是不透明 false
					transparent={true}
					//关闭时调用
					onRequestClose={() => {
						// this.setState({pdfModalVisible: false})
					}}
				>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<ActivityIndicator
							animating={this.state.animating}
							size="large"
							color='rgba(76,122,238,1)'
						/>
					</View>
				</Modal>
				<BottomMenu
					ref={'bottomMenu'}
					isShow={this.state.chooseShowModalVisible}
					menuTitle={'请选择打开方式'}
					firstMenuFunc={
						() => {
							HandlerOnceTap(this._useLocalOpenFile(this.state.viewFile))
						}}
					firstTitle={'应用内部打开'}
					secondMenuFunc={
						() => {
							HandlerOnceTap(this._useOtherOpenFile(this.state.viewFile))
						}}
					secondTitle={'第三方应用打开'}
					downloadFunc={() => {
						this._downloadFile(this.state.viewFile)
					}}
				/>
				<Header
					ref={'chatHeader'}
					headLeftFlag={true}
					onPressBackBtn={() => {
						this.props.navigation.goBack();
					}}
					backTitle={'返回'}
					headRightFlag={true}
					rightItemImage={require('../../images/icon_pathMenu_more_normal.png')}
					onPressRightBtn={() => {
						HandlerOnceTap(this.moreDetail)
					}}
					title={this.state.backPage == 'Group' ? this.state.room.roomName : this.state.friendDetail.trueName}
					number={this.state.backPage == 'Group' ? (this.state.memberNumber > 99 ? '99+' : this.state.memberNumber) : null}
				/>
				<FlatList
					style={{backgroundColor: '#F9F9F9'}}
					ref={(flatList) => {
						this._scrollView = flatList;
					}}
					keyExtractor={(item, index) => String(index)}
					data={this.state.data}
					renderItem={this._renderItemsforScrollView}
					ListHeaderComponent={() => {
						if ((this.state.nowPageNum == this.state.totalPage) && this.state.data.length > 0) {
							return (<View style={styles.footer}>
								<Text style={styles.footerText}>
									{'没有更多了'}
								</Text>
							</View>)
						} else {
							return null;
						}
					}}
					ItemSeparatorComponent={() => <View style={styles.separator}></View>}
					automaticallyAdjustContentInsets={true}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							enabled={this.state.refreshFlag}
							onRefresh={() => {
								this._onRefresh()
							}}
							colors={['#278EEE']}
							progressBackgroundColor="#ffffff"
						/>
					}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(contentWidth, contentHeight) => {
						if (this.state.isNewMsg || this.state.nowPageNum == 1) {
							this._scrollView.scrollToEnd({animated: true})
						}
						// else {
						// 	let size = this.state.backPage == 'Message' ? Path.pageSize : Path.pageSizeNew;
						// 	this._scrollView.scrollToOffset({animated: true, offset: 0});//contentHeight - scrollViewHeight - (height / size)
						// }
						// scrollViewHeight = contentHeight;
					}}
					onScrollBeginDrag={() => {
						this.popObj()
					}}
				/>
				{
					this.state.isAudioBoxShow ? <View style={styles.audioStartBox}>
						<Image
							source={require('../../images/icon_voices1.png')}
							style={styles.audioStartImg}
						/>
						<ImageBackground source={require('../../images/icon_voices2.png')} style={{flex: 1, height: 120}}>
							<Animated.View style={{backgroundColor: '#747d8c', height: this.state.voiceHeight}}></Animated.View>
						</ImageBackground>
					</View> : null
				}
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'flex-end',
					paddingTop: 10,
					marginBottom: this.state.panelMark ? 0 : (Platform.OS == 'ios' && DeviceInfo.getModel() == 'iPhone X' ? 34 : 0),
					minHeight: 50,
					maxHeight: 120,
					backgroundColor: '#F3F3F3',
					paddingLeft: 8,
					paddingRight: 8,
					paddingBottom: 10
				}}>
					<View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
						{this.state.room != '' && this.state.room.mute == '1' ? (
							<Image source={require('../../images/icon_voice_dis.png')}
										 style={{width: 30, height: 30}}/>
						) : (
							<TouchableOpacity onPress={() => {
								this.setState({
									panelMark: false,
									emojiMark: false
								}, () => {
									if (this.state.msgType == 'text') {
										this.textInputBox.onBlurText();
										this.setState({msgType: 'sound'});
									} else {
										this.setState({msgType: 'text'}, () => {
											this.textInputBox.onFocusText();
										});
									}
								})
							}}>
								{
									this.state.msgType == 'text' ? (
										<Image source={require('../../images/icon_voice.png')}
													 style={{width: 30, height: 30}}/>) : (
										<Image source={require('../../images/icon_key.png')}
													 style={{width: 30, height: 30}}/>)
								}
							</TouchableOpacity>
						)}
					</View>
					{
						this.state.msgType == 'text' ?
							(
								<View style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
									{this.state.room != '' && this.state.room.mute == '1' ? (
										<View style={{
											backgroundColor: '#fff',
											flex: 1,
											height: 30,
											marginLeft: 8,
											justifyContent: 'center',
											alignItems: 'center'
										}}>
											<Text style={{color: 'rgba(0,0,0,0.4)'}}>{'禁言中，请联系管理员'}</Text>
										</View>
									) : (
										<CustomTextInput
											textInputStyle={{
												flex: 1,
												marginLeft: 8,
												paddingTop: Platform.OS == 'ios' ? 6 : 0,
												paddingBottom: Platform.OS == 'ios' ? 6 : 0,
												minHeight: 30,
												backgroundColor: '#fff',
											}}
											ref={(textInputBox) => {
												this.textInputBox = textInputBox;
											}}
											multilineFlag={true}
											editable={true}
											placeholder={''}
											secure={false}
											underlineColor={'transparent'}
											onChangeCallBack={(text) => this._setText(text)}
											value={this.state.text}
											//onKeyPress={(event) => this._setText(event.nativeEvent.key)}
											onSelectionChangeCallBack={(event) => this._getSelection(event)}
											/*returnType={'send'}
											returnLabel={'发送'}
											submitText={this._sendText}*/
										/>
									)}
								</View>
							) :
							(<CustomBtn
									//onBtnPressCallback={this._sendSound}
									// onPressOut={this.state.canAudio ? this._sendSound : null}
									onPressOut={this._sendSound}
									onLongPress={this.recardVoiceMessage}
									btnText={'按住说话'}
									btnStyle={{
										flex: 1,
										borderRadius: 4,
										backgroundColor: 'rgba(76,122,238,1)',
										height: 30,
										justifyContent: 'center',
										alignItems: 'center',
										marginRight: 8,
										marginLeft: 8,
									}}
								/>
							)
					}
					<View style={{width: 45, justifyContent: 'center', alignItems: 'center'}}>
						{this.state.room != '' && this.state.room.mute == '1' ? (
							<Image source={require('../../images/icon_face.png')} style={{width: 30, height: 30}}/>
						) : (
							<TouchableOpacity onPress={() => {
								this.setState({
									emojiMark: !this.state.emojiMark,
									panelMark: false,
									msgType: 'text'
								}, () => {
									if (this.state.emojiMark) {
										Keyboard.dismiss();
									} else {
										this.textInputBox.onFocusText();
									}
								});
							}}>
								{
									this.state.emojiMark ?
										(<Image source={require('../../images/icon_key.png')}
														style={{width: 30, height: 30}}/>)
										: (<Image source={require('../../images/icon_face.png')}
															style={{width: 30, height: 30}}/>)
								}
							</TouchableOpacity>
						)}
					</View>
					<View style={{width: 45, justifyContent: 'center', alignItems: 'center'}}>
						{this.state.room != '' && this.state.room.mute == '1' ? (
							<Image source={require('../../images/icon_add.png')}
										 style={{width: 30, height: 30}}/>
						) : (
							this.state.text == '' || this.state.msgType != 'text' ? (
								<TouchableOpacity onPress={() => {
									this.setState({panelMark: !this.state.panelMark, emojiMark: false, msgType: 'text'}, () => {
									});
								}}>
									{
										this.state.panelMark ?
											(<Image source={require('../../images/icon_down.png')}
															style={{width: 30, height: 30}}/>)
											: (<Image source={require('../../images/icon_add.png')}
																style={{width: 30, height: 30}}/>)
									}
								</TouchableOpacity>
							) : (
								<CustomBtn
									onBtnPressCallback={this._sendText}
									btnText={'发送'}
									btnStyle={{
										width: 45,
										borderRadius: 4,
										backgroundColor: 'rgba(76,122,238,1)',
										height: 30,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								/>
							)
						)}
					</View>
				</View>
				<this.renderOptionPanel/>
				<this.renderEmojiPanel/>
				{
					this.state.AtMemberType && this.state.backPage == 'Group' ? <AtMember
						cencalAtMember={() => {
							this.setState({
								AtMemberType: false
							});
						}}
						stateText={(txt, jidArr) => this.stateText(txt, jidArr)}
						uuid={uuid}
						ticket={this.state.ticket}
						basic={this.state.basic}
						room={this.state.room}
					/> : null
				}
				{
					this.state.TranspondMemberType ? <TranspondMember
						cencalTranspondMember={() => {
							this.setState({
								TranspondMemberType: false
							});
						}}
						getFriendNowID={(info, item) => this.getFriendNowID(info, item)}
						uuid={uuid}
						ticket={this.state.ticket}
						friendDetail={this.state.friendDetail}
						basic={this.state.basic}
						TranspondMemberItem={this.state.TranspondMemberItem}
						msgType={this.state.tempMsgType}
					/> : null
				}
			</View>
		)
	};

	renderOptionPanel = () => {
		if (this.state.panelMark) {
			// this._scrollView.scrollToIndex({animated:true,index:this.state.data.length-1,viewPosition: 0});
			return (
				<View
					style={{marginBottom: Platform.OS == 'ios' ? (DeviceInfo.getModel() == 'iPhone X' ? 34 : 0) : 0}}><BottomPanel
					style={{height: 300}} imageDidClick={this.uploadImages}
					cameraDidClick={() => {
						if (Platform.OS == 'android') {
							this.cameraUploadImage();
						} else {
							this.cameraUploadImage();
						}
					}}
					fileDidClick={this.uploadFiles}/></View>
			)
		} else {
			return null;
		}
	}
	renderEmojiPanel = () => {
		if (this.state.emojiMark) {
			// this._scrollView.scrollToIndex({animated:true,index:this.state.data.length-1,viewPosition: 0});
			return (
				<View style={{
					justifyContent: 'center',
					alignItems: 'center',
					height: 200,
					marginBottom: Platform.OS == 'ios' ? (DeviceInfo.getModel() == 'iPhone X' ? 34 : 0) : 0
				}}>
					<GridView
						itemDimension={width / 11}
						spacing={11}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						items={[
							'grin', 'joy', 'smiley', 'smile', 'sweat_smile', 'laughing', 'innocent', 'smiling_imp',
							'wink', 'grinning', 'blush', 'yum', 'relieved', 'heart_eyes', 'sunglasses', 'smirk',
							'neutral_face', 'expressionless', 'unamused', 'sweat', 'pensive', 'confused', 'confounded', 'sleeping',
							'kissing_heart', 'kissing_smiling_eyes', 'stuck_out_tongue', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'disappointed', 'worried', 'angry',
							'rage', 'cry', 'triumph', 'disappointed_relieved', 'grimacing', 'sob', 'scream', 'astonished',
							'flushed', 'mask', 'slightly_smiling_face', 'slightly_frowning_face', 'face_with_rolling_eyes', 'relaxed', 'fist', 'v',
							'ok_hand', '+1', '-1', 'clap', 'sunny', 'cloud', 'chicken', 'beetle'
						]}
						style={{backgroundColor: '#FFFFFF', opacity: 1}}
						renderItem={(data, i) => {
							return (
								<TouchableWithoutFeedback onPress={() => {
									let tempMsg = JSON.parse(JSON.stringify(this.state.messageBody));
									tempMsg.id = UUIDUtil.getUUID();
									if (this.state.text != '') {
										let tempTextPre = this.state.text.substring(0, currentSelectPostion);
										let tempTextLas = this.state.text.substring(currentSelectPostion, this.state.text.length);
										tempMsg.content.text = tempTextPre + `[${EmojiUtil.getEmojiCN(data)}]` + tempTextLas;
										tempMsg.content.interceptText = tempTextPre + `[${EmojiUtil.getEmojiCN(data)}]` + tempTextLas;
										this._setText(tempTextPre + `[${EmojiUtil.getEmojiCN(data)}]` + tempTextLas);

										currentSelectPostion = currentSelectPostion + 4;//中文匹配必须是4个字符
									} else {
										tempMsg.content.text = `[${EmojiUtil.getEmojiCN(data)}]`;
										tempMsg.content.interceptText = `[${EmojiUtil.getEmojiCN(data)}]`;
										this._setText(`[${EmojiUtil.getEmojiCN(data)}]`);

										currentSelectPostion = currentSelectPostion + 4;//中文匹配必须是4个字符

									}
								}}>
									<View style={{justifyContent: 'center', alignItems: 'center', opacity: 1, height: 30}}>
										<ShowEmoji name={data} style={{fontSize: 22, color: 'yellow'}}/>
									</View>
								</TouchableWithoutFeedback>
							)
						}}
					/>
				</View>
			)
		} else {
			return null;
		}
	}

	stateText = (val, atItems) => {

		this.setState({
			atItems: atItems
		})

		let firstText = this.state.secText;
		let allText = this.state.text;
		let lastText = allText.substr(firstText.length);
		const value = `${firstText}${val}${lastText}`;

		this._setText(value);
		this.setState({
			AtMemberType: false,
		});
	}

	getFriendNowID = (info, item) => {

		this.setState({
			TranspondMemberType: false,
		});
		let tempitem = JSON.parse(JSON.stringify(item));
		let tempBody = typeof tempitem.body == 'string' ? JSON.parse(tempitem.body) : tempitem.body;
		let tempContent = typeof tempitem.body == 'string' ? JSON.parse(tempitem.body).content : tempitem.body.content;
		delete tempContent.sendTime;
		let reqBody = {
			stype: info.ttype == 1 ? 'sglc' : 'groupchat',//转发类型
			to: info.jid_node,//转发人jidNode
			jidNode: this.state.basic.jidNode//当前人jidNode
		};
		if (this.state.tempMsgType == 2) {
			reqBody['fileInfoId'] = tempContent.file[0].listFileInfo[0].id;//旧文件id
			FetchUtil.netUtil(Path.redirectMsg, reqBody, 'POST', this.props.navigation, {
				uuId: this.state.uuid,
				userId: this.state.basic.userId,
				ticket: this.state.ticket
			}, (res) => {
				if (res == 'tip') {
					this.refs.toast.show('网络错误，文件转发失败');
				} else if (res.code.toString() == '200' && res.status) {
					let newInfo = typeof res.data == 'string' ? JSON.parse(res.data).listFileInfo : res.data.listFileInfo;
					tempContent.file[0].listFileInfo = newInfo;//将复制后的文件对象赋值给messageBody

					if (info.ttype == 1) {
						tempContent.sendTime = FormatDate.formatTimeStmpToFullTimeForSave(new Date().getTime());
					}
					let newMsgId = UUIDUtil.getUUID().replace(/\-/g, '') + 'GroupMsg';
					let newMsgIdSingle = UUIDUtil.getUUID().replace(/\-/g, '');
					let tempMsgBody = {
						"id": info.ttype == 1 ? newMsgIdSingle : newMsgId,
						"type": this.state.tempMsgType,
						"basic": info.ttype == 1 ? {
							"toId": info.jid_node,
							"type": "privateChat",
							"fromId": this.state.basic.jidNode,
							"userId": this.state.basic.userId,
							"photoId": this.state.basic.photoId,
							"userName": this.state.basic.trueName
						} : {
							"userId": this.state.basic.jidNode,
							"userName": this.state.basic.trueName,
							"head": info.image_name,
							"sendTime": new Date().getTime(),
							"groupId": info.jid_node,
							"groupName": info.trueName,
							"type": 'groupChat'
						},
						"keyId": "privateSend00",
						"content": tempContent,
						"showTime": true,
						"occupant": {
							"state": '',
							"effect": '',
							"active": ''
						}
					}

					this.setState({
						// backPage: info.ttype == 1 ? 'Message' : 'Group',
						messageBody: JSON.parse(JSON.stringify(tempMsgBody)),
						isNotPC: true
					}, () => {
						if (Platform.OS == 'android') {
							if (info.ttype == 1) {
								//单聊
								// XMPP.message(JSON.stringify(tempMsgBody), info.jid_node + '@'+Path.xmppDomain);
								let sendSigleMsg = XmlUtil.sendGroup('chat', info.jid_node + '@' + Path.xmppDomain, JSON.stringify(tempMsgBody), newMsgIdSingle);
								XMPP.sendStanza(sendSigleMsg);

								this._saveToDB(info.ttype, info.jid_node, info.trueName, info.image_name, '', '', '', this.state.tempMsgType == 2 ? 'file' : 'text', '', newMsgIdSingle);
							} else {
								let sendGroupMsg = XmlUtil.sendGroup('groupchat', info.jid_node + Path.xmppGroupDomain, JSON.stringify(tempMsgBody), newMsgId);
								XMPP.sendStanza(sendGroupMsg);
							}
							this.refs.toast.show('转发成功', DURATION.LENGTH_SHORT);

						}
						else {
							if (info.ttype == 1) {
								//单聊
								XMPP.XMPPSendMessage({
									'message': tempMsgBody,
									'friendJid': info.jid_node + '@' + Path.xmppDomain,
									'messageId': newMsgIdSingle

								})
								this.refs.toast.show('转发成功', DURATION.LENGTH_SHORT);
								this._saveToDB(info.ttype, info.jid_node, info.trueName, info.image_name, '', '', '', this.state.tempMsgType == 2 ? 'file' : 'text', '', newMsgIdSingle);

							} else {
								//ios群聊转发
								XMPP.XMPPSendGroupMessage({
										'message': tempMsgBody,
										'jid': info.jid_node,
										'uuid': newMsgId
									},
									(error, event) => {
										if (error) {
											this.setState({showAlert: true, tipMsg: error});
											// this.refs.toast.show(error, DURATION.LENGTH_SHORT);

										} else {
											this.refs.toast.show('转发成功', DURATION.LENGTH_SHORT);

										}
									}
								)
							}
						}
						if (info.ttype == 1) {
							//单聊
							this._saveToDB(info.ttype, info.jid_node, info.trueName, info.image_name, '', '', '', this.state.tempMsgType == 2 ? 'file' : 'text', '', newMsgIdSingle);

							//判断是否需要拼接页面
							if (info.jid_node == this.state.friendDetail.jidNode) {
								let tempItemObj = {
									body: JSON.stringify(this.state.messageBody),
									sendType: 'to',
									position: this.state.data.length
								};
								let tempArr = [];
								tempArr.push(tempItemObj);
								this.setState({
									data: this.state.data.concat(tempArr),
									sendMsgId: this.state.messageBody.id,
									isNewMsg: true,
									isNotPC: true
								});

								if (this.state.tempMsgType == 2 && tempContent.file[0].listFileInfo[0].showPic == 'img') {
									let imgArr = [];
									let tempBody = this.state.messageBody;
									imgArr.push({
										url: Path.headImgNew + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&imageName=' + tempBody.content.file[0].listFileInfo[0].fileName + '&imageId=' + tempBody.content.file[0].listFileInfo[0].id + '&sourceType=chatImage&jidNode=' + '' + '&platform=' + Platform.OS
										// url: Path.baseImageUrl + '?uuId=' + uuid + '&ticket=' + this.state.ticket + '&fileId=' + tempBody.content.file[0].listFileInfo[0].id + '&fileName=' + tempBody.content.file[0].listFileInfo[0].fileName + '&type=image&userId=' + this.state.basic.userId,
									})
									keyCode[tempBody.content.file[0].listFileInfo[0].id] = this.state.msgImgList.length;
									this.setState({
										msgImgList: this.state.msgImgList.concat(imgArr)
									})
								}
							}

						}
						else {
							// this._saveToDB(info.ttype, '', '', '', info.jid_node, info.trueName, info.image_name, tempBody.messageType, this.state.basic.trueName, newMsgId);

							//判断是否需要拼接页面
							if (info.jid_node == this.state.room.roomJid) {
								let tempItemObj = {
									body: JSON.stringify(tempMsgBody),
									sendType: 'to',
									position: this.state.data.length
								};
								let tempArr = [];
								tempArr.push(tempItemObj);
								this.setState({
									data: this.state.data.concat(tempArr),
									sendMsgId: this.state.messageBody.id,
									isNewMsg: true,
									isNotPC: true
								});
								if (this.state.tempMsgType == 2 && tempContent.file[0].listFileInfo[0].showPic == 'img') {
									let imgArr = [];
									let tempBody = tempMsgBody;
									imgArr.push({
										url: Path.headImgNew + '?uuId=' + this.state.uuid + '&ticket=' + this.state.ticket + '&userId=' + this.state.basic.userId + '&imageName=' + tempBody.content.file[0].listFileInfo[0].fileName + '&imageId=' + tempBody.content.file[0].listFileInfo[0].id + '&sourceType=chatImage&jidNode=' + '' + '&platform=' + Platform.OS
										// url: Path.baseImageUrl + '?uuId=' + uuid + '&ticket=' + this.state.ticket + '&fileId=' + tempBody.content.file[0].listFileInfo[0].id + '&fileName=' + tempBody.content.file[0].listFileInfo[0].fileName + '&type=image&userId=' + this.state.basic.userId,
									})
									keyCode[tempBody.content.file[0].listFileInfo[0].id] = this.state.msgImgList.length;
									this.setState({
										msgImgList: this.state.msgImgList.concat(imgArr)
									})
								}
							}
						}
					});
				} else {
					this.setState({showAlert: true, tipMsg: '转发失败,请重试'});
				}
			})
		}
	}


}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	sendTypeView: {
		flex: 1,
		flexDirection: 'row',
		minHeight: 80,
		paddingTop: 5,
		paddingBottom: 5,
		// marginTop: 7,
		// marginBottom: 7,
		backgroundColor: 'transparent'
		// maxWidth: width * 0.7
	},
	headTop: {
		height: 37,
		width: 37,
		marginLeft: 8,
		marginRight: 8,
	},
	image: {
		height: 100,
		width: 100,
		borderRadius: 4,
		marginLeft: 4,
		marginRight: 4,
	},
	sendTextView: {
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 3,
		paddingLeft: 7,
		paddingRight: 7,
		borderWidth: 1,
		minHeight: 37,
	},
	sendTextIcon: {
		position: 'absolute',
		top: 13,
		width: 8,
		height: 8,
		borderWidth: 1,
	},
	sendTextIconSelf: { // 自己发送的气泡小三角
		borderLeftColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: '#549dff',
		borderRightColor: '#549dff',
		backgroundColor: '#549dff',
		right: 0
	},
	sendTextIconOther: { // 对方发送的气泡小三角
		borderLeftColor: '#d0d0d0',
		borderBottomColor: '#d0d0d0',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		backgroundColor: '#FFFFFF',
		left: 0
	},
	fileShowBox: {
		// position: 'relative',//relative absolute
		height: 0,
		top: -100,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	fileShowList: {
		flexDirection: 'row',
		backgroundColor: '#333',
		borderRadius: 4,
	},
	fileListText: {
		color: '#fff',
		padding: 7,
	},
	fileListBorder: {
		borderLeftWidth: 1,
		borderLeftColor: '#fff',
		width: 40,
		justifyContent: 'center',
	},
	fileListTip: {
		position: 'relative',
		// top: 30,
		width: 1,
		height: 1,
		borderTopWidth: 6,
		borderLeftWidth: 4,
		borderRightWidth: 4,
		borderBottomWidth: 6,
		borderTopColor: '#333',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
		zIndex: 999
	},
	soundWidth: {
		minWidth: 70,
		maxWidth: 150,
	},
	chatSound: {
		width: 15,
		height: 15,
	},
	fileView: {
		backgroundColor: '#ffffff',
		borderRadius: 4,
		flexDirection: 'row',
		padding: 7,
		width: 200,
		justifyContent: 'center',
		borderColor: 'rgba(0,0,0,0.1)',
		borderWidth: 1,
	},
	audioStartBox: {
		flexDirection: 'row',
		position: 'absolute',
		width: 120,
		height: 120,
		left: (width / 2) - 65,
		top: (height / 2) - 70,
		backgroundColor: '#747d8c',
	},
	audioStartImg: {
		width: 70,
		height: 120,
	},
	announcementImage: {
		width: 30,
		height: 30,
		marginRight: 8,
	},
	chatFileView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 0
	},
	chatFileViewTop: {
		flexDirection: 'row',
		padding: 3,
		paddingLeft: 8,
		paddingRight: 8,
		justifyContent: 'center'
	},
	chatFileViewImg: {
		width: 27,
		height: 35,
		marginRight: 8
	},
	chatFileViewText: {
		flex: 1,
		fontSize: 16,
		color: '#333',
		lineHeight: 30,
	},
	chatFileViewBottom: {
		width: 200,
		borderTopWidth: 1,
		borderTopColor: '#e5e5e5',
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8
	},
	chatFileViewTypeTxt: {
		fontSize: 12,
		color: '#999',
	},
	separator: {
		height: 8,
		backgroundColor: 'transparent'
		// borderBottomWidth: 1,
		// borderBottomColor: '#ccc'
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
	//---
	content: {
		padding: 0,
		height: 34,
		backgroundColor: '#333333',
		borderRadius: 4,
	},
	arrow: {
		height: 30,
		borderTopColor: '#333333',
	},
	background: {
		backgroundColor: 'transparent'
	},
});
