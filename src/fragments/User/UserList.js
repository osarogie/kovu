// @flow

import React from 'react'
import { View, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import LoaderBox from '../../components/LoaderBox'
import UserRow from './UserRow'

export default class UserList extends React.Component {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false,
  }

  onRefresh = () => {
    const { users } = this.props.userList

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true,
    })

    this.props.relay.refetchConnection(users.edges.length, err => {
      this.setState({
        isFetchingTop: false,
      })
    })
  }

  onEndReached = () => {
    const users = this.props.userList.users

    if (!users.edges || users.edges.length == 0) return

    const hasMore = this.props.relay.hasMore()
    const isLoading = this.props.relay.isLoading()

    if (!hasMore || isLoading) {
      this.setState({
        hasMore,
        isLoading,
      })
      return
    }

    this.props.relay.loadMore(10, err => {
      this.setState({
        hasMore: this.props.relay.hasMore(),
        isLoading: this.props.relay.isLoading(),
      })
    })

    this.setState({
      hasMore: this.props.relay.hasMore(),
      isLoading: this.props.relay.isLoading(),
    })
  }

  renderItem = ({ item, itemProps }) => (
    <UserRow user={item.node} {...itemProps} />
  )

  renderFooter() {
    if (this.state.hasMore) {
      return (
        <LoaderBox isLoading={true} onPress={this.onEndReached.bind(this)} />
      )
    } else {
      return null
    }
  }

  render() {
    const { userList, itemProps } = this.props
    const users = userList.users
    return (
      <View>
        {this.props.renderHeader && this.props.renderHeader()}
        <FlatList
          data={users.edges}
          renderItem={props => this.renderItem({ ...props, itemProps })}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
        />
      </View>
    )
  }
}
