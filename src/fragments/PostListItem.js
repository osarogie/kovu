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

class PostListItem extends React.PureComponent {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  collectionNameProps = {
    style: { color: '#05f' }
  }

  featurePhotoStyles = {
    ...excerptStyles.featurePhoto,
    backgroundColor: '#eee',
    marginTop: 10
  }

  renderFeaturePhoto() {
    const image = this.props.discussion.feature_photo

    if (image) {
      if (this.props.feature_photo) {
        const { height, width } = this.props.feature_photo
      } else {
        var { width } = Dimensions.get('window')
        var height = width / 3
        width -= 34
      }
      const f_width = PixelRatio.getPixelSizeForLayoutSize(width)
      const f_height = PixelRatio.getPixelSizeForLayoutSize(height)

      const uri = imageUrl(image.name, `${f_width}x${f_height}`)

      return (
        <View style={[{ height, width }, this.featurePhotoStyles]}>
          <Image source={{ uri }} style={{ borderRadius: 5, height, width }} />
        </View>
      )
    } else {
      return null
    }
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
          <Text
            style={[excerptStyles.groupInfo, excerptStyles.meta]}
            numberOfLines={1}
          >
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
          <Text style={excerptStyles.meta}>
            {getTimeAgo(discussion.created_at)}
          </Text>
          {this.renderCollectionName()}
        </View>
      </View>
    )
  }

  renderControls() {
    const { discussion, openComments } = this.props
    const { comment_count } = discussion
    const comment_count_ = getCommentCount(comment_count)

    return (
      <View>
        <Separator styles={{ marginTop: 13, marginBottom: 10 }} />
        <View style={[styles.row, { alignItems: 'center' }]}>
          <DiscussionLike discussion={discussion} />
          <View style={styles.fillRow} />
          <TouchableOpacity
            {...this.clickableProps}
            onPress={_ => openComments(discussion)}
          >
            <Text style={{ marginLeft: 20 }}>
              {`${comment_count_} Contribution${comment_count == 1 ? '' : 's'}`}
            </Text>
          </TouchableOpacity>
          {/* <Icon
            name="md-more"
            style={excerptStyles.control}
            size={25}
            color="#777"
          /> */}
        </View>
      </View>
    )
  }

  render() {
    const { discussion, openDiscussion } = this.props
    const { name, excerpt, word_count } = discussion
    // console.log(this.props);
    // console.log(discussion.created_at)
    return (
      <View>
        <TouchableHighlight
          {...this.clickableProps}
          style={{ backgroundColor: '#fff', elevation: 2, marginBottom: 10 }}
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
            {this.renderFeaturePhoto()}
            <Markdown styles={excerptStyles.body}>
              {excerpt}
              {word_count > 30 ? '***...(Read More)***' : ''}
            </Markdown>
            {this.renderControls()}
          </View>
        </TouchableHighlight>
        <Separator />
      </View>
    )
  }
}

PostListItem.defaultProps = {}

PostListItem.propTypes = {
  ...ViewPropTypes
}

export default createFragmentContainer(
  connect(mapStateToProps)(PostListItem),
  graphql`
    fragment PostListItem_discussion on Discussion {
      id
      _id
      name
      excerpt(size: 30)
      word_count
      comment_count
      created_at
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
      group {
        id
        _id
        name
        permalink
      }
      feature_photo {
        id
        _id
        height
        width
        name
      }
      ...DiscussionLike_discussion
    }
  `
)
