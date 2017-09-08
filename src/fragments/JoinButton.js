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

function joinMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id
    }
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation JoinButtonJoinGroupMutation($input: JoinGroupInput!) {
        joinGroup(input: $input) {
          group {
            ...JoinButton_group
          }
        }
      }
    `,
    ...config
  })
}

function leaveMutation({ _id }, environment, config) {
  const variables = {
    input: {
      id: _id
    }
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation JoinButtonLeaveGroupMutation($input: LeaveGroupInput!) {
        leaveGroup(input: $input) {
          group {
            ...JoinButton_group
          }
        }
      }
    `,
    ...config
  })
}

class JoinButton extends React.Component {
  state = { isLoading: false }
  constructor(props) {
    super(props)
    this.toggleJoin = this.toggleJoin.bind(this)
  }
  toggleJoin() {
    if (!this.props.loggedIn) {
      this.props.openLogin()
      return
    }

    this.setState({ isLoading: true })

    const { group } = this.props
    const { environment } = this.props.relay
    const { viewer_is_a_member } = group
    viewer_is_a_member
      ? leaveMutation(group, environment, {
          onCompleted: _ => {
            this.setState({ isLoading: false })
          }
        })
      : joinMutation(group, environment, {
          onCompleted: _ => {
            this.setState({ isLoading: false })
          }
        })
  }
  render() {
    const { viewer_is_a_member, is_private } = this.props.group
    const color = viewer_is_a_member ? '#fff' : '#05f'
    const backgroundColor = viewer_is_a_member ? '#05f' : '#fff'
    title = viewer_is_a_member
      ? 'Joined'
      : is_private ? 'Private Culture' : 'Join'
    return (
      <ActivityButton
        onPress={this.toggleJoin}
        disabled={is_private}
        indicatorColor={color}
        title={title}
        {...this.props}
        textStyle={{ color, ...this.props.textStyle }}
        buttonStyle={{
          backgroundColor,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#05f',
          ...this.props.buttonStyle
        }}
        isLoading={this.state.isLoading}
      />
    )
  }
}

export default createFragmentContainer(
  connect(mapStateToProps)(JoinButton),
  graphql`
    fragment JoinButton_group on Group {
      _id
      viewer_is_a_member
      is_private
    }
  `
)
