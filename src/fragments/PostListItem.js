import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  // ViewPropTypes,
  Dimensions,
  TouchableHighlight,
  PixelRatio,
  TouchableOpacity
} from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { createFragmentContainer, graphql } from 'react-relay'
import Markdown from 'react-native-simple-markdown'
import { connect } from 'react-redux'
import Separator from '../components/Separator'
import ShareButton from '../components/ShareButton'
import Avatar from '../components/Avatar'
import DiscussionLike from '../fragments/DiscussionLike'
import { getTimeAgo, imageUrl, getCommentCount } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import { Subtitle, Caption } from '@shoutem/ui'
import CommentListItem from './CommentListItem'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user
})

class PostListItem extends React.PureComponent {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  cultureNameProps = {
    style: { color: '#05f' }
  }

  featurePhotoStyles = {
    ...excerptStyles.featurePhoto,
    backgroundColor: '#eee',
    marginTop: 10
  }

  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.openDiscussion = this.openDiscussion.bind(this)
    this.openProfile = this.openProfile.bind(this)
    this.openComments = this.openComments.bind(this)
    this.openCulture = this.openCulture.bind(this)
    this.openWrite = this.openWrite.bind(this)
  }

  openProfile = _ => this.props.openProfile(this.props.discussion.user)
  openDiscussion = _ => this.props.openDiscussion(this.props.discussion)
  openComments = _ => this.props.openComments(this.props.discussion)
  openCulture = _ => this.props.openCulture(this.props.discussion.group)
  openProfile = _ => this.props.openProfile(this.props.discussion.user)
  openWrite = _ =>
    this.props.openWrite({ id: this.props.discussion._id, editing_mode: true })

  renderFeaturePhoto() {
    const image = this.props.discussion.feature_photo

    if (image) {
      if (this.props.feature_photo) {
        const { height, width } = this.props.feature_photo
      } else {
        var { width } = Dimensions.get('window')
        var height = width / 3
        width -= 85
      }
      const f_width = Math.min(
        1000,
        PixelRatio.getPixelSizeForLayoutSize(width)
      )
      // const f_height = PixelRatio.getPixelSizeForLayoutSize(height)
      const uri = imageUrl(image.name, `${f_width}x1000`)

      return (
        <View style={[{ height, width }, this.featurePhotoStyles]}>
          <Image source={{ uri }} style={{ borderRadius: 5, height, width }} />
        </View>
      )
    } else {
      return null
    }
  }

  renderCultureName() {
    const { discussion, showGroupInfo } = this.props

    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableOpacity
          {...this.clickableProps}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={this.openCulture}
        >
          <Text
            style={[excerptStyles.groupInfo, excerptStyles.meta]}
            numberOfLines={1}
          >
            <Text> in </Text>
            <Text {...this.cultureNameProps}>{discussion.group.name}</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  renderMeta() {
    const { discussion } = this.props

    return [
      <TouchableOpacity
        {...this.clickableProps}
        onPress={this.openProfile}
        key={`post.m.t.${discussion.id}`}
      >
        <Text style={[styles.fill, { color: '#000' }]} numberOfLines={1}>
          {discussion.user.name}
        </Text>
      </TouchableOpacity>,
      <View style={styles.row} key={`post.m.v.${discussion.id}`}>
        <Text style={excerptStyles.meta}>
          {getTimeAgo(discussion.created_at)}
        </Text>
        {this.renderCultureName()}
      </View>
    ]
  }

  renderEdit() {
    const { discussion } = this.props
    if (this.props.current_user._id == discussion.user._id) {
      return (
        <TouchableOpacity {...this.clickableProps} onPress={this.openWrite}>
          <Text style={{ marginLeft: 20 }}>Edit</Text>
        </TouchableOpacity>
      )
    }

    return null
  }

  renderControls() {
    const { discussion, openLogin } = this.props
    const { comment_count } = discussion
    const comment_count_ = getCommentCount(comment_count)

    return [
      // <Separator
      //   styles={{ marginTop: 13 }}
      //   key={`post.c.separator.${discussion.id}`}
      // />,
      <View
        style={[styles.row, { alignItems: 'center', marginTop: 10 }]}
        key={`post.c.viewholder.${discussion.id}`}
      >
        {/* <DiscussionLike discussion={discussion} openLogin={openLogin} /> */}
        <View style={styles.fillRow} />
        {this.renderEdit()}
        <TouchableOpacity {...this.clickableProps} onPress={this.openComments}>
          <Caption style={{ marginLeft: 20 }}>
            {`${comment_count_} Contribution${comment_count == 1 ? '' : 's'}`}
          </Caption>
        </TouchableOpacity>
        {/* <Icon
            name="md-more"
            style={excerptStyles.control}
            size={25}
            color="#777"
          /> */}
      </View>
    ]
  }

  render2() {
    const { discussion } = this.props
    const { name, excerpt, word_count, user } = discussion
    // console.log(this.props);
    // console.log(discussion.created_at)
    return (
      <View>
        <TouchableHighlight
          {...this.clickableProps}
          style={{
            backgroundColor: '#fff',
            // elevation: 2,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            paddingBottom: 15,
            marginTop: 2
          }}
          onPress={this.openDiscussion}
        >
          <View style={[excerptStyles.container, { marginBottom: 0 }]}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Avatar
                width={40}
                radius={5}
                source={user}
                title={user.name}
                onPress={this.openProfile}
                activeOpacity={0.7}
              />
              <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                {this.renderMeta()}
              </View>
            </View>
            <Text style={excerptStyles.title}>{name}</Text>
            {this.renderFeaturePhoto()}
            {/* <Markdown styles={excerptStyles.body}> */}
            <Text>
              {excerpt}
              {word_count > 20 ? '...' : ''}
              {/* </Markdown> */}
              {/* {this.renderControls()} */}
            </Text>
          </View>
        </TouchableHighlight>
        {/* <Separator /> */}
      </View>
    )
  }

  renderComments() {
    const { discussion } = this.props
    const { comments } = discussion

    return (
      <FlatList
        data={comments.edges}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <CommentListItem strip comment={item.node} />}
      />
    )
  }

  render() {
    const { discussion } = this.props
    const { name, excerpt, word_count, user } = discussion
    // console.log(this.props);
    // console.log(discussion.created_at)
    return (
      <View>
        <TouchableHighlight
          {...this.clickableProps}
          style={{
            backgroundColor: '#fff',
            // elevation: 2,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            paddingBottom: 15,
            marginTop: 2
          }}
          onPress={this.openDiscussion}
        >
          <View style={[excerptStyles.container, { marginBottom: 0 }]}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <View style={{ alignItems: 'center' }}>
                <Avatar
                  width={40}
                  radius={5}
                  source={user}
                  title={user.name}
                  onPress={this.openProfile}
                  activeOpacity={0.7}
                />
                <DiscussionLike
                  discussion={discussion}
                  stacked
                  size={25}
                  // style={{ marginTop: 10 }}
                />
                <ShareButton
                  title={discussion.name}
                  url={discussion.public_url}
                  message={`Read "${discussion.name}" on TheCommunity - ${
                    discussion.public_url
                  } by ${discussion.user.name}`}
                  style={{ marginTop: 5 }}
                />
              </View>
              <View style={{ marginLeft: 15, flex: 1 }}>
                {this.renderMeta()}
                {this.renderFeaturePhoto()}
                <Text style={excerptStyles.title}>{name}</Text>
                {/* <Markdown styles={excerptStyles.body}> */}
                <Subtitle>
                  {excerpt}
                  {word_count > 20 ? '...' : ''}
                </Subtitle>
                {/* </Markdown> */}
                {this.renderControls()}
                {this.renderComments()}
              </View>
            </View>
          </View>
        </TouchableHighlight>
        {/* <Separator /> */}
      </View>
    )
  }
}

PostListItem.defaultProps = {}

PostListItem.propTypes = {
  // ...ViewPropTypes
}

export default createFragmentContainer(
  connect(mapStateToProps)(PostListItem),
  graphql`
    fragment PostListItem_discussion on Discussion {
      id
      _id
      name
      public_url
      excerpt(size: 20)
      word_count
      comment_count
      comments(by_latest: true, first: 3)
        @connection(key: "PostListItem_comments", filters: []) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            excerpt
            ...CommentListItem_comment
          }
        }
      }
      created_at
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
      group {
        id
        _id
        name
        permalink
      }
      feature_photo {
        id
        _id
        height
        width
        name
      }
      ...DiscussionLike_discussion
    }
  `
)
