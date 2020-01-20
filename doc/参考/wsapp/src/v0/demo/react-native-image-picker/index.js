import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Button,
    Modal,
    Text,
    TouchableHighlight
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

// More info on all the options is below in the README...just some common use cases shown here
/*var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};*/

var defaultOptions = {
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true
}

class wsapp extends Component {

    constructor(props) {
        super(props);
        this.state = { modalVisible: false, avatarSource: '' };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    picker() {
        ImagePicker.openPicker(defaultOptions).then(image => {
            // let source = { uri: image.data };
            let source = { uri: 'data:image/jpeg;base64,' + image.data };
            this.setState({
                avatarSource: source
            });

            alert(image.path)
        })
    }

    camera() {
        ImagePicker.openCamera(defaultOptions).then(image => {
            // let source = { uri: image.data };
            let source = { uri: 'data:image/jpeg;base64,' + image.data };
            this.setState({
                avatarSource: source
            });

            alert(image.path)
        })
    }

    render() {
        return (
            <View style={{
                    marginTop: 40,
                    flex: 1,
                }}>
                <Modal
                    style={{
                        marginTop: 40,
                    }}
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={styles.view}>
                        <View>

                            <Button style={styles.button} title="拍照" onPress={() => this.camera()}> </Button>
                            <Button style={styles.button} title="从相册选择" onPress={() => this.picker()}> </Button>

                            <Image source={this.state.avatarSource} style={styles.uploadAvatar} />

                            <Button  style={styles.button} title="隐藏modal" onPress={() => this.setModalVisible(!this.state.modalVisible)}> </Button>

                        </View>
                    </View>
                </Modal>

                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>



            </View >
        );
    }
}

const styles = StyleSheet.create({
    uploadAvatar: {
        width: 300,
        height: 300
    },
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,.3)'
    },
    button:{
        width:300,
        height:80
    }
})

export default wsapp
