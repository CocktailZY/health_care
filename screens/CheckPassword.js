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
    fetchHealth = (password) => {
        let url=Config.HEALTH_DETAil+"?token=lhy&userId="+Constant.user.id;
        let params={
        	password:password
		}
        FetchUtil.httpGet(url,params,(data)=>{
            if(data){
                this.setState({
                    medicalHistory: data.medicalHistory,
                    password:''
                })
            }else{
                this.setState({
                    medicalHistory: '查看失败'
                })
            }
        });
    };
	//组件渲染完毕时调用此方法
	componentDidMount() {
        // this.checkPassword(123456);

    };
	componentWillUnmount() {
	}
//验证密码查询病情
	checkPassword = (password) => {
		if(!password||password==''){
			Alert.alert("请求输入6位数字密码")
			return;
		}
        this.fetchHealth(password)


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
						value={this.state.password}
					/>
				</View>
				<View style={{flex:1,margin: 12,backgroundColor:'#ffffff',padding:8}}>
					<Text>{this.state.medicalHistory}</Text>
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