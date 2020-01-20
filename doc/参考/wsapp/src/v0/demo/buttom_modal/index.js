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
      <View>
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
            //  backgroundColor: 'rgba(0,0,0,.3)',
         }}>
          <View>
          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text style={{
                padding: 10,
                color: 'red',
            }}>1</Text>
          </TouchableHighlight>

            <Text style={{
                color: 'white',
            }}>Hello World!</Text>




          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text style={{
              padding: 10,
              color: 'red',
          }}>1</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default ModalExample
