import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  ViewPropTypes,
  PixelRatio,
  TouchableOpacity
} from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import { imageUrl } from '../utils'
import { Avatar } from 'react-native-elements'

class UserListItem extends React.Component {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  renderProfilePicture() {
    const { user, openProfile } = this.props
    const size = PixelRatio.getPixelSizeForLayoutSize(50)
    const image = user.profile_picture_name

    return (
      <Avatar
        medium
        rounded
        source={{ uri: imageUrl(image, `${size}x${size}`) }}
        onPress={_ => openProfile(user)}
        title={user.name}
        activeOpacity={0.7}
      />
    )
  }

  render() {
    const { user, openProfile } = this.props

    return (
      <TouchableOpacity
        {...this.clickableProps}
        onPress={_ => openProfile(user)}
      >
        <View
          style={{
            marginLeft: 17,
            width: 80,
            marginTop: 10,
            alignItems: 'center'
          }}
        >
          {this.renderProfilePicture()}
          <View>
            <Text
              numberOfLines={1}
              style={{
                marginBottom: 20,
                marginTop: 10,
                color: '#000',
                fontSize: 14,
                textAlign: 'center'
              }}
            >
              {user.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

UserListItem.defaultProps = {}

UserListItem.propTypes = {
  ...ViewPropTypes
}

export default createFragmentContainer(
  UserListItem,
  graphql`
    fragment UserListItem_user on User {
      id
      _id
      name
      username
      bio
      profile_picture_name
    }
  `
)
