import React from 'react'
import { connect } from 'react-redux'
import ActivityButton from './ActivityButton'
import {
  View,
  Text,
  ToastAndroid,
  // KeyboardAvoidingView
} from 'react-native'
import styles from '../styles'
import colors from '../colors'
import Avatar from './Avatar'
import CreateCommentMutation from '../data/mutations/CreateCommentMutation'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from '../navigation/withNavigation'
import { navHelper } from '../helpers/getNavigation'
import { TextInput } from 'react-native-paper'

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  user: state.user.user,
})
class CommentBox extends React.Component {
  state = { isSending: false }

  notify(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  sendReply = () => {
    this.setState({ isSending: true })
    const { body } = this.state
    const discussion_id = this.props.id
    console.log(this.props)

    if (this.props.loggedIn) {
      if (body) {
        CreateCommentMutation.commit(
          this.props.environment,
          {
            body,
            discussion_id,
            gid: this.props.gid,
          },
          {
            onCompleted: ({ editUser, ...props }) => {
              this.setState({ isSending: false, body: '' })
              this.notify('Your comment has been sent')
            },
            onError: _ => {
              this.setState({ isSending: false })
              this.notify('Your comment could not be sent')
            },
          },
        )
      } else {
        this.setState({ isSending: false })
        this.notify('Your post needs a body')
      }
    } else {
      this.setState({ isSending: false })

      navHelper(this).openLogin()
    }
  }

  render() {
    console.log(this.props)
    const { discussion, user } = this.props
    return (
      <View
        style={{
          flexDirection: 'row',
          elevation: 2,
          // flex: 1,
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          paddingTop: 10,
          // marginBottom: 20
          // padding: 20,
          // borderRadius: 8
        }}>
        <TextInput
          style={[styles.input, { fontSize: 17, flex: 1 }]}
          ref={c => (this.commentBox = c)}
          underlineColorAndroid="#05f"
          keyboardType={this.props.keyboardType}
          value={this.state.body}
          multiline={true}
          onChangeText={body => this.setState({ body })}
          placeholder="Write a reply"
        />
        <View>
          <View style={{ flex: 1 }} />
          <ActivityButton
            onPress={this.sendReply}
            indicatorColor="#05f"
            title="Send reply"
            textStyle={{ color: '#05f' }}
            icon={
              <Icon
                name="md-send"
                style={{ marginRight: 0 }}
                size={20}
                color={'#05f'}
              />
            }
            buttonStyle={{
              backgroundColor: '#fff',
              // borderRadius: 5,
              // borderWidth: 1,
              // borderColor: '#05f'
              width: 70,
              height: 40,
              paddingRight: 0,
            }}
            isLoading={this.state.isSending}
          />
        </View>
        {/* </View> */}
      </View>
      // </KeyboardAvoidingView>
    )
  }
}

export default withNavigation(connect(mapStateToProps)(CommentBox))
