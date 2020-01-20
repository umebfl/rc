import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import Drawer from 'react-native-drawer'

class wsapp extends Component {
    closeControlPanel = () => {
        this._drawer.close()
    }
    openControlPanel = () => {
        this._drawer.open()
    }
    render () {
        return (
            <View style={{
                flex: 1,
            }}>


                <Drawer
                    // type='overlay'
                    tapToClose={true}
                    openDrawerOffset={100}
                    ref={(ref) => this._drawer = ref}
                    content={<View style={{
                        flex: 1,
                        backgroundColor: '#555',
                    }}>
                        <TouchableOpacity onPress={() => this.closeControlPanel()}>
                            <Text style={{
                                marginTop: 20,
                                color: 'white',
                            }}>Drawer</Text>
                        </TouchableOpacity>
                    </View>}>

                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={() => this.openControlPanel()}>
                            <Text style={{
                                marginTop: 20,
                            }}>内容</Text>
                        </TouchableOpacity>
                    </View>

                </Drawer>
            </View>
        )
    }
}


export default wsapp
