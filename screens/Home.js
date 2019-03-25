import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        };
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

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons
                                    name='food'
                                    color='#FFC312'
                                    size={30}
                                />
                                <Text style={{marginTop: 5}}>{'饮食管理'}</Text>
                            </View>

                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('SportManage')
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
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icons
                                    name='ios-medkit'
                                    color='#ffa502'
                                    size={30}
                                />
                                <Text style={{marginTop: 5}}>{'用药提醒'}</Text>
                            </View>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('AllDoctor')
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <MaterialCommunityIcons
                                        name='doctor'
                                        color='#FD7272'
                                        size={30}
                                    />
                                    <Text style={{marginTop: 5}}>{'咨询医生'}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.props.navigation.navigate('UserCenter')
                            }}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon
                                        name='child'
                                        color='#517fa4'
                                        size={30}
                                    />
                                    <Text style={{marginTop: 5}}>{'个人中心'}</Text>
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
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                <Text onPress={()=>{this.props.navigation.navigate('Topic')}}>{'更多'}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('TodoDetail')
                        }}>
                            <View style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name='file-text' size={16} color={'#a4b0be'}/>
                                    <Text style={{marginLeft: 8}}>{'工程监控项目的立项申请'}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                                    <Feather name='user' size={16} color={'#a4b0be'}/>
                                    <Text style={{color: '#a4b0be', fontSize: 13, marginLeft: 8}}>
                                        {'王晓辉'}
                                        <Text style={{fontSize: 10, paddingLeft: 10}}>{'2018.09.12 10:00'}</Text>
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Feather name='file-text' size={16} color={'#a4b0be'}/>
                                <Text style={{marginLeft: 8}}>{'工程监控项目的立项申请'}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                                <Feather name='user' size={16} color={'#a4b0be'}/>
                                <Text style={{color: '#a4b0be', fontSize: 13, marginLeft: 8}}>
                                    {'王晓辉'}
                                    <Text style={{fontSize: 10, paddingLeft: 10}}>{'2018.09.12 10:00'}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Feather name='file-text' size={16} color={'#a4b0be'}/>
                                <Text style={{marginLeft: 8}}>{'工程监控项目的立项申请'}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                                <Feather name='user' size={16} color={'#a4b0be'}/>
                                <Text style={{color: '#a4b0be', fontSize: 13, marginLeft: 8}}>
                                    {'王晓辉'}
                                    <Text style={{fontSize: 10, paddingLeft: 10}}>{'2018.09.12 10:00'}</Text>
                                </Text>
                            </View>
                        </View>
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
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                <Text onPress={()=>{this.props.navigation.navigate('AllDoctor')}}>{'更多'}</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Image source={require('../images/default_poster.jpg')} style={{width: 70, height: 100}}
                                       resizeMode={'stretch'} resizeMethod={'scale'}/>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{marginBottom: 5}}>{'王五'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'男'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'35岁'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'心脏外科'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'北京协和医院'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Image source={require('../images/default_poster.jpg')} style={{width: 70, height: 100}}
                                       resizeMode={'stretch'} resizeMethod={'scale'}/>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{marginBottom: 5}}>{'王五'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'男'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'35岁'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'心脏外科'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'北京协和医院'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            borderBottomColor: '#d4d4d4',
                            borderBottomWidth: 1
                        }}/>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Image source={require('../images/default_poster.jpg')} style={{width: 70, height: 100}}
                                       resizeMode={'stretch'} resizeMethod={'scale'}/>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{marginBottom: 5}}>{'王五'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'男'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'35岁'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'心脏外科'}</Text>
                                    <Text style={{color: '#a4b0be', fontSize: 12}}>{'北京协和医院'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}