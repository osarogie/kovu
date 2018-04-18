import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  // ViewPropTypes,
  Dimensions,
  TouchableOpacity,
  PixelRatio
} from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import Markdown from 'react-native-simple-markdown'
import { connect } from 'react-redux'
import Separator from '../components/Separator'
import DiscussionLike from '../fragments/DiscussionLike'
import { getTimeAgo, imageUrl } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import { Subtitle, Caption } from '@shoutem/ui/components/Text'
import Avatar from '../components/Avatar'
// import { connectDecorator } from '../lib'
import { withNavigation } from 'react-navigation'
import { navHelper } from '../helpers/getNavigation'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

@withNavigation
class CommentListItem extends React.PureComponent {
  clickableProps = {
    underlayColor: 'whitesmoke'
  }

  cultureNameProps = {
    style: { color: '#05f' }
  }

  featurePhotoStyles = {
    ...excerptStyles.featurePhoto,
    backgroundColor: '#eee',
    marginTop: 10
  }
  openComments = () =>
    navHelper(this).openComments(this.props.comment.discussion)

  renderFeaturePhoto() {
    const image = this.props.comment.feature_photo

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

  renderProfilePicture() {
    const { comment, openProfile } = this.props
    const size = PixelRatio.getPixelSizeForLayoutSize(40)

    const uri = imageUrl(comment.user.profile_picture_name, `${size}x${size}`)

    return (
      <TouchableOpacity
        {...this.clickableProps}
        onPress={_ => openProfile(comment.user)}
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
    const { comment, openProfile } = this.props

    return (
      <View>
        <TouchableOpacity
          {...this.clickableProps}
          onPress={_ => openProfile(comment.user)}
        >
          <Text style={[styles.fill, { color: '#000' }]}>
            {comment.user.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>{getTimeAgo(comment.created_at)}</Text>
        </View>
      </View>
    )
  }

  renderNormal() {
    const { comment, openDiscussion } = this.props
    // console.log(this.props);
    // console.log(comment.created_at)
    return (
      <View>
        <TouchableOpacity
          {...this.clickableProps}
          style={{ backgroundColor: '#fff' }}
        >
          <View style={excerptStyles.container}>
            <View style={{ flexDirection: 'row' }}>
              {this.renderProfilePicture()}
              <View style={{ marginLeft: 15, flex: 1 }}>
                {this.renderMeta()}
                {/* <Markdown styles={excerptStyles.body}> */}
                <Subtitle>
                  {comment.body}
                  {comment.word_count > 30 ? '***...(Read More)***' : ''}
                </Subtitle>
                {/* </Markdown> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Separator />
      </View>
    )
  }

  renderStrip() {
    const { comment, openDiscussion, openProfile } = this.props
    // console.log(this.props);
    // console.log(comment.created_at)
    return (
      <TouchableOpacity
        style={{ backgroundColor: '#f2f2f2', borderRadius: 5 }}
        onPress={this.openComments}
      >
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size={30}
              rounded
              source={comment.user}
              title={comment.user.name}
              activeOpacity={0.7}
              onPress={_ => openProfile(comment.user)}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              {/* <TouchableOpacity
                {...this.clickableProps}
                onPress={_ => openProfile(comment.user)}
              >
                <Text style={[styles.fill, { color: '#000' }]}>
                  {comment.user.name}
                </Text>
              </TouchableOpacity> */}
              {/* <Markdown styles={excerptStyles.body}> */}
              <Text style={{ fontSize: 12 }} numberOfLines={2}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>
                  {comment.user.name}
                </Text>{' '}
                {comment.excerpt}
                {comment.word_count > 30 ? '***...(Read More)***' : ''}
              </Text>
              <View style={styles.row}>
                <Caption>{getTimeAgo(comment.created_at)}</Caption>
              </View>
              {/* </Markdown> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return this.props.strip ? this.renderStrip() : this.renderNormal()
  }
}

CommentListItem.defaultProps = {}

CommentListItem.propTypes = {
  // ...ViewPropTypes
}

export default createFragmentContainer(
  connect(mapStateToProps)(CommentListItem),
  graphql`
    fragment CommentListItem_comment on Comment {
      id
      _id
      body
      created_at
      discussion_id
      excerpt
      discussion {
        id
        _id
      }
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
    }
  `
)
