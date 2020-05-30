// @flow

import React, { useMemo } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  Share,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import Toolbar from '../components/Toolbar'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import DiscussionLike from '../fragments/DiscussionLike'
import { graphql, createFragmentContainer } from 'react-relay'
import QueryRendererProxy from './QueryRendererProxy'
import Avatar from '../components/Avatar'
import { getTimeAgo, getCommentCount, imageUrl } from '../utils'
import { useTheme, Text } from 'react-native-paper'
import { useViewer } from '../providers/SessionProvider'
import { readingTime } from '../utils/readingTime'

const { width } = Dimensions.get('window')

function Post(props) {
  const { discussion, openLogin } = props
  const { feature_photo, comment_count } = discussion

  const { colors } = useTheme()
  const current_user = useViewer()
  const clickableProps = {
    underlayColor: colors.separator,
    style: { backgroundColor: colors.background },
  }

  const cultureNameProps = {
    style: { color: colors.text },
  }

  const containerStyles = [
    styles.container,
    { backgroundColor: colors.background, elevation: 2, paddingBottom: 20 },
  ]

  const openWrite = () =>
    props.openWrite({
      id: discussion._id,
      editing_mode: true,
    })
  const openComments = () => props.openComments(discussion)
  const openProfile = () => props.openProfile(discussion.user)
  const openCulture = () => props.openCulture(discussion.group)

  const renderFeaturePhoto = () => {
    if (feature_photo) {
      const height = (feature_photo.height / feature_photo.width) * width

      const widthPixels = Math.min(
        800,
        PixelRatio.getPixelSizeForLayoutSize(width),
      )

      const heightPixels = Math.min(
        800,
        PixelRatio.getPixelSizeForLayoutSize(height),
      )
      return (
        <View style={{ backgroundColor: colors.separator }}>
          <Image
            source={{
              uri: imageUrl(
                feature_photo.name,
                `${widthPixels}x${heightPixels}`,
              ),
            }}
            style={{ width, height }}
          />
        </View>
      )
    } else return null
  }

  const renderGroupInfo = () => {
    if (discussion.group) {
      return (
        <TouchableOpacity {...clickableProps} onPress={openCulture}>
          <Text
            style={[
              excerptStyles.groupInfo,
              {
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 8,
                paddingTop: 8,
                // backgroundColor: '#eee',
                fontStyle: 'italic',
              },
            ]}>
            <Text>Posted in </Text>
            <Text {...cultureNameProps}>{discussion.group.name}</Text>
            <Text> culture</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  const renderUserInfo = () => {
    return (
      <TouchableOpacity {...clickableProps} onPress={openProfile}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Avatar
            width={40}
            rounded
            source={discussion.user}
            title={discussion.user.name}
            onPress={openProfile}
            activeOpacity={0.7}
          />
          <View style={{ marginStart: 20, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>
              {discussion.user.name}
            </Text>
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 13 }}>
              {discussion.user.bio}
            </Text>
            <Text
              numberOfLines={1}
              style={{ flex: 1, fontSize: 12, fontStyle: 'italic' }}>
              {getTimeAgo(discussion.created_at)}
              &nbsp;&nbsp;&bull;&nbsp;&nbsp;
              {readingTime(discussion.body).text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderEdit = () => {
    if (current_user?._id === discussion.user._id) {
      return (
        <TouchableOpacity {...clickableProps} onPress={openWrite}>
          <Text style={{ marginLeft: 20 }}>Edit</Text>
        </TouchableOpacity>
      )
    }

    return null
  }

  const renderToolbar = () => {
    const title = 'Story'
    // const subtitle =
    //   (discussion && { subtitle: `by ${discussion.user.name}` }) || {}

    return (
      <Toolbar
        title={title}
        actions={toolbarActions()}
        onActionSelected={_onActionSelected.bind(this)}
        navIconName="md-arrow-back"
      />
    )
  }

  const toolbarActions = () => {
    return [
      {
        title: 'Share',
        show: 'always',
        iconName: 'md-share',
      },
      // { title: 'Notifications', show: 'always', iconName: 'ios-notifications' },
      // { title: 'View Profile', show: 'always', iconName: 'ios-person' }
    ]
  }

  const _onActionSelected = position => {
    switch (position) {
      case 0:
        const message = `Read "${discussion.name}" on TheCommunity - ${
          discussion.public_url
        } by ${discussion.user.name}`
        Share.share(
          { title: discussion.name, message },
          { dialogTitle: 'Share Story' },
        )
        break
      default:
        return
    }
  }

  const renderControls = () => {
    const comment_count_ = getCommentCount(comment_count)

    return (
      <View
        style={[
          styles.row,
          {
            alignItems: 'center',
            paddingRight: 20,
            paddingLeft: 20,
          },
        ]}
        key={`post.c.viewholder.${discussion.id}`}>
        <DiscussionLike discussion={discussion} openLogin={openLogin} />
        <View style={styles.fillRow} />
        {renderEdit()}
        <TouchableOpacity {...clickableProps} onPress={openComments}>
          <Text style={{ marginLeft: 20 }}>
            {`${comment_count_} Contribution${comment_count === 1 ? '' : 's'}`}
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

  const renderCommentBox = () => {
    return (
      <TouchableHighlight
        {...clickableProps}
        onPress={openComments}
        style={{
          elevation: 2,
          margin: 20,
          backgroundColor: colors.background,
          padding: 20,
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            width={40}
            rounded
            source={current_user}
            title={current_user?.name}
            activeOpacity={0.7}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: colors.text,
              marginLeft: 20,
            }}>
            Leave a comment
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <ScrollView>
      <View>
        {renderToolbar()}
        <View style={containerStyles}>
          {renderGroupInfo()}
          {renderUserInfo()}
          <Text
            style={[
              styles.title,
              { margin: 20, fontSize: 36, color: colors.text },
            ]}>
            {discussion.name}
          </Text>
          {renderFeaturePhoto()}
          <View style={{ padding: 20 }}>
            <HTMLView
              value={discussion.parsed_body}
              stylesheet={htmlStyles}
              selectable={true}
              textComponentProps={{
                selectable: true,
                style: { color: colors.text, lineHeight: 30, fontSize: 19 },
              }}
            />
          </View>
          {renderControls()}
        </View>
        {renderCommentBox()}
      </View>
    </ScrollView>
  )
}

// PostFragmentContainer
const PostFragmentContainer = createFragmentContainer(Post, {
  discussion: graphql`
    fragment Post_discussion on Discussion {
      id
      _id
      name
      body
      created_at
      ...DiscussionLike_discussion
      comment_count
      feature_photo {
        url
        name
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
  `,
})

export default ({ id, ...props }) => {
  return (
    <QueryRendererProxy
      query={graphql`
        query PostQuery($id: ID!) {
          discussion(id: $id) {
            ...Post_discussion
          }
        }
      `}
      variables={{ id }}
      render={data => (
        <PostFragmentContainer
          id={id}
          discussion={data.props.discussion}
          {...props}
        />
      )}
    />
  )
}
const codeStyle = {
  fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  backgroundColor: '#eee',
  // padding: 2,
  // borderRadius: 3,
  // flex: 1
}
const htmlStyles = StyleSheet.create({
  pre: codeStyle,
  code: codeStyle,
  a: {
    color: '#05f',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
})
