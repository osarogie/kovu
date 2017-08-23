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
import { commitMutation, createFragmentContainer, graphql } from 'react-relay'
import Markdown from 'react-native-simple-markdown'
import { connect } from 'react-redux'
import Separator from '../components/Separator'
import DiscussionLike from '../fragments/DiscussionLike'
import { getTimeAgo, imageUrl } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

class CommentListItem extends React.PureComponent {
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
          <Text>
            {getTimeAgo(comment.created_at)}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { comment, openDiscussion } = this.props
    // console.log(this.props);
    // console.log(comment.created_at)
    return (
      <View>
        <TouchableHighlight
          {...this.clickableProps}
          style={{ backgroundColor: '#fff' }}
        >
          <View style={excerptStyles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {this.renderProfilePicture()}
              <View style={{ marginLeft: 15, flex: 1 }}>
                {this.renderMeta()}
              </View>
            </View>
            <Markdown styles={excerptStyles.body}>
              {comment.body}
              {comment.word_count > 30 ? '***...(Read More)***' : ''}
            </Markdown>
          </View>
        </TouchableHighlight>
        <Separator />
      </View>
    )
  }
}

CommentListItem.defaultProps = {}

CommentListItem.propTypes = {
  ...ViewPropTypes
}

export default createFragmentContainer(
  connect(mapStateToProps)(CommentListItem),
  graphql`
    fragment CommentListItem_comment on Comment {
      id
      _id
      body
      created_at
      user {
        id
        _id
        name
        profile_picture_name
      }
    }
  `
)
