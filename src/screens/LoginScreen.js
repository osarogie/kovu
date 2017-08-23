import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import Authenticate from '../components/Authenticate'
import styles from '../styles'

export default class LoginScreen extends React.Component {
  render() {
    const resizeMode = 'center'
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000'
        }}
      >
        {/* <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode
            }}
            source={require('../images/welcome.png')}
          />
        </View> */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              marginLeft: -30,
              marginTop: -30,
              transform: [{ rotate: '45deg' }]
            }}
            source={require('../images/welcome.png')}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000c',
            justifyContent: 'center'
          }}
        >
          <ScrollView
            style={[styles.container]}
            contentContainerStyle={styles.scrollViewContainerStyle}
          >
            <View style={styles.inner}>
              <Image
                source={require('../images/welcome.png')}
                style={styles.logoImage}
              />
              <Authenticate goBack={this.props.navigation.goBack} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
