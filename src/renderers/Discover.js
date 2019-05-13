// @flow

import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { VerticalGroupList } from '../fragments/VerticalGroupList'
import { VerticalUserList } from '../fragments/VerticalUserList'
import PostList from '../fragments/PostList'
import QueryRendererProxy from './QueryRendererProxy'
import { TabView, TabBar, TabViewPagerPan } from 'react-native-tab-view'
import { createPaginationContainer, graphql } from 'react-relay'
import { Title } from '@shoutem/ui/components/Text'
import { Screen } from '@shoutem/ui/components/Screen'
import Icon from 'react-native-vector-icons/Feather'
import { WHITE } from '../ui'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

const DiscoverGroupsPaginationContainer = createPaginationContainer(
  VerticalGroupList,
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
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.groupList && props.groupList.groups
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      // console.log(props)
      return {
        count,
        cursor,
        q: props.q
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
    `
  }
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
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.userList && props.userList.users
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor, size }, fragmentVariables) {
      return {
        count,
        cursor,
        q: props.q
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
    `
  }
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
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.discussionList && props.discussionList.discussions
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        q: props.q
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
    `
  }
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
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <DiscoverGroupsPaginationContainer
              // renderHeader={_ => renderCultureHeader(q)}
              groupList={data.props.feed}
              q={q}
              itemProps={{ ...props, f_width: 300, f_height: 200 }}
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
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
        <Screen
          styleName="paper"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: WHITE
          }}
        >
          <Icon
            name="search"
            size={100}
            color="#ddd"
            style={{ marginBottom: 10 }}
          />
          <Title style={{ color: '#ddd' }}>
            Use the search bar to find stories
          </Title>
        </Screen>
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
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

///////

export default class VideoPager extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'cultures', title: 'Cultures' },
      { key: 'users', title: 'People' },
      { key: 'stories', title: 'Stories' }
    ]
  }
  _handleIndexChange = index =>
    this.setState({
      index
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

  _renderHeader = props => (
    <TabBar
      {...props}
      onTabPress={this.onTabPress}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  )
  render() {
    // const { loading, error, selected } = this.state
    // const categories = this.props.data

    return (
      <View style={{ flex: 1 /*marginTop: 53*/ }}>
        <TabView
          // style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          renderPager={props => <TabViewPagerPan {...props} />}
        />
      </View>
    )
  }
}

//////////

//  (DiscoverQueryRenderer = ({ q, ...props }) => {
//   return (
//     <QueryRendererProxy
//       query={graphql`
//         query DiscoverQuery($count: Int!, $cursor: String, $q: String) {
//           feed {
//             ...Discover_userList
//             ...Discover_discussionList
//             ...Discover_groupList
//           }
//         }
//       `}
//       variables={{ cursor: null, count: 10, q }}
//       render={data => (
//         <DiscoverPostsPaginationContainer
//           discussionList={data.props.feed}
//           q={q}
//           highlight
//           itemProps={{ ...props }}
//           renderHeader={_ => (
//             <View style={{ flex: 1, backgroundColor: '#eee', marginTop: 53 }}>
//               <DiscoverUsersPaginationContainer
//                 renderHeader={_ => renderUserHeader(q)}
//                 userList={data.props.feed}
//                 q={q}
//                 itemProps={{ ...props }}
//               />
//               <View style={{ flex: 1, backgroundColor: '#fff' }}>
//                 <DiscoverGroupsPaginationContainer
//                   renderHeader={_ => renderCultureHeader(q)}
//                   groupList={data.props.feed}
//                   q={q}
//                   itemProps={{ ...props, f_width: 300, f_height: 200 }}
//                 />
//               </View>
//               {renderPostsLabel(q)}
//             </View>
//           )}
//         />
//       )}
//     />
//   )
// })
const labelStyle = {
  flexDirection: 'row',
  alignItems: 'flex-end',
  padding: 20,
  paddingBottom: 8,
  fontSize: 15,
  color: '#000',
  fontWeight: 'bold'
}

const styles = {
  white: { color: '#fff', paddingVertical: 5 },
  tabbar: {
    backgroundColor: '#fff'
  },
  tab: {
    // width: 'auto',
    backgroundColor: '#fff',
    height: 50
  },
  indicator: {
    backgroundColor: '#000',
    height: 2
  },
  label: {
    color: '#000',
    fontWeight: '400',
    ...labelStyle
  }
}

// const renderCultureHeader = q => (
//   <Text style={labelStyle}>
//     Top Cultures
//     {renderMatch(q)}
//   </Text>
// )
// const renderUserHeader = q => (
//   <Text style={labelStyle}>
//     People
//     {renderMatch(q)}
//   </Text>
// )
// const renderPostsLabel = q => (
//   <Text style={[labelStyle, { backgroundColor: '#eee' }]}>
//     Stories
//     {renderMatch(q)}
//   </Text>
// )

const renderMatch = q => {
  if (q) {
    return (
      <Text style={{ fontSize: 13, color: '#777', fontStyle: 'italic' }}>
        {` that match `}
        <Text style={{ color: '#000' }}>{q}</Text>
      </Text>
    )
  }

  return null
}
