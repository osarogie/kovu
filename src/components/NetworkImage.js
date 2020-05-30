import React from 'react'
import Image from 'react-native-image-progress'
import { ActivityIndicator } from 'react-native'

export default props => (
  <Image
    indicator={() => <ActivityIndicator color="#fff" size={30} />}
    indicatorProps={{ color: '#fff' }}
    {...props}
  />
)
