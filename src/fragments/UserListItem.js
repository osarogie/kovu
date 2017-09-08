import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  ViewPropTypes,
  PixelRatio,
  TouchableHighlight
} from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import { imageUrl } from '../utils'
import Avatar from '../components/Avatar'
import FollowButton from './FollowButton'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.user.loggedIn,
  current_user: state.user.user
})
class UserListItem extends React.Component {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
  }

  openProfile = _ => this.props.openProfile(this.props.user)

  renderFollowButton = _ =>
    this.props.loggedIn && this.props.user._id == this.props.current_user._id
      ? null
      : <FollowButton user={this.props.user} openLogin={this.props.openLogin} />

  render() {
    const { user } = this.props

    return (
      <TouchableHighlight
        {...this.clickableProps}
        onPress={this.openProfile}
        style={{
          margin: 17,
          marginTop: 10,
          backgroundColor: '#fff',
          flex: 1,
          elevation: 3,
          borderRadius: 5
        }}
      >
        <View style={{ width: 200, padding: 17, flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text
              numberOfLines={2}
              style={{
                marginTop: 10,
                // marginLeft: 10,
                flex: 1,
                marginRight: 5,
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold'
                // textAlign: 'center'
              }}
            >
              {user.name}
            </Text>
            <Avatar
              medium
              rounded
              source={user}
              title={user.name}
              activeOpacity={0.7}
            />
          </View>

          <View style={{ flex: 1, height: '100%' }}>
            <Text
              numberOfLines={2}
              style={{
                marginTop: 10,
                marginBottom: 10,
                // marginLeft: 10,
                flex: 1,
                marginRight: 5,
                fontSize: 14
                // textAlign: 'center'
              }}
            >
              {user.bio}
            </Text>
          </View>
          {this.renderFollowButton()}
        </View>
      </TouchableHighlight>
    )
  }
}

UserListItem.defaultProps = {}

UserListItem.propTypes = {
  ...ViewPropTypes
}

export default createFragmentContainer(
  connect(mapStateToProps)(UserListItem),
  graphql`
    fragment UserListItem_user on User {
      id
      _id
      name
      username
      bio
      profile_picture_name
      ...FollowButton_user
    }
  `
)
