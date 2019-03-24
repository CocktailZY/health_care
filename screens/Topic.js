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
    TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

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
            tipMsg: ''//alert提示信息
        }
    };

    componentDidMount() {
        // this.fetchTopic(1);
        // this._topicAddPage = DeviceEventEmitter.addListener('topicAddPage', (params) => {
        //     // console.log(params);
        //     this.fetchTopic(1);
        // });
    };

    componentWillUnmount() {
        // this._topicAddPage.remove();
    };

    //获取话题列表数据
    fetchTopic = (pageNum) => {
        let url = Path.getTopicList;
        let params = {
            mid: this.state.room.roomJid,
            jidNode: this.state.basic.jidNode,
            pageNum: pageNum,
            pageSize: Path.pageSize,
            uuId: this.state.uuid,
            ticket: this.state.ticket,
            userId: this.state.basic.userId,
            type: 1,
        };
        FetchUtil.netUtil(url + ParamsDealUtil.toGetParams(params), {}, 'GET', this.props.navigation, '', this.topicListCallBack);
    };
    //获取投票列表数据回调
    topicListCallBack = (res) => {
        if (res.code.toString() == '200') {
            let dataArr = [];
            if (res.data.page.currentPage <= 1) {
                dataArr = res.data.page.recordList;
            } else {
                dataArr = this.state.dataSource.concat(res.data.page.recordList);
            }

            let topArr = [];
            let arr = [];
            dataArr.map((item, index) => {
                if (item.isTop == '1') {
                    topArr.push(item);
                } else {
                    arr.push(item)
                }
            });

            this.setState({
                dataSource: topArr.concat(arr),
                pageNum: res.data.page.currentPage,
                totalPage: res.data.page.totalPage,
                footLoading: false,//是否可刷新
            })
        }
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
                                this.fetchTopic(tempNowPage);
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
                    this.props.navigation.navigate('TopicDetail', {
                        ticket: this.state.ticket,
                        uuid: this.state.uuid,
                        room: this.state.room,
                        basic: this.state.basic,
                        topicId: item.id//投票id
                    });
                }}>
                <View style={[styles.flex1, {padding: 8}]}>
                    <View style={styles.itemTitleView}>
                        {/*<Image source={require('../../images/icon_talk.png')} style={{width: 30, height: 30}}/>*/}
                        <Text style={styles.itemTitleText} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={styles.bottomSeparator}></View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 80}}>
                            <Text style={styles.itemBottomText} numberOfLines={1}>{`${item.nickName}发起`}</Text>
                        </View>
                        <View style={{width: 80}}>
                            <Text style={styles.itemBottomText} numberOfLines={1}>{`回应：${item.respondNum}`}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text style={styles.itemBottomText}
                                  numberOfLines={1}>{`最后回应：${item.lastRespondTime}`}</Text>
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
                    centerComponent={{text: '文章列表', style: {color: '#fff', fontSize: 18}}}
                    rightComponent={
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color='#ffffff'
                            onPress={() => {this.props.navigation.navigate('TopicPublish')}}
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
                        this.fetchTopic(1)
                    }}
                    ListFooterComponent={() => this._renderFooter()}
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