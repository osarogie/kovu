import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import excerptStyles from '../styles/excerptStyles'
import { connect } from 'react-redux'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import { navHelper } from '../helpers/getNavigation'
import { withNavigation } from 'react-navigation'
import { PURPLE, BLACK } from '../ui'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.user.loggedIn
})
function likeMutation({ _id, id, viewer_does_like, like_count }, environment) {
  const variables = {
    input: {
      id: _id
    }
  }

  const optimisticResponse = {
    likeDiscussion: {
      discussion: {
        _id,
        id,
        viewer_does_like: !viewer_does_like,
        like_count: like_count + 1
      }
    }
  }

  commitMutation(environment, {
    variables,
    optimisticResponse,
    mutation: graphql`
      mutation DiscussionLikeLikeDiscussionMutation(
        $input: LikeDiscussionInput!
      ) {
        likeDiscussion(input: $input) {
          discussion {
            ...DiscussionLike_discussion
          }
        }
      }
    `
  })
}

function unlikeMutation(
  { _id, id, viewer_does_like, like_count },
  environment
) {
  const variables = {
    input: {
      id: _id
    }
  }

  const optimisticResponse = {
    unlikeDiscussion: {
      discussion: {
        _id,
        id,
        viewer_does_like: !viewer_does_like,
        like_count: like_count - 1
      }
    }
  }

  commitMutation(environment, {
    variables,
    optimisticResponse,
    mutation: graphql`
      mutation DiscussionLikeUnlikeDiscussionMutation(
        $input: UnlikeDiscussionInput!
      ) {
        unlikeDiscussion(input: $input) {
          discussion {
            ...DiscussionLike_discussion
          }
        }
      }
    `
  })
}
class DiscussionLike extends React.Component {
  toggleLike = () => {
    if (!this.props.loggedIn) {
      navHelper(this).openLogin()
      return
    }

    const { discussion } = this.props
    const { environment } = this.props.relay
    const { viewer_does_like } = discussion
    viewer_does_like
      ? unlikeMutation(discussion, environment)
      : likeMutation(discussion, environment)
  }
  render() {
    const { style, size, hideCount, discussion, stacked } = this.props
    const { viewer_does_like, like_count } = discussion

    const color = viewer_does_like ? BLACK : BLACK
    return (
      <TouchableOpacity
        style={[
          {
            flexDirection: stacked ? 'column' : 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10
          },
          style
        ]}
        onPress={this.toggleLike}
      >
        <Icon
          name={viewer_does_like ? 'md-heart' : 'md-heart-outline'}
          style={excerptStyles.controlIcon}
          size={size || 23}
          color={color}
        />
        {hideCount ? null : (
          <Text style={{ marginLeft: stacked ? 0 : 7, fontSize: 15, color }}>
            {like_count}
          </Text>
        )}
      </TouchableOpacity>
    )
  }
}

export default createFragmentContainer(
  withNavigation(connect(mapStateToProps)(DiscussionLike)),
  graphql`
    fragment DiscussionLike_discussion on Discussion {
      id
      _id
      viewer_does_like
      like_count
    }
  `
)
