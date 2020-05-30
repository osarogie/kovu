import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
// @flow

import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { VerticalUserList } from '../fragments/VerticalUserList'
import PostList from '../fragments/PostList'
import QueryRendererProxy from './QueryRendererProxy'
import { TabView, TabBar, TabBarIndicator } from 'react-native-tab-view'
import { createPaginationContainer, graphql } from 'react-relay'
import Icon from 'react-native-vector-icons/Feather'
import { WHITE } from '../ui'
import Animated from 'react-native-reanimated'
import { elevation } from '../styles/elevation'
import { withTheme } from 'react-native-paper'
import _ from 'lodash'
import { VerticalPaginationList } from '../relay/pagination/VerticalPaginationList'
import VerticalGroupListItem from '../fragments/VerticalGroupListItem'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

const DiscoverGroupsPaginationContainer = createPaginationContainer(
  VerticalPaginationList,
  {
    groupList: graphql`
      fragment Discover_groupList on Feed {
        groups(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_groups") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...GroupListItem_group
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.groupList && props.groupList.groups
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      // console.log(props)
      return {
        count,
        cursor,
        q: props.q,
      }
    },
    variables: { cursor: null, q: '' },
    query: graphql`
      query DiscoverGroupsPaginationQuery(
        $count: Int!
        $cursor: String
        $q: String
      ) {
        feed {
          ...Discover_groupList
        }
      }
    `,
  },
)

const DiscoverUsersPaginationContainer = createPaginationContainer(
  VerticalUserList,
  {
    userList: graphql`
      fragment Discover_userList on Feed {
        users(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_users") {
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
    getVariables(props, { count, cursor, size }, fragmentVariables) {
      return {
        count,
        cursor,
        q: props.q,
      }
    },
    variables: { cursor: null, size: '30x39' },
    query: graphql`
      query DiscoverUsersPaginationQuery(
        $count: Int!
        $cursor: String
        $q: String
      ) {
        feed {
          ...Discover_userList
        }
      }
    `,
  },
)

const DiscoverPostsPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Discover_discussionList on Feed {
        discussions(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_discussions") {
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
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        q: props.q,
      }
    },
    variables: { cursor: null },
    query: graphql`
      query DiscoverPostsPaginationQuery(
        $count: Int!
        $cursor: String
        $q: String
      ) {
        feed {
          ...Discover_discussionList
        }
      }
    `,
  },
)

class Cultures extends React.Component {
  shouldComponentUpdate = (p, s) => p.q !== this.props.q

  render() {
    const { q, ...props } = this.props
    return (
      <QueryRendererProxy
        query={graphql`
          query DiscoverCQuery($count: Int!, $cursor: String, $q: String) {
            feed {
              ...Discover_groupList
            }
          }
        `}
        variables={{ cursor: null, count: 10, q }}
        render={data => (
          <View style={{ flex: 1 }}>
            <DiscoverGroupsPaginationContainer
              // renderHeader={_ => renderCultureHeader(q)}
              propName="groupList"
              fieldName="groups"
              groupList={data.props.feed}
              q={q}
              numColumns={2}
              renderItem={({ item, itemProps }) => (
                <VerticalGroupListItem group={item.node} />
              )}
            />
          </View>
        )}
      />
    )
  }
}

class Users extends React.Component {
  shouldComponentUpdate = (p, s) => p.q !== this.props.q

  render() {
    const { q, ...props } = this.props
    return (
      <QueryRendererProxy
        query={graphql`
          query DiscoverUQuery($count: Int!, $cursor: String, $q: String) {
            feed {
              ...Discover_userList
            }
          }
        `}
        variables={{ cursor: null, count: 10, q }}
        render={data => (
          <View style={{ flex: 1 }}>
            <DiscoverUsersPaginationContainer
              // renderHeader={_ => renderUserHeader(q)}
              userList={data.props.feed}
              q={q}
              itemProps={{ ...props }}
            />
          </View>
        )}
      />
    )
  }
}

class Stories extends React.Component {
  shouldComponentUpdate = (p, s) => p.q !== this.props.q

  render() {
    const { q, ...props } = this.props

    if (!q)
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: this.props.theme.colors.background,
          }}>
          <Icon
            name="search"
            size={100}
            color={this.props.theme.colors.primary}
            style={{ marginBottom: 10 }}
          />
          <Text
            style={{ color: this.props.theme.colors.primary, fontSize: 20 }}>
            Use the search bar to find stories
          </Text>
        </View>
      )

    return (
      <QueryRendererProxy
        query={graphql`
          query DiscoverSQuery($count: Int!, $cursor: String, $q: String) {
            feed {
              ...Discover_discussionList
            }
          }
        `}
        variables={{ cursor: null, count: 10, q }}
        render={data => (
          <View style={{ flex: 1 }}>
            <DiscoverPostsPaginationContainer
              discussionList={data.props.feed}
              q={q}
              highlight
              itemProps={{ ...props }}
            />
          </View>
        )}
      />
    )
  }
}

Stories = withTheme(Stories)

export default class Discover extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'cultures', title: 'Blogs' },
      { key: 'users', title: 'People' },
      { key: 'stories', title: 'Stories' },
    ],
  }
  _handleIndexChange = index =>
    this.setState({
      index,
    })

  _renderScene = ({ route }) => {
    const { q, ...props } = this.props
    switch (route.key) {
      case 'cultures':
        return <Cultures q={q} {...props} />
      case 'stories':
        return <Stories q={q} {...props} />
      case 'users':
        return <Users q={q} {...props} />

      default:
        return null
    }
  }

  _renderHeader = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i)

    return (
      <TabBar
        {...props}
        onTabPress={this.onTabPress}
        // scrollEnabled
        bounces
        indicatorColor={this.props.theme.colors.text}
        indicatorStyle={{
          backgroundColor: this.props.theme.colors.text,
          height: 2,
        }}
        indicatorContainerStyle={{
          backgroundColor: this.props.theme.colors.separator,
        }}
        tabStyle={{
          backgroundColor: this.props.theme.colors.background,
          height: 48,
        }}
        style={{ height: 50 }}
        activeColor={this.props.theme.colors.text}
        inactiveColor={this.props.theme.colors.darkGray}
        labelStyle={[styles.label]}
      />
    )
  }
  render() {
    // const { loading, error, selected } = this.state
    // const categories = this.props.data

    return (
      <View style={{ flex: 1 /*marginTop: 53*/ }}>
        <TabView
          // style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          // renderPager={props => <TabViewPagerPan {...props} />}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
  },
  tabBar: {
    flexDirection: 'row',
    ...elevation(2),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
})

Discover = withTheme(Discover)
