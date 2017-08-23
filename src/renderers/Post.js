// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Markdown from 'react-native-simple-markdown'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'

import { graphql, createFragmentContainer } from 'react-relay'
import QueryRendererProxy from './QueryRendererProxy'

class Post extends Component<void, Props, any> {
  clickableProps = {
    underlayColor: 'whitesmoke',
    style: { backgroundColor: '#fff' }
  }

  collectionNameProps = {
    style: { color: '#000' }
  }

  containerStyles = [styles.container, { backgroundColor: '#fff' }]

  renderFeaturePhoto() {
    const { feature_photo } = this.props.data.discussion
    if (feature_photo) {
      const { width } = Dimensions.get('window')
      const height = feature_photo.height / feature_photo.width * width

      return (
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: `https://${feature_photo.url}` }}
            style={{ width, height }}
          />
        </View>
      )
    } else return null
  }

  renderProfilePicture({ data: { discussion } }) {
    return (
      <View style={excerptStyles.profilePicture}>
        <Image
          source={{ uri: `https://${discussion.user.profile_picture}` }}
          style={excerptStyles.profilePicture}
        />
      </View>
    )
  }

  renderGroupInfo() {
    const { openCollection, data: { discussion } } = this.props
    if (discussion.group) {
      return (
        <TouchableOpacity
          {...this.clickableProps}
          onPress={_ => openCollection(discussion.group)}
        >
          <Text
            style={[
              excerptStyles.groupInfo,
              {
                padding: 20,
                paddingBottom: 8,
                backgroundColor: '#eee',
                fontStyle: 'italic'
              }
            ]}
          >
            <Text>Posted in </Text>
            <Text {...this.collectionNameProps}>
              {discussion.group.name}
            </Text>
            <Text> collection</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  renderUserInfo() {
    const { data: { discussion }, openProfile } = this.props
    console.log(this.props)
    return (
      <TouchableOpacity
        {...this.clickableProps}
        onPress={_ => openProfile(discussion.user)}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          {this.renderProfilePicture(this.props)}
          <View style={{ marginLeft: 20, marginRight: 20, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>
              {discussion.user.name}
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              {discussion.user.bio}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { discussion } = this.props.data

    return (
      <ScrollView>
        <View style={this.containerStyles}>
          {this.renderGroupInfo()}
          {this.renderUserInfo()}
          <Text style={[styles.title, { margin: 20 }]}>
            {discussion.name}
          </Text>
          {this.renderFeaturePhoto()}
          <Markdown styles={markdownStyles}>
            {discussion.body}
          </Markdown>
        </View>
      </ScrollView>
    )
  }
}

// PostFragmentContainer
const PostFragmentContainer = createFragmentContainer(
  Post,
  graphql`
    fragment Post on Query {
      discussion(id: $id) {
        id
        _id
        name
        body
        feature_photo {
          url
          height
          width
        }
        group {
          _id
          id
          name
          permalink
        }
        user {
          id
          username
          name
          profile_picture(size: 50)
          bio
        }
      }
    }
  `
)

export default (PostQueryRenderer = ({ id }) => {
  console.log(id)
  return (
    <QueryRendererProxy
      query={graphql`
        query PostQuery($id: ID!) {
          ...Post
        }
      `}
      variables={{ id }}
      render={({ error, props, retry }) =>
        <PostFragmentContainer data={props} />}
    />
  )
})
const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    color: 'purple'
  },
  link: {
    color: 'pink'
  },
  view: {
    paddingRight: 20,
    paddingLeft: 20
  },
  mailTo: {
    color: 'orange'
  },
  text: {
    color: '#000',
    lineHeight: 25,
    textAlign: 'justify'
  }
})
