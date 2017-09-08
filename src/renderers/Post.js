// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Share,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import Toolbar from '../components/Toolbar'
import Markdown from 'react-native-simple-markdown'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import CommentList from '../fragments/CommentList'
import DiscussionLike from '../fragments/DiscussionLike'
import {
  graphql,
  createFragmentContainer,
  createPaginationContainer
} from 'react-relay'
import QueryRendererProxy from './QueryRendererProxy'
import Avatar from '../components/Avatar'
import { getTimeAgo, getCommentCount } from '../utils'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  // loggedIn: state.user.loggedIn,
  current_user: state.user.user
})

class Post extends Component<void, Props, any> {
  clickableProps = {
    underlayColor: 'whitesmoke',
    style: { backgroundColor: '#fff' }
  }

  cultureNameProps = {
    style: { color: '#000' }
  }

  containerStyles = [
    styles.container,
    { backgroundColor: '#fff', elevation: 2, paddingBottom: 20 }
  ]

  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.openCulture = this.openCulture.bind(this)
    this.openComments = this.openComments.bind(this)
    this.openWrite = this.openWrite.bind(this)
  }

  openWrite = _ =>
    this.props.openWrite({
      id: this.props.data.discussion._id,
      editing_mode: true
    })
  openComments = _ => this.props.openComments(this.props.data.discussion)
  openProfile = _ => this.props.openProfile(this.props.data.discussion.user)
  openCulture = _ => this.props.openCulture(this.props.data.discussion.group)

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

  renderGroupInfo() {
    const { data: { discussion } } = this.props
    if (discussion.group) {
      return (
        <TouchableOpacity {...this.clickableProps} onPress={this.openCulture}>
          <Text
            style={[
              excerptStyles.groupInfo,
              {
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 8,
                paddingTop: 8,
                // backgroundColor: '#eee',
                fontStyle: 'italic'
              }
            ]}
          >
            <Text>Posted in </Text>
            <Text {...this.cultureNameProps}>{discussion.group.name}</Text>
            <Text> culture</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  renderUserInfo() {
    const { data: { discussion } } = this.props
    // console.log(this.props)
    return (
      <TouchableOpacity {...this.clickableProps} onPress={this.openProfile}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          <Avatar
            width={40}
            rounded
            source={discussion.user}
            title={discussion.user.name}
            onPress={this.openProfile}
            activeOpacity={0.7}
          />
          <View style={{ marginLeft: 20, marginRight: 20, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>
              {discussion.user.name}
            </Text>
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 13 }}>
              {discussion.user.bio}
            </Text>
            <Text
              numberOfLines={1}
              style={{ flex: 1, fontSize: 12, fontStyle: 'italic' }}
            >
              {getTimeAgo(discussion.created_at)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderEdit() {
    const { data: { discussion } } = this.props
    if (this.props.current_user._id == discussion.user._id) {
      return (
        <TouchableOpacity {...this.clickableProps} onPress={this.openWrite}>
          <Text style={{ marginLeft: 20 }}>Edit</Text>
        </TouchableOpacity>
      )
    }

    return null
  }

  renderToolbar() {
    // const { discussion } = this.props.navigation.state.params
    const title = 'Story'
    // const subtitle =
    //   (discussion && { subtitle: `by ${discussion.user.name}` }) || {}

    return (
      <Toolbar
        title={title}
        actions={this.toolbarActions()}
        onActionSelected={this._onActionSelected.bind(this)}
        navIconName="md-arrow-back"
      />
    )
  }

  toolbarActions() {
    return [
      {
        title: 'Share',
        show: 'always',
        iconName: 'md-share'
      }
      // { title: 'Notifications', show: 'always', iconName: 'ios-notifications' },
      // { title: 'View Profile', show: 'always', iconName: 'ios-person' }
    ]
  }

  _onActionSelected(position) {
    const { data: { discussion } } = this.props

    switch (position) {
      case 0:
        message = `Read "${discussion.name}" on TheCommunity - ${discussion.public_url}`
        Share.share(
          { title: discussion.name, message },
          { dialogTitle: 'Share Story' }
        )
        break
      default:
        return
    }
  }

  renderControls() {
    const { data: { discussion }, openLogin } = this.props
    const { comment_count } = discussion
    const comment_count_ = getCommentCount(comment_count)

    return (
      <View
        style={[
          styles.row,
          {
            alignItems: 'center',
            paddingRight: 20,
            paddingLeft: 20
          }
        ]}
        key={`post.c.viewholder.${discussion.id}`}
      >
        <DiscussionLike discussion={discussion} openLogin={openLogin} />
        <View style={styles.fillRow} />
        {this.renderEdit()}
        <TouchableOpacity {...this.clickableProps} onPress={this.openComments}>
          <Text style={{ marginLeft: 20 }}>
            {`${comment_count_} Contribution${comment_count == 1 ? '' : 's'}`}
          </Text>
        </TouchableOpacity>
        {/* <Icon
            name="md-more"
            style={excerptStyles.control}
            size={25}
            color="#777"
          /> */}
      </View>
    )
  }

  renderCommentBox() {
    const discussion = this.props.data.discussion
    return (
      <TouchableHighlight
        {...this.clickableProps}
        onPress={this.openComments}
        style={{
          elevation: 2,
          margin: 20,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 8
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar
            width={40}
            rounded
            source={this.props.current_user}
            title={this.props.current_user.name}
            activeOpacity={0.7}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#000',
              marginLeft: 20
            }}
          >
            Leave a comment
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { discussion } = this.props.data

    return (
      <ScrollView>
        <View>
          {this.renderToolbar()}
          <View style={this.containerStyles}>
            {this.renderGroupInfo()}
            {this.renderUserInfo()}
            <Text style={[styles.title, { margin: 20, fontSize: 25 }]}>
              {discussion.name}
            </Text>
            {this.renderFeaturePhoto()}
            {/* <Markdown styles={markdownStyles}>{discussion.body}</Markdown> */}
            <HTMLView
              value={discussion.parsed_body}
              // stylesheet={styles}
            />
            {this.renderControls()}
          </View>
          {this.renderCommentBox()}
        </View>
      </ScrollView>
    )
  }
}

// PostFragmentContainer
const PostFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(Post),
  graphql`
    fragment Post on Query {
      discussion(id: $id) {
        id
        _id
        name
        body
        created_at
        ...DiscussionLike_discussion
        comment_count
        feature_photo {
          url
          height
          width
        }
        public_url
        group {
          _id
          id
          name
          permalink
        }
        user {
          id
          _id
          username
          name
          profile_picture_name
          bio
        }
        parsed_body
      }
    }
  `
)

export default (PostQueryRenderer = ({ id, ...props }) => {
  return (
    <QueryRendererProxy
      query={graphql`
        query PostQuery($id: ID!) {
          ...Post
        }
      `}
      variables={{ id }}
      render={data => (
        <PostFragmentContainer id={id} data={data.props} {...props} />
      )}
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
