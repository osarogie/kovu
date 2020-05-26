import React, { useState, useCallback, useMemo } from 'react'
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
import getNavigation, { navHelper } from '../helpers/getNavigation'
import { createGroupListItemFragment } from './GroupListItem'
import { useNavigation } from '@react-navigation/core'
import { Text } from 'react-native-paper'

function VerticalGroupListItem({ group, f_width, f_height, vertical }) {
  const [layoutWidth, setLayoutWidth] = useState(100)
  const width = vertical ? layoutWidth - 20 : f_width || 200
  const height = width * 0.75 || f_height || 100

  const widthPixels = useMemo(
    () =>
      Math.min(
        1000,
        vertical ? 1000 : PixelRatio.getPixelSizeForLayoutSize(width),
      ),
    [width],
  )

  const heightPixels = useMemo(
    () => Math.min(1000, PixelRatio.getPixelSizeForLayoutSize(height)),
    [height],
  )

  const { header_image } = group
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    getNavigation(navigation).openCulture(group)
  }, [navigation, group])

  function renderFeaturePhoto() {
    if (header_image) {
      return (
        <Image
          source={{
            uri: imageUrl(header_image.name, `${widthPixels}x${heightPixels}`),
          }}
          style={{
            width,
            flex: 1,
            borderRadius: 5,
            height,
          }}
        />
      )
    }

    return null
  }

  const setLayout = useCallback(({ nativeEvent: { layout: { width } } }) => {
    setLayoutWidth(width)
  }, [])

  return (
    <TouchableOpacity
      onLayout={setLayout}
      underlayColor="whitesmoke"
      style={{ paddingHorizontal: 10, flex: 1, paddingBottom: 5 }}
      onPress={onPress}>
      <>
        <View
          style={[
            {
              marginTop: 27,
              borderRadius: 5,
              height,
              flex: 1,
              backgroundColor: '#ddd2',
            },
          ]}>
          {renderFeaturePhoto()}
        </View>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 10,
          }}>
          {group.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            opacity: 0.7,
          }}>
          {group.body}
        </Text>
      </>
    </TouchableOpacity>
  )
}

export default createGroupListItemFragment(VerticalGroupListItem)
