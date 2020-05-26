// @flow

import React, { useMemo, useCallback, useState } from 'react'
import {
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import Separator from '../components/Separator'
import Button from '../components/Button'
import PostList from '../fragments/PostList'
import JoinButton from '../fragments/JoinButton'
import UserList from '../fragments/UserList'
import styles from '../styles'
import Avatar from '../components/Avatar'
import QueryRendererProxy from './QueryRendererProxy'
import { imageUrl } from '../utils'
import {
  createFragmentContainer,
  createPaginationContainer,
  graphql,
} from 'react-relay'
import { connect } from 'react-redux'
import { useTheme } from '../providers/ThemeProvider'
import { Text } from 'react-native-paper'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user,
})

function Group({
  data,
  openProfile: openProfileFunc,
  openWrite: openWriteFunc,
  openStartCulture,
  openLogin,
  night_mode,
  current_user,
}) {
  const { colors } = useTheme()
  const [width, setWidth] = useState(0)
  const onLayout = useCallback(({ nativeEvent: { layout: { width } } }) => {
    setWidth(width)
  }, [])
  const { header_image, user, _id } = data
  const group = data

  const openProfile = useCallback(() => openProfileFunc(data.user), [
    data.user,
    openProfileFunc,
  ])
  const openWrite = useCallback(() => openWriteFunc({ culture: data }), [
    data,
    openWriteFunc,
  ])
  const openEditCulture = useCallback(
    () =>
      openStartCulture({
        id: data._id,
        editing_mode: true,
      }),
    [data._id, openStartCulture],
  )

  const renderFeaturePhoto = () => {
    if (header_image) {
      const height = width * 0.65
      var widthPixels = PixelRatio.getPixelSizeForLayoutSize(width)
      var heightPixels = PixelRatio.getPixelSizeForLayoutSize(height)
      if (widthPixels > 1000 || heightPixels > 1000) {
        widthPixels = 1000
        heightPixels = 1000
      }
      // console.log(imageUrl(header_image.name, `${widthPixels}x${heightPixels}`))
      return (
        <View
          style={{
            height,
            width,
            flex: 1,
            backgroundColor: '#eee',
          }}>
          <Image
            source={{
              uri: imageUrl(
                header_image.name,
                `${widthPixels}x${heightPixels}`,
              ),
            }}
            style={{
              height,
              width,
            }}
          />
        </View>
      )
    }
    return null
  }

  const renderUserInfo = () => {
    const { user } = data

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        onPress={openProfile}>
        <Text
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            flex: 1,
            fontStyle: 'italic',
          }}
          numberOfLines={1}>
          <Text> by </Text>
          <Text style={{ color: colors.text }}>{user.name}</Text>
        </Text>
      </TouchableOpacity>
    )
  }

  const renderOptions = () => {
    const group = data

    if (current_user._id === group.user._id) {
      return (
        <Button
          onPress={openEditCulture}
          title="Edit"
          textStyle={{ color: colors.primary }}
          buttonStyle={{
            backgroundColor: colors.background,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.primary,
          }}
        />
      )
    }

    return <JoinButton group={group} openLogin={openLogin} />
  }

  const renderWriteButton = () => {
    const group = data
    const backgroundColor = colors.background
    const color = colors.primary

    if (group.viewer_is_a_member) {
      return (
        <Button
          onPress={openWrite}
          title="Write Here"
          textStyle={{ color }}
          buttonStyle={{
            marginLeft: 10,
            backgroundColor,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: color,
          }}
        />
      )
    }

    return null
  }

  return (
    <View onLayout={onLayout}>
      {renderFeaturePhoto()}
      <View
        style={{
          padding: 30,
          flexDirection: 'row',
          backgroundColor: colors.background,
        }}>
        <View style={{ marginRight: 20, flex: 1 }}>
          <Text
            style={{
              marginRight: 10,
              marginTop: 10,
              color: colors.text,
              fontWeight: 'bold',
              flex: 1,
              fontSize: 18,
            }}>
            {group.name}
          </Text>
          {renderUserInfo()}
          <Text
            style={{
              marginBottom: 20,
              marginTop: 10,
              color: colors.text,
              flex: 1,
              fontSize: 17,
            }}>
            {group.body}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {renderOptions()}
            {renderWriteButton()}
          </View>
        </View>
        <Avatar
          medium
          rounded
          source={group.user}
          onPress={openProfile}
          title={group.user.name}
          activeOpacity={0.7}
        />
      </View>
    </View>
  )
}

// GroupFragmentContainer
const GroupFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(Group),
  graphql`
    fragment Group on Group {
      id
      _id
      name
      permalink
      body
      viewer_is_a_member
      ...JoinButton_group
      header_image {
        name
        height
        width
      }
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
    }
  `,
)

export default ({ id, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query GroupQuery($count: Int!, $cursor: String, $id: ID!) {
          group(id: $id) {
            ...Group
            ...Group_discussionList
            ...Group_userList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry }) => (
        <GroupPostsPaginationContainer
          id={id}
          discussionList={props.group}
          itemProps={itemProps}
          renderHeader={() => (
            <View style={styles.container}>
              <GroupFragmentContainer data={props.group} {...itemProps} />
              <Separator />
              <GroupUsersPaginationContainer
                id={id}
                userList={props.group}
                renderHeader={renderUsersHeader}
                itemProps={{ showGroupInfo: false, ...itemProps }}
              />
            </View>
          )}
        />
      )}
    />
  )
}
const renderUsersHeader = () => (
  <View
    style={{
      flexDirection: 'row',
      marginTop: 17,
      marginLeft: 20,
    }}>
    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Members</Text>
    {/* <Icon
      name="ios-arrow-forward"
      style={[styles.icon, { marginLeft: 10, marginTop: 2 }]}
      size={15}
      color={colors.get('black')}
    /> */}
  </View>
)
// PAGINATION CONTAINERS

const GroupPostsPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Group_discussionList on Group {
        discussions(first: $count, after: $cursor)
          @connection(key: "Group_discussions") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...PostListItem_discussion
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.discussionList && props.discussionList.discussions
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor, id: props.id }
    },
    variables: { cursor: null },
    query: graphql`
      query GroupPostsPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        group(id: $id) {
          ...Group_discussionList
        }
      }
    `,
  },
)

const GroupUsersPaginationContainer = createPaginationContainer(
  UserList,
  {
    userList: graphql`
      fragment Group_userList on Group {
        users(first: $count, after: $cursor) @connection(key: "Group_users") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...UserListItem_user
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.userList && props.userList.users
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor, id: props.id }
    },
    variables: { cursor: null },
    query: graphql`
      query GroupUsersPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        group(id: $id) {
          ...Group_userList
        }
      }
    `,
  },
)
