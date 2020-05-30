import React, { useCallback } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import excerptStyles from '../styles/excerptStyles'
import { connect } from 'react-redux'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import getNavigation, { navHelper } from '../helpers/getNavigation'
import { withNavigation } from '../navigation/withNavigation'
import { BLACK } from '../ui'
import { useTheme } from 'react-native-paper'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.user.loggedIn,
})
function likeMutation({ _id, id, viewer_does_like, like_count }, environment) {
  const variables = {
    input: {
      id: _id,
    },
  }

  const optimisticResponse = {
    likeDiscussion: {
      discussion: {
        _id,
        id,
        viewer_does_like: !viewer_does_like,
        like_count: like_count + 1,
      },
    },
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
    `,
  })
}

function unlikeMutation(
  { _id, id, viewer_does_like, like_count },
  environment,
) {
  const variables = {
    input: {
      id: _id,
    },
  }

  const optimisticResponse = {
    unlikeDiscussion: {
      discussion: {
        _id,
        id,
        viewer_does_like: !viewer_does_like,
        like_count: like_count - 1,
      },
    },
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
    `,
  })
}

function DiscussionLike({
  loggedIn,
  relay,
  style,
  size,
  hideCount,
  discussion,
  stacked,
  navigation,
}) {
  const { viewer_does_like, like_count } = discussion
  const { colors } = useTheme()

  const toggleLike = useCallback(() => {
    if (!loggedIn) {
      getNavigation(navigation).openLogin()
      return
    }

    const { environment } = relay
    viewer_does_like
      ? unlikeMutation(discussion, environment)
      : likeMutation(discussion, environment)
  }, [loggedIn, discussion, navigation, relay, viewer_does_like])

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: stacked ? 'column' : 'row',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
        },
        style,
      ]}
      onPress={toggleLike}>
      <Icon
        name={viewer_does_like ? 'md-heart' : 'md-heart-empty'}
        style={excerptStyles.controlIcon}
        size={size || 23}
        color={colors.text}
      />
      {hideCount ? null : (
        <Text
          style={{
            marginLeft: stacked ? 0 : 7,
            fontSize: 15,
            color: colors.text,
          }}>
          {like_count}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default createFragmentContainer(
  withNavigation(connect(mapStateToProps)(DiscussionLike)),
  {
    discussion: graphql`
      fragment DiscussionLike_discussion on Discussion {
        id
        _id
        viewer_does_like
        like_count
      }
    `,
  },
)
