import React from 'react'
import { View, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from '../styles'
import excerptStyles from '../styles/excerptStyles'
import { createFragmentContainer, graphql } from 'react-relay'
import { connect } from 'react-redux'
import Separator from '../components/Separator'
import Avatar from '../components/Avatar'
import { getTimeAgo } from '../utils'
import { withTheme, Text } from 'react-native-paper'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
})

class PostThumb extends React.PureComponent {
  openProfile = () => this.props.openProfile(this.props.discussion.user)
  openDiscussion = () => this.props.openDiscussion(this.props.discussion)
  openComments = () => this.props.openComments(this.props.discussion)
  openCulture = () => this.props.openCulture(this.props.discussion.group)
  openProfile = () => this.props.openProfile(this.props.discussion.user)

  renderCultureName() {
    const { discussion, showGroupInfo } = this.props

    if (discussion.group && showGroupInfo !== false) {
      return (
        <TouchableOpacity
          underlayColor={this.props.theme.colors.separator}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={this.openCulture}>
          <Text style={excerptStyles.groupInfo} numberOfLines={1}>
            <Text> in </Text>
            <Text style={{ color: this.props.theme.colors.primary }}>
              {discussion.group.name}
            </Text>
            <Text> culture</Text>
          </Text>
        </TouchableOpacity>
      )
    } else return null
  }

  renderMeta() {
    const { discussion } = this.props

    return (
      <View>
        <Text style={[excerptStyles.title, { marginTop: 0 }]}>
          {discussion.name}
        </Text>
        <TouchableOpacity
          underlayColor={this.props.theme.colors.separator}
          onPress={this.openProfile}>
          <Text style={[styles.fill]} numberOfLines={1}>
            <Text style={{ fontStyle: 'italic' }}>{'by '}</Text>
            <Text style={[styles.fill]} numberOfLines={1}>
              {discussion.user.name}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>{getTimeAgo(discussion.created_at)}</Text>
          {this.renderCultureName()}
        </View>
      </View>
    )
  }

  render() {
    const { discussion } = this.props
    const { user } = discussion
    console.log(discussion)
    return (
      <View>
        <TouchableHighlight
          underlayColor={this.props.theme.colors.separator}
          style={{
            backgroundColor: this.props.theme.colors.background,
            // margin: 20,
            // elevation: 2,
            // borderRadius: 5
            // borderWidth: 1,
            // borderColor: '#ddd'
          }}
          onPress={this.openDiscussion}>
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
PostThumb = withTheme(PostThumb)

export default createFragmentContainer(connect(mapStateToProps)(PostThumb), {
  discussion: graphql`
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
        id
        _id
        name
        permalink
      }
    }
  `,
})
