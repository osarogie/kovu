import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  ViewPropTypes,
  TouchableHighlight
} from 'react-native'
import styles from '../styles'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import Markdown from 'react-native-simple-markdown'
import { withNavigation } from 'react-navigation'

// @withNavigation
class PostListItem extends React.Component {
  openProfile() {
    const { navigation, discussion } = this.props
    navigation.navigate('Profile', { id: discussion.user.id })
  }

  openDiscussion() {
    const { navigation, discussion } = this.props
    navigation.navigate('Discussion', { id: discussion.id })
  }

  openCollection() {
    const { navigation, discussion } = this.props
    navigation.navigate('Collection', { id: discussion.group.id })
  }

  renderFeaturePhoto() {
    const image = this.props.discussion.feature_photo

    if (image) {
      const { height, width } = this.props.feature_photo
      // alert(image.url)
      return (
        <View style={[styles.featurePhotoWarp, { height, width }]}>
          <Image
            source={{ uri: `http://${image.url}` }}
            style={{
              borderRadius: 5,
              height,
              width
            }}
          />
        </View>
      )
    } else {
      return null
    }
  }

  renderGroupInfo() {
    const { navigation, discussion, showGroupInfo } = this.props

    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableHighlight
          underlayColor="whitesmoke"
          onPress={this.openCollection.bind(this)}
        >
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text>In </Text>
            <Text style={{ color: '#05f' }}>
              {discussion.group.name}
            </Text>
          </View>
        </TouchableHighlight>
      )
    } else {
      return null
    }
  }

  renderProfilePicture() {
    const { navigation, discussion } = this.props

    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={this.openProfile.bind(this)}
      >
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: '#eee',
            borderRadius: 5
          }}
          onPress={this.openProfile.bind(this)}
        >
          <Image
            source={{ uri: `http://${discussion.user.profile_picture}` }}
            style={{ height: 40, width: 40, borderRadius: 5 }}
          />
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { discussion, onPress } = this.props

    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={this.openDiscussion.bind(this)}
      >
        <View style={styles.discussionContainer}>
          {this.renderGroupInfo()}
          <View style={{ flexDirection: 'row' }}>
            {this.renderProfilePicture()}
            <View style={{ marginLeft: 20 }}>
              <Text>
                {discussion.user.name}
              </Text>
              <Text style={styles.title}>
                {discussion.name}
              </Text>
            </View>
          </View>
          {this.renderFeaturePhoto()}
          <Markdown
            styles={{
              text: {
                color: '#000',
                lineHeight: 25,
                textAlign: 'justify'
              }
            }}
          >
            {discussion.excerpt}
            {discussion.word_count > 30 ? '***...(Read More)***' : ''}
          </Markdown>
        </View>
      </TouchableHighlight>
    )
  }
}

PostListItem.defaultProps = {}

PostListItem.propTypes = {
  ...ViewPropTypes
}

export default createFragmentContainer(
  PostListItem,
  graphql`
    fragment PostListItem_discussion on Discussion {
      id
      name
      excerpt(size: 30)
      word_count
      user {
        id
        name
        profile_picture(size: 50)
      }
      group {
        name
        permalink
      }
      feature_photo {
        id
        url(size: "1000x960")
        height
        width
      }
    }
  `
  // {
  //   direction: 'forward',
  //   getConnectionFromProps(props) {
  //     return props.list && props.list.discussions
  //   },
  //   getFragmentVariables(prevVars, totalCount) {
  //     return {
  //       ...prevVars,
  //       count: totalCount
  //     }
  //   },
  //   getVariables(
  //     props,
  //     { count, cursor, feature_photo_size },
  //     fragmentVariables
  //   ) {
  //     return {
  //       count,
  //       cursor,
  //       itemProps: props.itemProps
  //     }
  //   },
  //   variables: { cursor: null, feature_photo_size: '' }
  // }
)
