// @flow

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  VirtualizedList,
  Image
} from 'react-native'
import { withNavigation } from 'react-navigation'
import environment from '../../relay-environment'
import styles from '../styles'
import colors from '../colors'
import LoaderBox from '../components/LoaderBox'
import UserListItem from '../fragments/UserListItem'
import Separator from '../components/Separator'

export class VerticalUserList extends React.Component {
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

    this.props.relay.refetchConnection(users.edges.length, err => {
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
    this.props.relay.loadMore(10, err => {
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
    <UserListItem user={item.node} {...itemProps} vertical />
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                // width: '100%',
                flex: 1,
                backgroundColor: '#CED0CE',
                marginLeft: 84
              }}
            />
          )}
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
