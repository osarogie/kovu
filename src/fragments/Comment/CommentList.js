import React from 'react'
import { FlatList } from 'react-native'
import LoaderBox from '../../components/LoaderBox'
import EmptyList from '../../components/EmptyList'
import CommentListItem from '../../fragments/CommentListItem'

export default class PostList extends React.Component {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false,
  }

  onRefresh = () => {
    const { comments } = this.props.commentList

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true,
    })

    this.props.relay.refetchConnection(comments.edges.length, () => {
      this.setState({
        isFetchingTop: false,
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
        isLoading,
      })
      return
    }

    // fetch more 5
    this.props.relay.loadMore(10, () => {
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
      <FlatList
        data={comments.edges}
        keyboardShouldPersistTaps={'handled'}
        renderItem={props => this.renderItem({ ...props, itemProps })}
        keyExtractor={item => item.node.id}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        refreshing={this.state.isFetchingTop}
        ListFooterComponent={this.renderFooter.bind(this)}
        ListHeaderComponent={this.props.renderHeader}
      />
    )
  }
}
