/*
 * 饮食列表
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
    TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";

const {width, height} = Dimensions.get('window');

export default class Drugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pageNum: 1,//当前页数
            totalPage: 0,//总页数
            footLoading: false,//是否可刷新
            showAlert: false,//alert框
            tipMsg: ''//alert提示信息
        }
    };

    componentDidMount() {
        //监听新建饮食，返回刷新列表
        DeviceEventEmitter.addListener("drugsAddPage",()=>{
            this.fetchDrugs(1,(data) =>{
                this.DrugsListCallBack(data);
            });
        })
        this.fetchDrugs(1,(data) =>{
            this.DrugsListCallBack(data);
        });
    };

    componentWillUnmount() {
        // this._topicAddPage.remove();
    };

    //获取话题列表数据
    fetchDrugs = (pageNum,callback) => {
        let url = Config.DRUGS+"?token=lhy&userId="+Constant.user.id;
        let params = {
            pageNum: pageNum,
            pageSize: Constant.pageSize
        };
        FetchUtil.httpGet(url ,params,callback);
    };
    //获取投票列表数据回调
    DrugsListCallBack= (res) => {
        console.log(res);
        let dataArr = [];
        if (res.currentPage <= 1) {
            dataArr = res.recordList;
        } else {
            dataArr = this.state.dataSource.concat(res.recordList);
        }
        this.setState({
            dataSource: dataArr,
            pageNum: res.currentPage,
            totalPage: res.totalPage,
            footLoading: false,//是否可刷新
        })
    };

    _renderFooter() {
        let footView = null;
        if (this.state.pageNum < this.state.totalPage) {
            if (this.state.footLoading) {
                footView = (
                    <View style={styles.footer}>
                        <ActivityIndicator/>
                        <Text style={styles.footerText}>正在加载更多数据...</Text>
                    </View>
                )
            } else {
                footView = (
                    <TouchableOpacity
                        style={styles.footer}
                        onPress={() => {
                            let tempNowPage = this.state.pageNum + 1;
                            this.setState({footLoading: true}, () => {
                                //获取数据
                                this.fetchDrugs(tempNowPage,(data) =>{
                                    this.DrugsListCallBack(data);
                                });
                            });
                        }}
                    >
                        <Text>{'点击加载更多数据'}</Text>
                    </TouchableOpacity>
                )
            }
        } else {
            if (this.state.dataSource.length > 0) {
                footView = (
                    <View style={styles.footer}>
                        <Text>{'没有更多数据了'}</Text>
                    </View>
                )
            }
        }
        return footView;
    };

    _renderListItem = ({item, index}) => {
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor='#FFFFFF'
                style={{backgroundColor: '#FFFFFF'}}
                onPress={() => {
                    this.props.navigation.navigate('DrugsDetail', {
                        drugsId: item.id//文章详情
                    });
                }}>
                <View style={[styles.flex1, {padding: 8}]}>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitleText} numberOfLines={1}>{item.drugsName}</Text>
                    </View>
                    <View style={styles.bottomSeparator}></View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                            <Text style={styles.itemBottomText} numberOfLines={1}>{`数量：${item.drugsNum}`}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={styles.itemBottomText} numberOfLines={1}>{`时间：${item.drugsTime}`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        const {showAlert, tipMsg} = this.state;
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
                    centerComponent={{text: '用药列表', style: {color: '#fff', fontSize: 18}}}
                    rightComponent={
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='#ffffff'
                            onPress={() => {this.props.navigation.navigate('DrugsPublish')}}
                        />
                    }
                />
                <FlatList
                    keyExtractor={(item, index) => String(index)}
                    extraData={this.state}
                    data={this.state.dataSource}
                    renderItem={this._renderListItem}
                    ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                    ListEmptyComponent={() => <View
                        style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#999'}}>暂无数据</Text>
                    </View>}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onRefresh={() => {
                        this.fetchDrugs(1,(data) =>{
                            this.DrugsListCallBack(data);
                        });
                    }}
                    ListFooterComponent={() => this._renderFooter()}
                />
            </View>
        )
    }
}


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
    itemBottomText: {fontSize: 13, color: '#b5b5b5'},
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