// app/index.js

// Removed for brevity
import React, { Component } from 'react';
import {Text} from 'react-native'
import { Router, Scene } from 'react-native-router-flux';//引入包

import ScarletScreen from './ScarletScreen'; //引入文件
import GrayScreen from './GrayScreen';//引入文件
import style from './style'

const TabIcon = ({ selected, title }) => {
  return (
        <Text style={{fontSize: 12, color: '#3DA8F5'}}>{title}</Text>
  );

    //   <Button style={{color: selected ? 'red' :'black'}} vertical>
    //       <Thumbnail style={style.thumbnail} square source={require('../../../../content/img/icon/flash_1.png')} />
    //       <Text style={{fontSize: 12, color: '#3DA8F5'}}>{title}</Text>
    //   </Button>
}

const wsapp = () => {
  return (
    <Router>
      <Scene key='root'>
        {/* Tab Container */}
        <Scene
          key='tabbar'
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Tab and it's scenes */}
          <Scene key='aa' title='aa' icon={TabIcon}>
            <Scene
              key='scarlet'
              component={ScarletScreen}
              title='Scarlet'
            />

          </Scene>
          <Scene key='ii' title='ii' icon={TabIcon}>
            <Scene
              key='gray'
              component={GrayScreen}
              title='Gray'
            />
          </Scene>
          {/* Removed for brevity */}
        </Scene>
      </Scene>
    </Router>
  );
}

export default wsapp
