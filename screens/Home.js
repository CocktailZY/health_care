import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TouchableHighlight, FlatList, DeviceEventEmitter
} from 'react-native';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from "../util/Constant";
import Config from "../util/Config";
import FetchUtil from "../util/FetchUtil";

const {width} = Dimensions.get('window');
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#e4e4e4'
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    },

    funcImg: {
        width: 28,
        height: 28
    }
}
export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataTopicSource: [],
            dataDoctorSource: [],
            pageNum: 1,
            pageSize: 5,
            footLoading: false,//是否可刷新
        };
    };

    componentDidMount() {
        //监听新建文章，返回刷新列表
        this.fetchTopic();
        this._getDoctors();
    };

    _getDoctors = () => {
        let url = Config.PAGE_DOCTORS + "?token=lhy&userId=" + Constant.user.id;
        let params = {pageNum: 1, pageSize: 5};
        FetchUtil.httpGet(url, params, (data) => {
            this.setState({dataDoctorSource: data.recordList})
        });
    }
    fetchTopic = () => {
        let url = Config.ESSAY + "?token=lhy&userId=" + Constant.user.id;
        let params = {
            pageNum: 1,
            pageSize: 5
        };
        FetchUtil.httpGet(url, params, (data) => {
            this.setState({
                dataTopicSource: data.recordList
            })
        });
    };

    //文章
    _renderEssayListItem = ({item, index}) => {
        return (
            <View>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor='#FFFFFF'
                    style={{backgroundColor: '#FFFFFF'}}
                    onPress={() => {
                        this.props.navigation.navigate('TopicDetail', {
                            topicId: item.id//文章详情
                        });
                    }}>
                    <View style={[styles.flex1, {padding: 8}]}>
                        <View style={styles.itemTitleView}>
                            {/*<Image source={require('../../images/icon_talk.png')} style={{width: 30, height: 30}}/>*/}
                            <Text style={styles.itemTitleText} numberOfLines={1}>{item.title}</Text>
                        </View>
                        <View style={styles.bottomSeparator}></View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: 200}}>
                                <Text style={styles.itemBottomText} numberOfLines={1}>{`${item.createTime}发表`}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: '#d4d4d4',
                    borderBottomWidth: 1
                }}/>
            </View>
        )
    };
    //医生
    renderDoctorListItem = ({item, index}) => {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image source={require('../images/yisheng.jpg')} style={{width: 70, height: 100}}
                               resizeMode={'stretch'} resizeMethod={'scale'}/>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{marginBottom: 5}}>{item.user.userName}</Text>
                            <Text style={{color: '#a4b0be', fontSize: 12}}>{item.offices}</Text>
                            <Text style={{color: '#a4b0be', fontSize: 12}}>{item.hospital}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: '#d4d4d4',
                    borderBottomWidth: 1
                }}/>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/*轮播图*/}
                    <Swiper style={styles.wrapper} height={200} autoplay={true}
                            dot={null}
                            activeDot={null}
                            paginationStyle={{
                                bottom: -23, left: null, right: 10
                            }} loop>
                        <View style={styles.slide}>
                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../images/default_poster.jpg')}/>
                        </View>
                        <View style={styles.slide}>
                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../images/default_poster.jpg')}/>
                        </View>
                        <View style={styles.slide}>
                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../images/default_poster.jpg')}/>
                        </View>
                        <View style={styles.slide}>
                            <Image resizeMode='stretch' style={styles.image}
                                   source={require('../images/default_poster.jpg')}/>
                        </View>
                    </Swiper>
                    {/*功能块*/}
                    <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('Topic')
                            }}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon
                                        name='file-text'
                                        color='#12CBC4'
                                        size={26}
                                    />
                                    <Text style={{marginTop: 5}}>{'文章管理'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('Food')
                            }}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <MaterialCommunityIcons
                                        name='food'
                                        color='#FFC312'
                                        size={30}
                                    />
                                    <Text style={{marginTop: 5}}>{'饮食管理'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('Motion')
                            }}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icons
                                        name='ios-bicycle'
                                        color='#0652DD'
                                        size={30}
                                    />
                                    <Text style={{marginTop: 5}}>{'运动管理'}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                // this.props.navigation.navigate('Drugs')
                                this.props.navigation.navigate('Medkit');
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: 20
                                    }}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icons
                                            name='ios-medkit'
                                            color='#ffa502'
                                            size={30}
                                        />
                                        <Text style={{marginTop: 5}}>{'用药提醒'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                if (Constant.user.role == 'doctor') {
                                    this.props.navigation.navigate('ChooseSuffer')//直接进入聊天页面
                                } else {
                                    this.props.navigation.navigate('AllDoctor')
                                }
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: 20
                                    }}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <MaterialCommunityIcons
                                            name='doctor'
                                            color='#FD7272'
                                            size={30}
                                        />
                                        <Text style={{marginTop: 5}}>{'咨询医生'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('UserCenter')
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: 20
                                    }}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon
                                            name='child'
                                            color='#517fa4'
                                            size={30}
                                        />
                                        <Text style={{marginTop: 5}}>{'个人中心'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*文章推荐*/}
                    <View style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        marginTop: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>
                        <View style={{flexDirection: 'row', paddingLeft: 5}}>
                            <View style={{width: 15, borderLeftWidth: 3, borderLeftColor: '#278EEE'}}></View>
                            <Text style={{fontSize: 16}}>{'文章推荐'}</Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text onPress={() => {
                                    this.props.navigation.navigate('Topic')
                                }}>{'更多'}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <FlatList
                            keyExtractor={(item, index) => String(index)}
                            extraData={this.state}
                            data={this.state.dataTopicSource}
                            renderItem={this._renderEssayListItem}
                            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                            ListEmptyComponent={() => <View
                                style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, color: '#999'}}>暂无数据</Text>
                            </View>}
                            refreshing={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />

                    </View>
                    {/*名医推荐*/}
                    <View style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        marginTop: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>
                        <View style={{flexDirection: 'row', paddingLeft: 5}}>
                            <View style={{width: 15, borderLeftWidth: 3, borderLeftColor: '#278EEE'}}/>
                            <Text style={{fontSize: 16}}>{'名医推荐'}</Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text onPress={() => {
                                    this.props.navigation.navigate('AllDoctor')
                                }}>{'更多'}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <FlatList
                            data={this.state.dataDoctorSource}
                            renderItem={this.renderDoctorListItem}
                            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                            ListEmptyComponent={() => <View
                                style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, color: '#999'}}>暂无数据</Text>
                            </View>}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}