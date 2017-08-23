import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import excerptStyles from '../styles/excerptStyles'
import { connect } from 'react-redux'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.loggedIn
})

class DiscussionLike extends React.Component {
  render() {
    const { is_liked_by_viewer, like_count } = this.props.discussion
    const color = is_liked_by_viewer ? '#05f' : '#777'
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={is_liked_by_viewer ? 'md-heart' : 'md-heart-outline'}
          style={excerptStyles.controlIcon}
          size={23}
          color={color}
        />
        <Text style={{ marginLeft: 7, fontSize: 15, color }}>
          {like_count}
        </Text>
      </View>
    )
  }
}

export default createFragmentContainer(
  connect(mapStateToProps)(DiscussionLike),
  graphql`
    fragment DiscussionLike_discussion on Discussion {
      id
      _id
      is_liked_by_viewer
      like_count
    }
  `
)
