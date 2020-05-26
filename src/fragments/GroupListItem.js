import React from 'react'
import {
  Text,
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
    const f_width = Math.min(
      1000,
      vertical ? 1000 : PixelRatio.getPixelSizeForLayoutSize(width),
    )
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
        underlayColor="whitesmoke"
        onPress={_ => navHelper(this).openCulture(group)}>
        <View>
          <View
            style={{
              flex: 1,
              marginLeft: 17,
              marginTop: 17,
              width,
              height,
              borderRadius: 5,
              marginRight: 17,
              elevation: 2,
              backgroundColor: '#05f',
            }}>
            <View
              style={[
                styles.featurePhotoWarp,
                {
                  height,
                  width,
                  flex: 1,
                  backgroundColor: '#05f',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  marginTop: 0,
                  marginBottom: 0,
                },
              ]}>
              {this.renderFeaturePhoto()}
            </View>
            <View
              style={{
                backgroundColor: '#0005',
                height,
                width,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  width,
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {group.name}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={2}
            style={{
              width,
              marginBottom: 20,
              marginLeft: 17,
              marginTop: 10,
              color: '#000',
              fontSize: 14,
            }}>
            {group.body}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

GroupListItem.defaultProps = {}

GroupListItem.propTypes = {
  // ...ViewPropTypes
}

export const createGroupListItemFragment = Component =>
  createFragmentContainer(
    withNavigation(Component),
    graphql`
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
  )

export default createGroupListItemFragment(withNavigation(GroupListItem))
