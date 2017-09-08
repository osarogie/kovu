// @flow

import React from 'react'
import { View, ScrollView, ToastAndroid } from 'react-native'
import { Bar } from 'react-native-progress'
import ActivityButton from '../components/ActivityButton'
import styles from '../styles'
import TextInput from '../components/TextInput'
import { setUser } from '../actions'
import QueryRendererProxy from './QueryRendererProxy'

import { createFragmentContainer, graphql, commitMutation } from 'react-relay'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user
})
function UpdateProfile(input, environment, config) {
  const variables = {
    input: input
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
    ...config
  })
}
class EditUser extends React.Component<void, Props, any> {
  inputProps = {
    wrapperStyle: {
      marginBottom: 15
    },
    style: {
      flex: 1,
      width: '100%',

      // height: 50,
      // opacity: 0.9,
      borderRadius: 0,

      backgroundColor: '#fff'
    },
    inputProps: {
      placeholderTextColor: '#333',
      underlineColorAndroid: '#000'
    },
    inputStyle: {
      color: '#000'
    }
  }
  bioInputProps = {
    ...this.inputProps,
    inputProps: {
      ...this.inputProps.inputProps,
      multiline: true,
      onContentSizeChange: e =>
        this.setState({ inputSize: e.nativeEvent.contentSize.height })
    },
    inputStyle: {
      height: 100,
      color: '#000'
    }
  }

  buttonProps = {
    buttonStyle: [styles.button, { marginTop: 20 }],
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16
    }
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
            _id: newProfile.getValue('_id')
          }
          this.props.dispatch(setUser(viewer))
        },
        onError: _ => {
          this.setState({ isSaving: false })
          this.notify('Profile update failed')
        }
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
    const { viewer, night_mode } = this.props
    // alert(PixelRatio.getPixelSizeForLayoutSize(75) + '')
    const backgroundColor = night_mode ? '#000' : '#fff'

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 2 }}>
          {this.renderProgress()}
        </View>
        <ScrollView
          style={{ flex: 1, backgroundColor }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ flex: 1, padding: 40, alignItems: 'center' }}>
            <TextInput
              {...this.inputProps}
              placeholder="Full name"
              onChangeText={name => this.setState({ name })}
              // androidIcon="text-format"
              sideText="Full Name"
              value={this.state.name}
              onSubmitEditing={() => this._username.focus()}
            />
            <TextInput
              {...this.inputProps}
              placeholder="Username"
              ref={component => (this._username = component)}
              // androidIcon="person"
              sideText="Username"
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              onSubmitEditing={() => this._bio.focus()}
            />
            <TextInput
              {...this.bioInputProps}
              inputStyle={{
                height: this.state.inputSize,
                color: '#000'
              }}
              style={{
                flex: 1,
                width: '100%',
                borderRadius: 0,
                backgroundColor: '#fff',
                height: this.state.inputSize
              }}
              placeholder="Bio"
              ref={component => (this._bio = component)}
              // androidIcon="person"

              sideText="Bio"
              onChangeText={bio => this.setState({ bio })}
              value={this.state.bio}
            />
            <ActivityButton
              {...this.buttonProps}
              title="Save"
              isLoading={this.state.isSaving}
              onPress={this.save}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

// EditUserFragmentContainer
const EditUserFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(EditUser),
  graphql`
    fragment EditUser_viewer on User {
      id
      _id
      name
      bio
      username
      profile_picture_name
    }
  `
)

export default (EditUserQueryRenderer = props =>
  <QueryRendererProxy
    query={graphql`
      query EditUserQuery {
        viewer {
          ...EditUser_viewer
        }
      }
    `}
    render={data =>
      <EditUserFragmentContainer viewer={data.props.viewer} {...props} />}
  />)
