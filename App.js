import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Topic from './screens/Topic';
import TopicDetail from './screens/TopicDetail';
import TopicPublish from './screens/TopicPublish';
import AllDoctor from './screens/AllDoctor';
import SportManage from './screens/SportManage';
import UserCenter from './screens/UserCenter';
import CheckPassword from './screens/CheckPassword';
import RegisterDoctor from './screens/RegisterDoctor';
import Medkit from './screens/Medkit';

const RootStack = createStackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: Home },
    Topic: { screen: Topic },
    TopicDetail: { screen: TopicDetail },
    TopicPublish: { screen: TopicPublish },
    AllDoctor: { screen: AllDoctor },
    SportManage: { screen: SportManage },
    UserCenter: { screen: UserCenter },
    CheckPassword: { screen: CheckPassword },
    RegisterDoctor: { screen: RegisterDoctor },
    Medkit: { screen: Medkit },
}, {
    initialRouteName: 'Login', // 默认显示界面
    defaultNavigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        // title:'消息',
        header: null,
        gesturesEnabled: false,

    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: (transitionProps,prevTransitionProps) => {
        // console.log('导航栏切换开始');  // 回调
    },
    onTransitionEnd: (transitionProps,prevTransitionProps) => {
    }
});

export default createAppContainer(RootStack);
