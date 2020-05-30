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
import { Text, useTheme } from 'react-native-paper'

function VerticalGroupListItem({ group }) {
  const [layoutWidth, setLayoutWidth] = useState(100)
  const width = layoutWidth - 20
  const height = width * 0.65
  const { colors } = useTheme()

  const widthPixels = useMemo(
    () => Math.min(1000, PixelRatio.getPixelSizeForLayoutSize(width)),
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
            width: width - 4,
            flex: 1,
            borderRadius: 5,
            height: height - 4,
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
      underlayColor={colors.separator}
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
              padding: 2,
              backgroundColor: '#ddd2',
            },
          ]}>
          {renderFeaturePhoto()}
        </View>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 10,
          }}>
          {group.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            opacity: 0.7,
          }}>
          {group.body}
        </Text>
      </>
    </TouchableOpacity>
  )
}

export default createGroupListItemFragment(VerticalGroupListItem)
