// @flow

import React, { Component } from 'react'
import { View, VirtualizedList } from 'react-native'
import environment from '../../relay-environment'
import styles from '../styles'
import colors from '../colors'
import LoaderBox from '../components/LoaderBox'
import EmptyList from '../components/EmptyList'
import PostListItem from '../fragments/PostListItem'

export default class PostList extends Component<any, Props, State> {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false
  }

  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
  }

  onRefresh = () => {
    const { discussionList } = this.props
    const discussions = discussionList.discussions || discussionList.top_stories

    if (this.props.relay.isLoading()) return

    this.setState({
      isFetchingTop: true
    })

    this.props.relay.refetchConnection(discussions.edges.length, err => {
      this.setState({
        isFetchingTop: false
      })
    })
  }

  onEndReached = _ => {
    const { discussionList } = this.props
    const discussions = discussionList.discussions || discussionList.top_stories

    if (!discussions.edges || discussions.edges.length == 0) return

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
    <PostListItem discussion={item.node} {...itemProps} />
  )

  renderFooter() {
    const { discussionList } = this.props
    const discussions = discussionList.discussions || discussionList.top_stories

    if (!discussions.edges || discussions.edges.length == 0) {
      return <EmptyList message="No posts yet" />
    }

    if (this.state.hasMore) {
      return <LoaderBox isLoading={true} onPress={this.onEndReached} />
    }

    return null
  }

  render() {
    const { discussionList, itemProps } = this.props
    const discussions = discussionList.discussions || discussionList.top_stories

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        {this.props.renderTopHeader && this.props.renderTopHeader()}
        <VirtualizedList
          data={discussions.edges}
          renderItem={props => this.renderItem({ ...props, itemProps })}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.isFetchingTop}
          ListFooterComponent={this.renderFooter.bind(this)}
          ListHeaderComponent={this.props.renderHeader}
          getItemCount={data => data.length}
          getItem={(data, ii) => data[ii]}
        />
      </View>
    )
  }
}
