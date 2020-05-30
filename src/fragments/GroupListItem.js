import React from 'react'
import {
  View,
  Image,
  // ViewPropTypes,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from 'react-native'
import styles from '../styles'
import { createFragmentContainer, graphql } from 'react-relay'
import { imageUrl } from '../utils'
import { withNavigation } from '../navigation/withNavigation'
import { navHelper } from '../helpers/getNavigation'
import { Text, withTheme } from 'react-native-paper'

const vertical_width = Dimensions.get('window').width - 34

class GroupListItem extends React.Component {
  renderFeaturePhoto() {
    const {
      group: { header_image },
      vertical,
    } = this.props
    // const { header_image } = this.props.group
    const width = vertical ? vertical_width : this.props.f_width || 200
    const height = this.props.f_height || 100
    const f_width = Math.min(1000, PixelRatio.getPixelSizeForLayoutSize(width))
    const f_height = Math.min(
      1000,
      PixelRatio.getPixelSizeForLayoutSize(height),
    )

    if (header_image) {
      return (
        <Image
          source={{
            uri: imageUrl(header_image.name, `${f_width}x${f_height}`),
          }}
          style={{
            flex: 1,
            borderRadius: 5,
            height,
            width,
          }}
        />
      )
    }
    return null
  }

  render() {
    const { group, f_width, f_height, vertical } = this.props
    const width = vertical ? 'auto' : f_width || 200
    const height = f_height || 100

    return (
      <TouchableOpacity
        underlayColor={this.props.theme.colors.separator}
        onPress={_ => navHelper(this).openCulture(group)}>
        <View>
          <View
            style={[
              styles.featurePhotoWarp,
              {
                height,
                width,
                flex: 1,
                borderRadius: 5,
                elevation: 2,
                backgroundColor: this.props.theme.colors.separator,
                margin: 17,
                marginBottom: 0,
              },
            ]}>
            {this.renderFeaturePhoto()}
          </View>
          <Text
            numberOfLines={1}
            style={{
              width,
              marginBottom: 20,
              marginLeft: 17,
              marginTop: 10,
              fontSize: 15,
            }}>
            {group.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
GroupListItem = withTheme(GroupListItem)

export const createGroupListItemFragment = Component =>
  createFragmentContainer(withNavigation(Component), {
    group: graphql`
      fragment GroupListItem_group on Group {
        id
        _id
        name
        permalink
        body
        header_image {
          name
        }
      }
    `,
  })

export default createGroupListItemFragment(withNavigation(GroupListItem))
