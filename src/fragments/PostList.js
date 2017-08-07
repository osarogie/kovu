// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  Image
} from 'react-native'
import { withNavigation } from 'react-navigation'
import environment from '../../relay-environment'
import styles from '../styles'
import LoaderBox from '../components/LoaderBox'
import PostListItem from '../fragments/PostListItem'

// @withNavigation
export default class PostList extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false
  }

  onRefresh = () => {
    const { discussions } = this.props.list

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true
    })

    this.props.relay.refetchConnection(discussions.edges.length, err => {
      this.setState({
        isFetchingTop: false
      })
    })
  }

  onEndReached = () => {
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
    this.props.relay.loadMore(5, err => {
      this.setState({
        hasMore: this.props.relay.hasMore(),
        isLoading: this.props.relay.isLoading()
      })
      console.log('loadMore: ', err)
    })

    this.setState({
      hasMore: this.props.relay.hasMore(),
      isLoading: this.props.relay.isLoading()
    })
  }

  renderItem = ({ item, itemProps }) =>
    <PostListItem
      discussion={item.node}
      // onPress={() => this.goToDiscussionDetail(item.node)}
      navigation={this.props.navigation}
      {...itemProps}
    />

  // goToDiscussionDetail = discussion => {
  //   const { navigate } = this.props.navigation
  //
  //   navigate('Discussion', { id: discussion.id })
  // }

  renderFooter() {
    if (this.state.hasMore) {
      return (
        <LoaderBox isLoading={true} onLoadInit={this.onEndReached.bind(this)} />
      )
    } else {
      return null
    }
  }

  renderHeader() {
    return <View style={[styles.imageWrap, { height: 0 }]} />
  }

  render() {
    const { list, itemProps } = this.props
    const discussions = list.discussions

    return (
      <View style={styles.container}>
        <FlatList
          data={discussions.edges}
          renderItem={props => this.renderItem({ ...props, itemProps })}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.isFetchingTop}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={this.renderFooter.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
      </View>
    )
  }
}
