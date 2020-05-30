import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import ActivityButton from '../components/ActivityButton'
import { connect } from 'react-redux'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import { navHelper } from '../helpers/getNavigation'
import { withNavigation } from '../navigation/withNavigation'
import { Button, Text, withTheme } from 'react-native-paper'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  loggedIn: state.user.loggedIn,
})

function followMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id,
    },
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
    ...config,
  })
}

function unfollowMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id,
    },
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
    ...config,
  })
}

// @withNavigation
class FollowButton extends React.Component {
  state = { isLoading: false }
  toggleFollow = () => {
    if (!this.props.loggedIn) {
      navHelper(this).openLogin()
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
          },
        })
      : followMutation(user, environment, {
          onCompleted: _ => {
            this.setState({ isLoading: false })
          },
          onError: _ => {
            this.setState({ isLoading: false })
          },
        })
  }
  renderIcon() {
    const { viewer_follows } = this.props.user
    return (
      <Icon
        name={viewer_follows ? 'user-check' : 'user-plus'}
        size={18}
        color={
          viewer_follows
            ? this.props.theme.colors.background
            : this.props.theme.colors.primary
        }
      />
    )
  }
  render() {
    const { icon, style } = this.props
    const { viewer_follows, follows_viewer } = this.props.user
    const title = viewer_follows
      ? 'Following'
      : follows_viewer
      ? 'Follow Back'
      : 'Follow'
    return (
      <Button
        mode={viewer_follows ? 'contained' : 'outlined'}
        onPress={this.toggleFollow}
        {...this.props}
        style={[
          {
            height: 40,
          },
          style,
        ]}
        contentStyle={{ height: 40, paddingHorizontal: 10 }}
        loading={this.state.isLoading}
        disabled={this.state.isLoading}
        icon={icon ? this.renderIcon() : null}>
        {icon ? this.renderIcon() : title}
      </Button>
    )
  }
}

export default createFragmentContainer(
  withNavigation(connect(mapStateToProps)(withTheme(FollowButton))),
  {
    user: graphql`
      fragment FollowButton_user on User {
        _id
        viewer_follows
        follows_viewer
      }
    `,
  },
)
