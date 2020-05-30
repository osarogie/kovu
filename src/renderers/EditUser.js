// @flow

import React from 'react'
import { View, ScrollView, ToastAndroid } from 'react-native'
import Bar from 'react-native-progress/Bar'
import ActivityButton from '../components/ActivityButton'
import styles from '../styles'
import { TextInput, Button } from 'react-native-paper'
import { setUser } from '../actions'
import QueryRendererProxy from './QueryRendererProxy'

import { createFragmentContainer, graphql, commitMutation } from 'react-relay'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user,
})
function UpdateProfile(input, environment, config) {
  const variables = {
    input: input,
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation EditUserMutation($input: EditUserInput!) {
        editUser(input: $input) {
          user {
            ...EditUser_viewer
          }
          success
        }
      }
    `,
    ...config,
  })
}
class EditUser extends React.Component {
  inputProps = {
    wrapperStyle: {
      marginBottom: 15,
    },
  }
  bioInputProps = {
    ...this.inputProps,
    inputProps: {
      ...this.inputProps.inputProps,
      multiline: true,
      onContentSizeChange: e =>
        this.setState({ inputSize: e.nativeEvent.contentSize.height }),
    },
  }

  buttonProps = {
    buttonStyle: [styles.button, { marginTop: 20 }],
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
    },
  }

  // state = { name: '', bio: '', username: '' }

  constructor(props) {
    super(props)
    const { name, bio, username } = props.viewer
    this.state = { name, bio, username, inputSize: 50 }
    this.save = this.save.bind(this)
    // console.log(props)
  }
  notify(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
  save() {
    const { name, bio, username } = this.state

    if (name && username) {
      this.setState({ isSaving: true })
      UpdateProfile({ name, bio, username }, this.props.relay.environment, {
        onCompleted: ({ editUser, ...props }) => {
          this.setState({ isSaving: false })
          if (editUser && editUser.success) {
            this.props.goBack && this.props.goBack()
          } else {
            this.notify('Profile update failed')
          }
        },
        updater: store => {
          const newProfile = store
            .getRootField('editUser')
            .getLinkedRecord('user')
          const viewer = {
            name: newProfile.getValue('name'),
            username: newProfile.getValue('username'),
            profile_picture_name: newProfile.getValue('profile_picture_name'),
            id: newProfile.getValue('_id'),
            _id: newProfile.getValue('_id'),
          }
          this.props.dispatch(setUser(viewer))
        },
        onError: _ => {
          this.setState({ isSaving: false })
          this.notify('Profile update failed')
        },
      })
    } else {
      this.notify('Name and username are required')
    }
  }
  componentsDidReceiveProps(props) {
    const { name, bio, username } = props.users
    this.setState({ name, bio, username })
    // console.log({ name, bio, username })
  }
  renderProgress() {
    if (this.state.isSaving) {
      return (
        <Bar
          indeterminate
          width={null}
          height={2}
          borderRadius={0}
          color="#05f"
          borderWidth={0}
          animationType="decay"
        />
      )
    }

    return null
  }
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 40, flex: 1 }}>
          <TextInput
            style={{ marginBottom: 20 }}
            mode="outlined"
            placeholder="Full name"
            label="Full name"
            onChangeText={name => this.setState({ name })}
            sideText="Full Name"
            value={this.state.name}
            onSubmitEditing={() => this._username.focus()}
          />
          <TextInput
            style={{ marginBottom: 20 }}
            mode="outlined"
            placeholder="Username"
            label="Username"
            autoCapitalize="none"
            ref={component => (this._username = component)}
            sideText="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            onSubmitEditing={() => this._bio.focus()}
          />
          <TextInput
            style={{ marginBottom: 20 }}
            mode="outlined"
            placeholder="Bio"
            label="Bio"
            ref={component => (this._bio = component)}
            sideText="Bio"
            onChangeText={bio => this.setState({ bio })}
            value={this.state.bio}
          />
          <Button
            mode="contained"
            contentStyle={{ height: 50 }}
            loading={this.state.isSaving}
            disabled={this.state.isSaving}
            onPress={this.save}>
            Save
          </Button>
        </View>
      </ScrollView>
    )
  }
}

// EditUserFragmentContainer
const EditUserFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(EditUser),
  {
    viewer: graphql`
      fragment EditUser_viewer on User {
        id
        _id
        name
        bio
        username
        profile_picture_name
      }
    `,
  },
)

export default props => (
  <QueryRendererProxy
    query={graphql`
      query EditUserQuery {
        viewer {
          ...EditUser_viewer
        }
      }
    `}
    render={data => (
      <EditUserFragmentContainer viewer={data.props.viewer} {...props} />
    )}
  />
)
