/*
 * 话题列表
 * 页面元素 默认图标 标题 发起人 回应数 最后回应时间
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableHighlight,
    DeviceEventEmitter,
    TouchableOpacity, FlatList, Dimensions, TextInput
} from 'react-native';
import {CheckBox, Header, Icon} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import Constant from "../util/Constant";
import Ionicons from "react-native-vector-icons/Ionicons";

const {width, height} = Dimensions.get('window');

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pageNum: 1,//当前页数
            totalPage: 0,//总页数
            footLoading: false,//是否可刷新
            showAlert: false,//alert框
            tipMsg: '',//alert提示信息
            checked: true,//选中状态
            searchText: '',//搜索框内容
            bsList: [], //病史list
            choose: []//已选病史
        }
    };

    componentDidMount() {
        this.setState({
            bsList:[
                {id:false},
                {id:false},
                {id:false},
                {id:false},
                {id:false},
                {id:false},
                {id:true},
                {id:false}
            ],
        })
    };

    componentWillUnmount() {
        // this._topicAddPage.remove();
        console.log('1111111');
    };

    //获取话题列表数据
    fetchTopic = (pageNum, callback) => {

    };
    //获取病史列表数据回调
    topicListCallBack = (res) => {

    };

    _renderBsListItem = ({item, index}) => {
        return (
            <CheckBox
                left
                title='Click Here'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                size={18}
                checked={item.id}
                onPress={()=>{
                    console.log(item.id);
                }}
            />
        )
    };

    _toSearch = () => {
        console.log(this.state.searchText);
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
                    centerComponent={{text: '病史选择', style: {color: '#fff', fontSize: 18}}}
                />
                <View style={{
                    flexDirection: 'row',
                    margin: 8,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#CCCCCC'
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 30,
                            backgroundColor: '#FFFFFF',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            borderRadius: 6,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 8,
                            paddingRight: 8
                        }}
                        placeholderTextColor={'#CCCCCC'}
                        placeholder={'搜索...'}
                        onSubmitEditing={this._toSearch}
                        onChangeText={(text) => {
                            this.setState({searchText: text})
                        }}
                        underlineColorAndroid={'transparent'}
                    />
                    <View style={{width: 25, height: 30, justifyContent: 'center'}}>
                        <Ionicons name={'ios-search'} size={25} color={'#CCCCCC'} onPress={() => {
                            this._toSearch()
                        }}/>
                    </View>
                </View>
                <FlatList
                    data={this.state.bsList}
                    renderItem={this._renderBsListItem}
                    ListEmptyComponent={() => <View
                        style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#999'}}>暂无数据</Text>
                    </View>}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }
}

export default Topic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    flex1: {flex: 1},
    bottomSeparator: {
        height: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
        marginBottom: 8
    },
    separator: {
        height: 10,
        backgroundColor: '#f0f0f0'
    },
    topicBackRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    topicDelBtnRight: {
        backgroundColor: '#f90000',
        right: 75,
    },
    topicTopBtnRight: {
        backgroundColor: '#f77516',
        right: 0,
    },
    itemTitleView: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    itemTitleText: {fontSize: 18, fontWeight: 'bold', marginLeft: 5, width: (width - 30) * 0.9},
    itemBottomText: {fontSize: 11, color: '#b5b5b5'},
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
    }
});