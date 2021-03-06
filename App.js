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
import Food from './screens/Food';
import FoodPublish from './screens/FoodPublish';
import Drugs from './screens/Drugs';
import DrugsPublish from './screens/DrugsPublish';
import DrugsDetail from './screens/DrugsDetail';
import Motion from './screens/Motion';
import MotionPublish from './screens/MotionPublish';
import BsList from './screens/BsList';
import Consult from './screens/Consult';
import ChooseSuffer from './screens/ChooseSuffer';
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
    FoodPublish : { screen: FoodPublish  },
    Food : { screen: Food  },
    Drugs : { screen: Drugs  },
    DrugsPublish : { screen: DrugsPublish  },
    DrugsDetail : { screen: DrugsDetail  },
    Motion : { screen: Motion  },
    MotionPublish : { screen: MotionPublish  },
    BsList : { screen: BsList  },
    Consult : { screen: Consult  },
    ChooseSuffer : { screen: ChooseSuffer  },

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
