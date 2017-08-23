import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  ViewPropTypes,
  Dimensions,
  TouchableHighlight,
  PixelRatio,
  TouchableOpacity
} from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { createFragmentContainer, graphql } from 'react-relay'
import Markdown from 'react-native-simple-markdown'
import { connect } from 'react-redux'
import Separator from '../components/Separator'
import DiscussionLike from '../fragments/DiscussionLike'
import { getTimeAgo, imageUrl, getCommentCount } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

class PostThumb extends React.PureComponent {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  collectionNameProps = {
    style: { color: '#05f' }
  }

  renderCollectionName() {
    const { discussion, showGroupInfo, openCollection } = this.props

    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableOpacity
          {...this.clickableProps}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={_ => openCollection(discussion.group)}
        >
          <Text style={excerptStyles.groupInfo} numberOfLines={1}>
            <Text> in </Text>
            <Text {...this.collectionNameProps}>
              {discussion.group.name}
            </Text>
            <Text> collection</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  renderProfilePicture() {
    const { discussion, openProfile } = this.props
    const size = PixelRatio.getPixelSizeForLayoutSize(40)

    const uri = imageUrl(
      discussion.user.profile_picture_name,
      `${size}x${size}`
    )

    return (
      <TouchableOpacity
        {...this.clickableProps}
        onPress={_ => openProfile(discussion.user)}
      >
        <View
          style={[excerptStyles.profilePicture, { backgroundColor: '#eee' }]}
        >
          <Image source={{ uri }} style={excerptStyles.profilePicture} />
        </View>
      </TouchableOpacity>
    )
  }

  renderMeta() {
    const { discussion, openProfile } = this.props

    return (
      <View>
        <TouchableOpacity
          {...this.clickableProps}
          onPress={_ => openProfile(discussion.user)}
        >
          <Text style={[styles.fill, { color: '#000' }]} numberOfLines={1}>
            {discussion.user.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>
            {getTimeAgo(discussion.created_at)}
          </Text>
          {this.renderCollectionName()}
        </View>
      </View>
    )
  }

  render() {
    const { discussion, openDiscussion } = this.props
    const { name, excerpt, word_count } = discussion
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableHighlight
          {...this.clickableProps}
          style={{
            backgroundColor: '#fff',
            margin: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd'
          }}
          onPress={_ => openDiscussion(discussion)}
        >
          <View style={excerptStyles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {this.renderProfilePicture()}
              <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                {this.renderMeta()}
              </View>
            </View>
            <Text style={excerptStyles.title}>
              {name}
            </Text>
            <Markdown styles={excerptStyles.body}>
              {excerpt}
              {word_count > 30 ? '***...(Read More)***' : ''}
            </Markdown>
          </View>
        </TouchableHighlight>
        <Separator />
      </View>
    )
  }
}

PostThumb.defaultProps = {}

PostThumb.propTypes = {
  ...ViewPropTypes
}

export default connect(mapStateToProps)(PostThumb)
