import React from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import Authenticator from '../components/Authenticator'
import styles from '../styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BACKGROUND from '../images/welcome.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends React.Component {
  goBack = () => this.props.navigation.goBack()
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
            source={BACKGROUND}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#000c'
            // justifyContent: 'center'
          }}
        >
          <KeyboardAwareScrollView
            onKeyboardWillShow={frames => {
              console.log('Keyboard event', frames)
            }}
            ref={ref => (this.scroll = ref)}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ width: '100%' }}
          >
            {/* <ScrollView style={[styles.container]}> */}
            <TouchableOpacity
              onPress={this.goBack}
              style={{ margin: 20, alignSelf: 'flex-start' }}
            >
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <View
              style={[
                styles.inner,
                styles.scrollViewContainerStyle,
                { flex: 1, marginHorizontal: 20 }
              ]}
            >
              {/* <Image
                source={require("../images/welcome.png")}
                style={styles.logoImage}
              /> */}
              <Authenticator goBack={this.props.navigation.goBack} />
            </View>
            {/* </ScrollView> */}
          </KeyboardAwareScrollView>
        </View>
      </View>
    )
  }
}
