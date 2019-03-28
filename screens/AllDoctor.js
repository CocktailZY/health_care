/**
 * 咨询医生
 */
import React, {PureComponent} from 'react';
import {
    Text, View, TouchableOpacity, Image, Dimensions, FlatList, TouchableHighlight
} from 'react-native';
import {Card, ListItem, Button, Icon, Header} from 'react-native-elements'

const {width} = Dimensions.get('window');
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import Constant from "../util/Constant";
export default class AllDoctor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            doctors:[]
        }
    }

    componentDidMount() {
        this._getAllDoctors((data)=>{
            this.setState({doctors:data});
        });
    }
    //
    _getAllDoctors = (callback)=>{
        let url=Config.GET_DOCTORS+"?token=lhy&userId="+Constant.user.id;
        FetchUtil.httpGet(url,{},callback);
    }
    _renderDoctors = ({item, index}) => {
        return (
            <Card title={item.user.userName} key={item.userId}>
                <View style={{flex:1}}>
                    <Image
                        style={{height:240}}
                        resizeMode="cover"
                        source={require('../images/default_poster.jpg')}
                    />
                    <Text style={{marginBottom: 10,marginTop:10,fontSize: 16}}>
                        {item.hospital}
                    </Text>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={() => {
                            this.props.navigation.navigate('Consult', {
                                userId: item.userId,//文章详情
                                userName:item.user.userName,
                                role:item.user.role,
                            });
                        }}
                        title='点击咨询' />
                </View>
            </Card>
        )
    };

    render() {
        const {doctors} = this.state;
        return (
            <View style={{flex: 1}}>
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
                    centerComponent={{text: '医生列表', style: {color: '#fff', fontSize: 18}}}
                />
                <FlatList
                    data={doctors}
                    renderItem={this._renderDoctors}
                    refreshing={false}
                    style={{marginBottom: 20}}
                />
            </View>
        )
    }
}