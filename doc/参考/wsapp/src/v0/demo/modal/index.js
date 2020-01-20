import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput} from 'react-native';

class ModalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
            style={{
            }}
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{
             flex: 1,
             backgroundColor: 'rgba(0,0,0,.3)',
         }}>
          <View>
            <Text style={{
                marginTop:300,
                color: 'white',
            }}>Hello World!</Text>

            <TextInput style={{
                height: 100,
            }}
            multiline={true}/>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default ModalExample
