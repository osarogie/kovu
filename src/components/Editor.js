import React from 'react'
import {
  ViewPropTypes,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native'
import QueryRendererProxy from '../renderers/QueryRendererProxy'

import { createFragmentContainer } from 'react-relay'

import { Bar } from 'react-native-progress'
import createEnvironment from '../../relay-environment'
import { connect } from 'react-redux'
import colors from '../colors'
import CreateDiscussionMutation from '../mutations/CreateDiscussionMutation'
import EditDiscussionMutation from '../mutations/EditDiscussionMutation'
// import CreateCommentMutation from '../mutations/CreateCommentMutation'
import {
  RichTextEditor,
  RichTextToolbar,
  actions
} from 'react-native-zss-rich-text-editor'
import Toolbar from './Toolbar'

const mapStateToProps = state => ({
  // night_mode: state.night_mode,
  api_key: state.user.api_key
})

class Editor extends React.Component {
  state = { sending: false }
  new_id = null
  constructor(props) {
    super(props)
    this.getEditor = this.getEditor.bind(this)
    this._onActionSelected = this._onActionSelected.bind(this)

    var config = {}
    if (props.api_key) {
      config = { headers: { Authorization: `Token token=${props.api_key}` } }
    }
    this.environment = createEnvironment(config)
  }

  componentDidMount() {
    this.richtext.focusTitle()
  }

  publish() {
    // if (this.props.is_comment === true) {
    //   this.publishComment()
    // } else {
    this.publishDiscussion()
    // }
  }

  notify(message) {
    this.setState({ sending: false })
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  async publishDiscussion() {
    this.setState({ sending: true })

    const name = await this.richtext.getTitleText()
    const body = await this.richtext.getContentHtml()

    if (name && body) {
      inputs = { name, body }
      if (this.props.culture) {
        inputs.group_id = this.props.culture._id
      }
      // this.setState({ sending: true })
      if (this.props.editing_mode) {
        EditDiscussionMutation.commit(
          this.environment,
          { id: this.props.id, ...inputs },
          {
            onCompleted: _ => {
              this.props.openDiscussion({ _id: this.props.id })
            },
            onError: _ => {
              this.notify('Your post could not be saved')
            },
            updater: store => {
              // const newDiscussion = store
              //   .getRootField('editDiscussion')
              //   .getLinkedRecord('discussion')
              //
              // this.new_id = newDiscussion.getValue('_id')
              this.props.goBack()
            }
          }
        )
      } else {
        CreateDiscussionMutation.commit(this.environment, inputs, {
          onCompleted: _ => {
            if (this.new_id) {
              this.props.openDiscussion({ _id: this.new_id })
            } else this.notify('Your post could not be published')
          },
          onError: _ => {
            this.notify('Your post could not be published')
          },
          updater: store => {
            const newDiscussion = store
              .getRootField('createDiscussion')
              .getLinkedRecord('discussion')

            this.new_id = newDiscussion.getValue('_id')
            this.props.goBack()
          }
        })
      }
    } else {
      this.setState({ sending: false })

      this.notify('Your post needs a title and a body')
    }
  }
  // async publishComment() {
  //   this.setState({ sending: true })
  //
  //   const body = await this.richtext.getContentHtml()
  //
  //   if (body) {
  //     inputs = { body }
  //     CreateCommentMutation.commit(this.environment, inputs, {
  //       onCompleted: _ => {
  //         // this.props.goBack()
  //         this.setState({ sending: false })
  //       },
  //       onError: _ => {
  //         this.notify('Your comment could not be sent')
  //       }
  //     })
  //   } else {
  //     this.setState({ sending: false })
  //
  //     this.notify('You cannot post an empty comment')
  //   }
  // }
  getEditor = _ => this.richtext

  renderToolbar() {
    const culture = this.props.culture
    const title = 'Write'
    // const subtitle = culture ? { subtitle: culture.name } : {}
    return (
      <Toolbar
        title={title}
        navIconName="md-close"
        // {...subtitle}
        actions={this.toolbarActions()}
        onActionSelected={this._onActionSelected}
      />
    )
  }
  renderCultureName() {
    const culture = this.props.culture
    if (culture) {
      return (
        <Text
          style={{
            // flex: 1,
            backgroundColor: '#f2f2f2',
            color: '#bbb',
            padding: 5,
            paddingLeft: 20
          }}
        >
          {'This will go in the culture '}
          <Text style={{ fontStyle: 'italic', color: '#05f' }}>
            {culture.name}
          </Text>
        </Text>
      )
    }

    return null
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
    // const contentPlaceholder = this.props.is_comment
    //   ? 'Your comment'
    //   : 'Your post'
    const { discussion } = this.props
    const initialTitleHTML = this.props.editing_mode ? discussion.name : ''
    const initialContentHTML = this.props.editing_mode
      ? discussion.parsed_body
      : ''
    const contentPlaceholder = 'Your post'
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.renderToolbar()}
        <View>
          {this.renderCultureName()}
          {this.renderProgress()}
        </View>
        <RichTextEditor
          ref={r => (this.richtext = r)}
          titlePlaceholder="Your title"
          contentPlaceholder={contentPlaceholder}
          initialTitleHTML={initialTitleHTML}
          initialContentHTML={initialContentHTML}
          style={{ marginTop: 0 }}
          contentInset={{ top: 20 }}
          customCSS={`
            body {
              padding-top: 30px;
            }

            [placeholder]:empty:before {
              content: attr(placeholder);
              color: #bbb;
            }

            * {
              box-sizing: border-box;
            }

            #separatorContainer {
              display: none;
            }
          `}
          // editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar
          getEditor={this.getEditor}
          unselectedButtonStyle={{ backgroundColor: 'transparent' }}
          style={{
            backgroundColor: '#f9f9f9',
            elevation: 20,
            borderTopWidth: 1,
            borderTopColor: '#ddd'
          }}
          iconTint="#000"
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink
          ]}
          selectedButtonStyle={{ backgroundColor: '#eee' }}
        />
        <KeyboardAvoidingView />
      </View>
    )
  }

  toolbarActions() {
    return [{ title: 'Publish', show: 'always' }]
  }

  _onActionSelected(position) {
    switch (position) {
      case 0:
        this.publish()
        // console.log(this.editor)
        break
      default:
        return
    }
  }
}

const ConnectedEditor = connect(mapStateToProps)(Editor)
// export default connect(mapStateToProps)(Editor)

const EditorFragmentContainer = createFragmentContainer(
  ConnectedEditor,
  graphql`
    fragment Editor_discussion on Discussion {
      id
      _id
      name
      body
      parsed_body
    }
  `
)

export default (EditorQueryRenderer = props =>
  props.editing_mode ? (
    <QueryRendererProxy
      query={graphql`
        query EditorQuery($id: ID!) {
          discussion(id: $id) {
            ...Editor_discussion
          }
        }
      `}
      variables={{ id: props.id }}
      render={data => (
        <EditorFragmentContainer
          discussion={data.props.discussion}
          {...props}
        />
      )}
    />
  ) : (
    <ConnectedEditor {...props} />
  ))
