// @flow

import React from 'react'
import { View, FlatList } from 'react-native'
import styles from '../styles'
import LoaderBox from '../components/LoaderBox'
import UserListItem from '../fragments/UserListItem'
import Separator from '../components/Separator'

export class VerticalUserList extends React.Component {
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

    if (!users.edges || users.edges.length === 0) return

    const hasMore = this.props.relay.hasMore()
    const isLoading = this.props.relay.isLoading()

    if (!hasMore || isLoading) {
      this.setState({
        hasMore,
        isLoading,
      })
      return
    }

    // fetch more 5
    this.props.relay.loadMore(10, err => {
      this.setState({
        hasMore: this.props.relay.hasMore(),
        isLoading: this.props.relay.isLoading(),
      })
      // console.log('loadMore: ', err)
    })

    this.setState({
      hasMore: this.props.relay.hasMore(),
      isLoading: this.props.relay.isLoading(),
    })
  }

  renderItem = ({ item, itemProps }) => (
    <UserListItem user={item.node} {...itemProps} vertical />
  )

  renderFooter() {
    if (this.state.hasMore) {
      return <LoaderBox isLoading={true} onPress={this.onEndReached} />
    } else {
      return null
    }
  }

  render() {
    const { userList, itemProps } = this.props
    const users = userList.users
    return (
      <View style={{ flex: 1 }}>
        {this.props.renderHeader && this.props.renderHeader()}
        <FlatList
          data={users.edges}
          keyboardShouldPersistTaps={'handled'}
          ItemSeparatorComponent={() => (
            <Separator style={{ marginLeft: 84 }} />
          )}
          renderItem={props => this.renderItem({ ...props, itemProps })}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
        />
        <Separator />
      </View>
    )
  }
}
