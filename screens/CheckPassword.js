import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Platform,
    StyleSheet,
    TextInput,
    NativeModules,
    View, BackHandler,
    Alert, TouchableOpacity, Text
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Config from "../util/Config";
import Constant from "../util/Constant";
import FetchUtil from "../util/FetchUtil";
let lastPresTime = 1;
export default class CheckPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
            medicalHistory:'',
		}
	};
    fetchHealth = (password,callback) => {
        let url=Config.HEALTH_DETAil+"?token=lhy&userId="+Constant.user.id;
        let params={
        	password:password
		}
        FetchUtil.httpGet(url,params,callback);
    };
	//组件渲染完毕时调用此方法
	componentDidMount() {
	};
	componentWillUnmount() {
	}
//验证密码查询病情
	checkPassword = (password) => {
		if(password||password==''){
			Alert.alert("请求输入6位数字密码")
			return;
		}
        this.fetchHealth(password,(data)=>{
        	if(data){
                this.setState({
                    medicalHistory: data.medicalHistory
                })
			}else{
                this.setState({
                    medicalHistory: '查看失败'
                })
			}
		})


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
                    centerComponent={{text: '验证密码', style: {color: '#fff', fontSize: 18}}}
                />
				<View style={styles.textInput}>
					<TextInput
						ref="Password"
						style={{flex: 1, color: 'black', padding: 0, marginLeft: 12}}
						placeholder={'请输入6位数字加密密码'}
						placeholderTextColor={'#ccc'}
						underlineColorAndroid="transparent"
						onChangeText={(text) => this.setState({password:text})}
						value={this.state.text}
					/>
				</View>
				<View>
					<text>{this.state.medicalHistory}</text>
				</View>
                <View style={{backgroundColor: '#fff', marginTop: 10, height: 48, marginBottom: 10}}>
                    <TouchableOpacity
                        style={[styles.menuList, styles.menuTouch, {borderTopColor: 'transparent'}]}
                        onPress={() => {
                            this.checkPassword(this.state.password)
                        }}>
                        <Text style={[styles.settingText, {flex: 1, textAlign: 'center'}]}>验证查看</Text>
                    </TouchableOpacity>
                </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(240,240,240,1)'
	},
	textInput: {
		backgroundColor: 'white',
		height: 40,
		marginTop: 20
	}
});