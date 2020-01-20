import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio
} from 'react-native';

//输入框组件
class Search extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {text: '', show: false};
  }

  //组件渲染
  render() {
    return (
      <View style={styles.flex}>
          <View style={[styles.flexDirection, styles.inputHeight]}>
            <View style={styles.flex}>
              <TextInput
                style={styles.input}
                returnKeyType="search"
                placeholder="请输入关键字"
                value={this.state.text}
                onChangeText={this.textChange.bind(this)}/>
            </View>
            <View style={styles.btn}>
              <Text style={styles.search} onPress={this.search.bind(this)}>搜索</Text>
            </View>
          </View>
          {this.state.show?
            <View style={styles.list}>
              <Text onPress={this.hideList.bind(this, this.state.text + '网站')}
                    style={styles.item} numberOfLines={1}>{this.state.text}网站</Text>
              <Text onPress={this.hideList.bind(this, this.state.text + '文章')}
                    style={styles.item} numberOfLines={1}>{this.state.text}文章</Text>
              <Text onPress={this.hideList.bind(this, this.state.text + '最新消息')}
                    style={styles.item} numberOfLines={1}>{this.state.text}最新消息</Text>
            </View>
            : null
          }
      </View>
    );
  }

  //输入框文字改变
  textChange(text){
    this.setState({
      show: text!="" ? true : false,
      text: text
    });
  }

  //隐藏自动提示列表
  hideList(text){
    this.setState({
      show: false,
      text: text
    });
  }

  //搜索按钮点击
  search(){
    alert("您输入的内容为："+this.state.text);
  }
}

//默认应用的容器组件
class App extends Component {
   render() {
      return (
        <View style={[styles.flex, styles.topStatus]}>
         <Search></Search>
        </View>
      );
   }
 }

//样式定义
const styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  flexDirection:{
    flexDirection:'row'
  },
  topStatus:{
    marginTop:25,
  },
  inputHeight:{
    height:45,
  },
  input:{
    height:45,
    borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4
  },
  btn:{
    width:55,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems: 'center'
  },
  search:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  list:{
    marginTop: 1/PixelRatio.get(),
    marginLeft:5,
    marginRight:5,
    height:200,
    borderColor:'#ccc',
    borderTopWidth: 1/PixelRatio.get(),
  },
  item:{
    fontSize:16,
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    borderWidth: 1/PixelRatio.get(),
    borderColor:'#ddd',
    borderTopWidth:0,
  }
});

export default Search
