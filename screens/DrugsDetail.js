/*
 * 文章发布
 * 页面元素 标题 内容 上传附件
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert, TextInput
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import FetchUtil from '../util/FetchUtil';
import Config from '../util/Config';
import  Constant from "../util/Constant";
const inputComponents = [], ACT_HEIGHT = 38;
export  default  class DrugsDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drugsId:props.navigation.state.params.drugsId,
            drugsBody: {
                drugsName: '',
                drugsNum: '',
                drugsTime: '',
                startTime: '',
                endTime: '',
            },
        }
    };

    componentDidMount() {
        this._getDrugsDetails((data)=>{
            this.setState({
                drugsBody: {
                    drugsName: data.drugsName,
                    drugsNum: data.drugsNum,
                    drugsTime: data.drugsTime,
                    startTime: data.startTime,
                    endTime: data.endTime,
                }
            })
        })
    }
    _getDrugsDetails = (callback) => {
        //明天要将userId 改成id  后台接口要改
        let url=Config.Drugs_DETAil+"?token=lhy&userId="+Constant.user.id
        let params = {
            id: this.state.drugsId
        };
        FetchUtil.httpGet(url,params,callback);
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
                    centerComponent={{text: '用药详情', style: {color: '#fff', fontSize: 18}}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    style={{flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15}}>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}>
                        <Text style={styles.voteTitle}>药物名称</Text>
                        <Text  style={styles.voteInput}>{this.state.drugsBody.drugsName}</Text>
                    </View>

                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}>
                        <Text style={styles.voteTitle}>药品用量</Text>
                        <Text  style={styles.voteInput}>{this.state.drugsBody.drugsNum}</Text>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}>
                        <Text style={styles.voteTitle}>用药时间</Text>
                        <Text  style={styles.voteInput}>{this.state.drugsBody.drugsTime}</Text>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}>
                        <Text style={styles.voteTitle}>开始日期</Text>
                        <Text  style={styles.voteInput}>{this.state.drugsBody.startTime}</Text>
                    </View>
                    <View style={[styles.voteGroup, {borderTopColor: 'transparent'}]}>
                        <Text style={styles.voteTitle}>结束日期</Text>
                        <Text  style={styles.voteInput}>{this.state.drugsBody.endTime}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF'},
    voteGroup: {
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    voteTitle: {
        fontSize: 16,
        color: '#333',
        height: 38,
        lineHeight: 38,
    },
    voteInput: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
        padding: 0,
    },
    btn: {
        height: 43,
        borderRadius: 4,
        backgroundColor: '#4e71ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    }
});
