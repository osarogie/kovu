import React from "react"
import {
  Text,
  StyleSheet,
  View,
  Image,
  // ViewPropTypes,
  TouchableOpacity,
  PixelRatio
} from "react-native"
import styles from "../styles"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import Markdown from "react-native-simple-markdown"
import { imageUrl } from "../utils"

class GroupRow extends React.Component {
  renderFeaturePhoto() {
    const { header_image } = this.props.group
    const width = this.props.f_width || 200
    const height = this.props.f_height || 100
    const f_width = PixelRatio.getPixelSizeForLayoutSize(width)
    const f_height = PixelRatio.getPixelSizeForLayoutSize(height)

    if (header_image) {
      return (
        <Image
          source={{
            uri: imageUrl(header_image.name, `${f_width}x${f_height}`)
          }}
          style={{
            borderRadius: 5,
            height,
            width
          }}
        />
      )
    }
    return null
  }

  render() {
    const { group, f_width, f_height, openCulture } = this.props
    const width = f_width || 200
    const height = f_height || 100

    return (
      <TouchableOpacity
        underlayColor="whitesmoke"
        onPress={_ => openCulture && openCulture(group)}
      >
        <View>
          <View
            style={{
              marginLeft: 17,
              marginTop: 17,
              width,
              height,
              borderRadius: 5,
              marginRight: 15,
              elevation: 2,
              backgroundColor: "#05f"
            }}
          >
            <View
              style={[
                styles.featurePhotoWarp,
                {
                  height,
                  width,
                  backgroundColor: "#05f",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  marginTop: 0,
                  marginBottom: 0
                }
              ]}
            >
              {this.renderFeaturePhoto()}
            </View>
            <View
              style={{
                backgroundColor: "#0005",
                height,
                width,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  width,
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
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
              color: "#000",
              fontSize: 14
            }}
          >
            {group.body}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default createFragmentContainer(
  GroupRow,
  graphql`
    fragment GroupRow_group on Group {
      id
      _id
      name
      permalink
      body
      header_image {
        name
      }
    }
  `
)
