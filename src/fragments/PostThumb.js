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
import Avatar from '../components/Avatar'
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

  cultureNameProps = {
    style: { color: '#05f' }
  }

  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.openDiscussion = this.openDiscussion.bind(this)
    this.openProfile = this.openProfile.bind(this)
    this.openComments = this.openComments.bind(this)
    this.openCulture = this.openCulture.bind(this)
  }

  openProfile = _ => this.props.openProfile(this.props.discussion.user)
  openDiscussion = _ => this.props.openDiscussion(this.props.discussion)
  openComments = _ => this.props.openComments(this.props.discussion)
  openCulture = _ => this.props.openCulture(this.props.discussion.group)
  openProfile = _ => this.props.openProfile(this.props.discussion.user)

  renderCultureName() {
    const { discussion, showGroupInfo } = this.props

    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableOpacity
          {...this.clickableProps}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={this.openCulture}
        >
          <Text style={excerptStyles.groupInfo} numberOfLines={1}>
            <Text> in </Text>
            <Text {...this.cultureNameProps}>
              {discussion.group.name}
            </Text>
            <Text> culture</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  // renderProfilePicture() {
  //   const { discussion, openProfile } = this.props
  //   const size = PixelRatio.getPixelSizeForLayoutSize(40)
  //
  //   const uri = imageUrl(
  //     discussion.user.profile_picture_name,
  //     `${size}x${size}`
  //   )
  //
  //   return (
  //     <TouchableOpacity
  //       {...this.clickableProps}
  //       onPress={_ => openProfile(discussion.user)}
  //     >
  //       <View
  //         style={[excerptStyles.profilePicture, { backgroundColor: '#eee' }]}
  //       >
  //         <Image source={{ uri }} style={excerptStyles.profilePicture} />
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

  renderMeta() {
    const { discussion } = this.props

    return (
      <View>
        <Text style={excerptStyles.title}>
          {discussion.name}
        </Text>
        <TouchableOpacity {...this.clickableProps} onPress={this.openProfile}>
          <Text style={[styles.fill]} numberOfLines={1}>
            <Text style={{ fontStyle: 'italic' }}>
              {'by '}
            </Text>
            <Text style={[styles.fill, { color: '#000' }]} numberOfLines={1}>
              {discussion.user.name}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>
            {getTimeAgo(discussion.created_at)}
          </Text>
          {this.renderCultureName()}
        </View>
      </View>
    )
  }

  render() {
    const { discussion } = this.props
    const { name, excerpt, word_count, user } = discussion
    console.log(discussion)
    return (
      <View>
        <TouchableHighlight
          {...this.clickableProps}
          style={{
            backgroundColor: '#fff',
            margin: 20,
            elevation: 2,
            borderRadius: 5
            // borderWidth: 1,
            // borderColor: '#ddd'
          }}
          onPress={this.openDiscussion}
        >
          <View style={excerptStyles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Avatar
                width={40}
                radius={5}
                source={user}
                title={user.name}
                onPress={this.openProfile}
                activeOpacity={0.7}
              />
              <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
                {this.renderMeta()}
              </View>
            </View>
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

export default (PostFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(PostThumb),
  graphql`
    fragment PostThumb_discussion on Discussion {
      id
      _id
      name
      excerpt(size: 10)
      word_count
      created_at
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
      group {
        name
        permalink
      }
    }
  `
))
