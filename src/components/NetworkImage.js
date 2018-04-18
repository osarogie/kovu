import React from 'react'
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'

export default props => (
  <Image
    indicator={ProgressBar}
    indicatorProps={{ color: '#fff' }}
    {...props}
  />
)
