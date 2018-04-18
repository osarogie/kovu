import React from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  Share
} from 'react-native'

import {
  Button,
  Text,
  HorizontalPager,
  Tile,
  Subtitle,
  Caption,
  Title
} from '@shoutem/ui'
import Image from '../components/NetworkImage'
// import { imageUrl, getSecureLink } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import { imageUrl } from '../utils'
import Toolbar from '../components/Toolbar'

const window = Dimensions.get('window')

export default class ProfilePictureScreen extends React.Component {
  goBack = _ => this.props.navigation.goBack()
  sharePic = _ => {
    const { id, image, username } = this.props.navigation.state.params
    const secureImage = getSecureLink(image)

    const message = `This is a picture of ${username}. ${secureImage}  - via Konfamd (https://konfamd.com)`

    Share.share({
      title: 'Share Pic',
      message,
      url: secureImage
    })
  }
  render() {
    const {
      profile_picture_name,
      username
    } = this.props.navigation.state.params
    const secureImage = imageUrl(profile_picture_name, '1000x1000')

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          width: window.width,
          paddingTop: Platform.select({
            android: 0,
            ios: 20
          })
        }}
      >
        <StatusBar barStyle="light-content" />

        <Toolbar
          dark
          title={username}
          navIconName="md-arrow-back"
          showNavIcon
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            style={styles.image}
            source={{
              uri: secureImage
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  white: { color: '#fff' },
  flexible: { flex: 1 },
  image: {
    width: window.width,
    height: window.width
  }
}
