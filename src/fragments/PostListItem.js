import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  // ViewPropTypes,
  Dimensions,
  TouchableHighlight,
  PixelRatio,
  TouchableOpacity,
  useColorScheme,
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
import CommentListItem from './CommentListItem'
import { useTheme, Text, Subheading, Caption } from 'react-native-paper'

const featurePhotoStyles = {
  // backgroundColor: '#eee',
  borderRadius: 5,
  marginTop: 10,
  marginStart: 10,
}

function PostListItem({
  discussion,
  showGroupInfo,
  current_user = {},
  openLogin,
  ...props
}) {
  const {
    comments,
    excerpt,
    word_count,
    user,
    comment_count,
    name,
  } = discussion

  const { colors } = useTheme()
  const comment_count_ = getCommentCount(comment_count)
  const openProfile = () => props.openProfile(discussion.user)
  const openDiscussion = () => props.openDiscussion(discussion)
  const openComments = () => props.openComments(discussion)
  const openCulture = () => props.openCulture(discussion.group)
  const openWrite = () =>
    props.openWrite({ id: discussion._id, editing_mode: true })

  const renderFeaturePhoto = () => {
    const image = discussion.feature_photo

    if (image) {
      const height = 100
      const width = 100
      const f_width = Math.min(
        1000,
        PixelRatio.getPixelSizeForLayoutSize(width),
      )
      // const f_height = PixelRatio.getPixelSizeForLayoutSize(height)
      const uri = imageUrl(image.name, `${f_width}x1000`)

      return (
        <View
          style={[
            featurePhotoStyles,
            { height, width, backgroundColor: colors.separator },
          ]}>
          <Image
            source={{ uri }}
            resizeMethod="resize"
            style={{
              borderRadius: 5,
              height,
              width,
              backgroundColor: colors.separator,
            }}
          />
        </View>
      )
    } else {
      return null
    }
  }

  const renderCultureName = () => {
    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableOpacity
          underlayColor={colors.separator}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={openCulture}>
          <Text
            style={[excerptStyles.groupInfo, excerptStyles.meta]}
            numberOfLines={1}>
            <Text> in </Text>
            <Text style={{ color: colors.secondary }}>
              {discussion.group.name}
            </Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  const renderMeta = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          width={40}
          rounded
          source={user}
          title={user.name}
          onPress={openProfile}
          activeOpacity={0.7}
        />
        <View style={{ marginStart: 15, flex: 1 }}>
          <TouchableOpacity
            underlayColor={colors.separator}
            onPress={openProfile}>
            <Text
              style={[styles.fill, { color: colors.text }]}
              numberOfLines={1}>
              {discussion.user.name}
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={excerptStyles.meta}>
              {getTimeAgo(discussion.created_at)}
            </Text>
            {renderCultureName()}
          </View>
        </View>
      </View>
    )
  }

  const renderEdit = () => {
    if (current_user._id == discussion.user._id) {
      return (
        <TouchableOpacity underlayColor={colors.separator} onPress={openWrite}>
          <Text style={{ marginLeft: 20 }}>Edit</Text>
        </TouchableOpacity>
      )
    }

    return null
  }

  const renderControls = () => {
    return [
      // <Separator
      //   styles={{ marginTop: 13 }}
      //   key={`post.c.separator.${discussion.id}`}
      // />,
      <View
        style={[styles.row, { alignItems: 'center', marginTop: 10 }]}
        key={`post.c.viewholder.${discussion.id}`}>
        {/* <DiscussionLike discussion={discussion} openLogin={openLogin} /> */}
        <View style={styles.fillRow} />
        {renderEdit()}
        <TouchableOpacity
          underlayColor={colors.separator}
          onPress={openComments}>
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
      </View>,
    ]
  }

  const render2 = () => {
    return (
      <View>
        <TouchableHighlight
          underlayColor={colors.separator}
          style={{
            backgroundColor: colors.background,
            // elevation: 2,
            borderBottomColor: colors.separator,
            borderBottomWidth: 1,
            paddingBottom: 15,
            marginTop: 2,
          }}
          onPress={openDiscussion}>
          <View style={[excerptStyles.container, { marginBottom: 0 }]}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Avatar
                width={40}
                radius={5}
                source={user}
                title={user.name}
                onPress={openProfile}
                activeOpacity={0.7}
              />
              <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                {renderMeta()}
              </View>
            </View>
            <Text style={excerptStyles.title}>{name}</Text>
            {renderFeaturePhoto()}
            {/* <Markdown styles={excerptStyles.body}> */}
            <Text>
              {excerpt}
              {word_count > 20 ? '...' : ''}
              {/* </Markdown> */}
              {/* {renderControls()} */}
            </Text>
          </View>
        </TouchableHighlight>
        {/* <Separator /> */}
      </View>
    )
  }

  const renderComments = () => {
    return (
      <FlatList
        data={comments.edges}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <CommentListItem strip comment={item.node} />}
      />
    )
  }

  return (
    <View>
      <TouchableHighlight
        underlayColor={colors.separator}
        style={{
          backgroundColor: colors.background,
          // elevation: 2,
          borderBottomColor: colors.separator,
          borderBottomWidth: 1,
          paddingBottom: 15,
          paddingTop: 2,
        }}
        onPress={openDiscussion}>
        <View style={[excerptStyles.container, { marginBottom: 0 }]}>
          {renderMeta()}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={[excerptStyles.title, { color: colors.text }]}>
                {name.trimLeft()}
              </Text>
              <Subheading>
                {excerpt}
                {word_count > 20 ? '...' : ''}
              </Subheading>
            </View>
            {renderFeaturePhoto()}
          </View>
          {renderControls()}
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {/* <DiscussionLike
                  discussion={discussion}
                  stacked
                  size={20}
                  // style={{ marginTop: 10 }}
                /> */}
            <ShareButton
              title={discussion.name}
              url={discussion.public_url}
              message={`Read "${discussion.name}" on TheCommunity - ${
                discussion.public_url
              } by ${discussion.user.name}`}
              style={{ marginTop: 5 }}
            />
          </View>
          {/* {renderComments()} */}
        </View>
      </TouchableHighlight>
      {/* <Separator /> */}
    </View>
  )
}

export default createFragmentContainer(PostListItem, {
  discussion: graphql`
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
      # ...DiscussionLike_discussion
    }
  `,
})
