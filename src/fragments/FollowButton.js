import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import excerptStyles from '../styles/excerptStyles'
import ActivityButton from '../components/ActivityButton'
import { connect } from 'react-redux'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.user.loggedIn
})

function followMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id
    }
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation FollowButtonFollowUserMutation($input: FollowUserInput!) {
        followUser(input: $input) {
          user {
            ...FollowButton_user
          }
        }
      }
    `,
    ...config
  })
}

function unfollowMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id
    }
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation FollowButtonUnfollowUserMutation($input: UnfollowUserInput!) {
        unfollowUser(input: $input) {
          user {
            ...FollowButton_user
          }
        }
      }
    `,
    ...config
  })
}

class FollowButton extends React.Component {
  state = { isLoading: false }
  constructor(props) {
    super(props)
    this.toggleFollow = this.toggleFollow.bind(this)
  }
  toggleFollow() {
    if (!this.props.loggedIn) {
      this.props.openLogin()
      return
    }
    this.setState({ isLoading: true })

    const { user } = this.props
    const { environment } = this.props.relay
    const { viewer_follows } = user
    viewer_follows
      ? unfollowMutation(user, environment, {
          onCompleted: _ => {
            this.setState({ isLoading: false })
          },
          onError: _ => {
            this.setState({ isLoading: false })
          }
        })
      : followMutation(user, environment, {
          onCompleted: _ => {
            this.setState({ isLoading: false })
          },
          onError: _ => {
            this.setState({ isLoading: false })
          }
        })
  }
  render() {
    const { viewer_follows, follows_viewer } = this.props.user
    const color = viewer_follows ? '#fff' : '#05f'
    const backgroundColor = viewer_follows ? '#05f' : '#fff'
    title = viewer_follows
      ? 'Following'
      : follows_viewer ? 'Follow Back' : 'Follow'
    return (
      <ActivityButton
        onPress={this.toggleFollow}
        indicatorColor={color}
        title={title}
        {...this.props}
        textStyle={{ color, ...this.props.textStyle }}
        buttonStyle={{
          backgroundColor,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: color,
          ...this.props.buttonStyle
        }}
        isLoading={this.state.isLoading}
      />
    )
  }
}

export default createFragmentContainer(
  connect(mapStateToProps)(FollowButton),
  graphql`
    fragment FollowButton_user on User {
      _id
      viewer_follows
      follows_viewer
    }
  `
)
