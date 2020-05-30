import React from 'react'
import {
  // ViewPropTypes,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  Switch,
  ScrollView,
} from 'react-native'
import QueryRendererProxy from './QueryRendererProxy'

import { createFragmentContainer, graphql } from 'react-relay'

import Bar from 'react-native-progress/Bar'
import createEnvironment from '../relay-environment'
import { connect } from 'react-redux'
import styles from '../styles'
import CreateGroupMutation from '../data/mutations/CreateGroupMutation'
import ActivityButton from '../components/ActivityButton'
import { TextInput, Text, Button } from 'react-native-paper'
import EditGroupMutation from '../data/mutations/EditGroupMutation'
import Toolbar from '../components/Toolbar'

const mapStateToProps = state => ({
  // night_mode: state.night_mode,
  api_key: state.user.api_key,
})

class StartCulture extends React.Component {
  state = { sending: false }
  new_id = null
  inputProps = {
    wrapperStyle: {
      marginBottom: 15,
    },
    style: {
      flex: 1,
      width: '100%',

      // height: 50,
      // opacity: 0.9,
      borderRadius: 0,

      backgroundColor: '#fff',
    },
    inputProps: {
      placeholderTextColor: '#333',
      underlineColorAndroid: '#000',
    },
    inputStyle: {
      color: '#000',
    },
  }
  bodyInputProps = {
    ...this.inputProps,
    inputProps: {
      ...this.inputProps.inputProps,
      multiline: true,
      onContentSizeChange: e =>
        this.setState({ inputSize: e.nativeEvent.contentSize.height }),
    },
  }

  notify(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  buttonProps = {
    buttonStyle: [styles.button, { margin: 20 }],
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',

      fontSize: 16,
    },
  }
  constructor(props) {
    super(props)

    console.log(props)

    if (props.group)
      this.state = {
        name: props.group.name,
        body: props.group.body,
        is_private: props.group.is_private,
        inputSize: 50,
      }

    this.save = this.save.bind(this)

    var config = {}
    if (props.api_key) {
      config = { headers: { Authorization: `Token token=${props.api_key}` } }
    }
    this.environment = createEnvironment(config)
  }
  save() {
    this.setState({ sending: true })

    const { name, body, is_private } = this.state

    if (name && body) {
      const inputs = { name, body, is_private }
      if (this.props.editing_mode) {
        EditGroupMutation.commit(
          this.environment,
          { id: this.props.id, ...inputs },
          {
            onCompleted: _ => {
              // this.props.openGroup({ _id: this.props.id })
            },
            onError: _ => {
              this.notify('Your blog could not be saved')
            },
            updater: store => {
              // const newGroup = store
              //   .getRootField('editGroup')
              //   .getLinkedRecord('group')
              //
              // this.new_id = newGroup.getValue('_id')
              this.props.goBack()
            },
          },
        )
      } else {
        CreateGroupMutation.commit(this.environment, inputs, {
          onCompleted: _ => {
            if (this.new_id) {
              this.props.openCulture({ _id: this.new_id })
            } else this.notify('Your blog could not be saved')
          },
          onError: _ => {
            this.notify('Your blog could not be saved')
          },
          updater: store => {
            const newGroup = store
              .getRootField('createGroup')
              .getLinkedRecord('group')

            this.new_id = newGroup.getValue('_id')
            this.props.goBack()
          },
        })
      }
    } else {
      this.setState({ sending: false })

      this.notify('Your blog needs a name and a description')
    }
  }
  renderToolbar() {
    const { editing_mode } = this.props
    const title = editing_mode ? 'Edit Blog' : 'Create Blog'
    // const subtitle = blog ? { subtitle: blog.name } : {}
    return <Toolbar title={title} navIconName="md-close" />
  }

  renderProgress() {
    if (this.state.sending) {
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
      <View style={{ flex: 1 }}>
        {this.renderToolbar()}
        <View>{this.renderProgress()}</View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 40 }}>
            <TextInput
              label="Blog Name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              style={{ marginBottom: 20 }}
              mode="outlined"
              onSubmitEditing={() => this._body.focus()}
            />
            <TextInput
              ref={component => (this._body = component)}
              label="Description"
              onChangeText={body => this.setState({ body })}
              value={this.state.body}
              style={{ marginBottom: 20 }}
              mode="outlined"
              multiline
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <Text style={{ marginRight: 10 }}>Private Blog?</Text>
              <Switch
                onValueChange={is_private => this.setState({ is_private })}
                value={this.state.is_private}
              />
            </View>
            <Button
              loading={this.state.isSaving}
              disabled={this.state.isSaving}
              contentStyle={{ height: 50 }}
              mode="contained"
              onPress={this.save}>
              Save
            </Button>
          </View>
        </ScrollView>
        <KeyboardAvoidingView />
      </View>
    )
  }
}

const ConnectedStartCulture = connect(mapStateToProps)(StartCulture)
// export default connect(mapStateToProps)(StartCulture)

const StartCultureFragmentContainer = createFragmentContainer(
  ConnectedStartCulture,
  {
    group: graphql`
      fragment StartCulture_group on Group {
        id
        _id
        name
        body
        is_private
      }
    `,
  },
)

export default props =>
  props.editing_mode ? (
    <QueryRendererProxy
      query={graphql`
        query StartCultureQuery($id: ID!) {
          group(id: $id) {
            ...StartCulture_group
          }
        }
      `}
      variables={{ id: props.id }}
      render={data => (
        <StartCultureFragmentContainer group={data.props.group} {...props} />
      )}
    />
  ) : (
    <ConnectedStartCulture {...props} />
  )
