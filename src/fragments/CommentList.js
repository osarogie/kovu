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
import EmptyList from '../components/EmptyList'
import CommentListItem from '../fragments/CommentListItem'

export default class CommentList extends React.Component {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false
  }

  onRefresh = () => {
    const { comments } = this.props.commentList

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true
    })

    this.props.relay.refetchConnection(comments.edges.length, err => {
      this.setState({
        isFetchingTop: false
      })
    })
  }

  onEndReached = () => {
    const comments = this.props.commentList.comments

    if (!comments.edges || comments.edges.length == 0) return

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
    <CommentListItem comment={item.node} {...itemProps} />
  )

  renderFooter() {
    const comments = this.props.commentList.comments

    if (!comments.edges || comments.edges.length == 0) {
      return <EmptyList message="No comments yet" />
    }
    if (this.state.hasMore) {
      return (
        <LoaderBox isLoading={true} onPress={this.onEndReached.bind(this)} />
      )
    }
    return null
  }

  render() {
    const { commentList, itemProps } = this.props
    const comments = commentList.comments
    return (
      <VirtualizedList
        data={comments.edges}
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
    )
  }
}
