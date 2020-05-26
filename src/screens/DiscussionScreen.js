import React from 'react'
import { View } from 'react-native'
import Post from '../renderers/Post'
// import { withNavigation } from '../navigation/withNavigation'
import styles from '../styles'
import getNavigation from '../helpers/getNavigation'

export default function DiscussionScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Post id={route.params.id} {...getNavigation(navigation)} />
    </View>
  )
}
