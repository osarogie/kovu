// @flow

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  VirtualizedList,
  Image
} from 'react-native'
// import { withNavigation } from 'react-navigation'
import environment from '../../relay-environment'
import styles from '../styles'
import colors from '../colors'
import LoaderBox from '../components/LoaderBox'
import Separator from '../components/Separator'
import GroupListItem from '../fragments/GroupListItem'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

export class VerticalGroupList extends React.Component {
  state = {
    isFetchingTop: false,
    isLoading: false,
    hasMore: false
  }

  onRefresh = () => {
    const groups = this.props.groupList.groups_in

    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetchingTop: true
    })

    this.props.relay.refetchConnection(groups.edges.length, err => {
      this.setState({
        isFetchingTop: false
      })
    })
  }

  onEndReached = () => {
    const { groupList } = this.props
    const groups = groupList.groups_in || groupList.groups

    if (!groups.edges || groups.edges.length == 0) return

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
    <GroupListItem vertical group={item.node} {...itemProps} />
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

  renderHeader() {
    return <View style={[styles.imageWrap, { height: 0 }]} />
  }

  render() {
    const { groupList, itemProps, night_mode } = this.props
    // console.log(groupList)
    const groups = groupList.groups_in || groupList.groups
    // console.log(this.props);

    if (groups.edges.length > 0) {
      return (
        <View>
          {this.props.renderHeader && this.props.renderHeader()}
          <VirtualizedList
            data={groups.edges}
            renderItem={props => this.renderItem({ ...props, itemProps })}
            keyExtractor={item => item.node.id}
            onEndReached={this.onEndReached}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            // ListFooterComponent={this.renderFooter.bind(this)}
            // ListHeaderComponent={this.renderHeader.bind(this)}
            getItemCount={data => data.length}
            getItem={(data, ii) => data[ii]}
          />
          <Separator />
        </View>
      )
    }

    return null
  }
}
