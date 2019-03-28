/** 医生查看自己的患者列表 */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import FetchUtil from "../util/FetchUtil";
import Config from "../util/Config";
import Constant from "../util/Constant";
export default class ChooseSuffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suffersList: [] //患者列表
    };
  }

  componentDidMount() {
    // this._fetchSuffer();
  }

  _fetchSuffer = () => {};

  _suffersItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          console.log("点击某人");
          //跳转问诊页
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("../images/default_poster.jpg")}
            style={{ width: 80, height: 100 }}
            resizeMode={"stretch"}
            resizeMethod={"scale"}
          />
          <Text>{`姓名：${item.name}`}</Text>
          <Text>{`性别：${item.sex}`}</Text>
          <Text>{`年龄：${item.age}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          leftComponent={
            <Icon
              name="arrow-left"
              type="font-awesome"
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: "选择病患",
            style: { color: "#fff", fontSize: 18 }
          }}
        />
        <FlatList
          keyExtractor={(item, index) => String(index)}
          numColumns={4}
          data={this.state.suffersList}
          renderItem={this._suffersItem}
        />
      </View>
    );
  }
}
