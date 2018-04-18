import React from "react"

import { connect } from "react-redux"
import { getTimeAgo, imageUrl, getCommentCount } from "../../utils"
import { Text, Title, Caption } from "@shoutem/ui/components/Text"
import { TouchableOpacity } from "@shoutem/ui/components/TouchableOpacity"
import { ImageBackground } from "@shoutem/ui/components/ImageBackground"

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user
})

export default class FeaturedPost extends React.PureComponent {
  render() {
    const { discussion } = this.props
    const { name, excerpt, word_count, user, created_at } = discussion

    return (
      <ImageBackground
        styleName="featured"
        source={{
          uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-4.png"
        }}
      >
        <Tile>
          <Title styleName="md-gutter-bottom">{name}</Title>
          <Caption>
            {user.name} {getTimeAgo(created_at)}
          </Caption>
        </Tile>
      </ImageBackground>
    )
  }
}
