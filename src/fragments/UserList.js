import React from 'react'
import { View, VirtualizedList } from 'react-native'
import LoaderBox from '../components/LoaderBox'
import UserListItem from '../fragments/UserListItem'
import Separator from '../components/Separator'

export default class UserList extends React.Component {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false
  }

  onRefresh = () => {
    const { users } = this.props.userList

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true
    })

    this.props.relay.refetchConnection(users.edges.length, () => {
      this.setState({
        isFetchingTop: false
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
        isLoading
      })
      return
    }

    // fetch more 5
    this.props.relay.loadMore(10, () => {
      this.setState({
        hasMore: this.props.relay.hasMore(),
        isLoading: this.props.relay.isLoading()
      })
      // console.log('loadMore: ', err)
    })

    this.setState({
      hasMore: this.props.relay.hasMore(),
      isLoading: this.props.relay.isLoading()
    })
  }

  renderItem = ({ item, itemProps }) => (
    <UserListItem user={item.node} {...itemProps} />
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
    // console.log(this.props)
    return (
      // <VirtualizedList
      //   data={users.edges}
      //   renderItem={props => this.renderItem({ ...props, itemProps })}
      //   keyExtractor={item => item.node.id}
      //   onEndReached={this.onEndReached}
      //   onRefresh={this.onRefresh}
      //   refreshing={this.state.isFetchingTop}
      //   ListFooterComponent={this.renderFooter.bind(this)}
      //   ListHeaderComponent={this.props.renderHeader}
      //   getItemCount={data => data.length}
      //   getItem={(data, ii) => data[ii]}
      // />
      <View>
        {this.props.renderHeader && this.props.renderHeader()}
        <VirtualizedList
          data={users.edges}
          horizontal
          renderItem={props => this.renderItem({ ...props, itemProps })}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
          getItemCount={data => data.length}
          getItem={(data, ii) => data[ii]}
        />
        <Separator />
      </View>
    )
  }
}
