import React from 'react'
import {
  // ViewPropTypes,
  ToastAndroid,
  Text,
  StyleSheet,
  View,
  Platform,
} from 'react-native'
import ActivityButton from './ActivityButton'
import { connect } from 'react-redux'
import colors from '../colors'
import styles from '../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

function LoaderBox({
  onPress,
  isLoading = false,
  title = 'Tap to load',
  indicatorColor = '#000',
  indicatorSize = 'large',
  containerStyle,
  buttonStyle = { backgroundColor: 'transparent' },
  textStyle = { color: '#000', fontSize: 20 },
  activityIndicatorStyle,
  error,
}) {
  const { colors } = useTheme()
  const renderIcon = () => {
    if (!isLoading) {
      return (
        <Icon
          name="md-refresh"
          style={[styles.icon, { marginRight: 0 }]}
          size={50}
          color={'#000'}
        />
      )
    }
    return null
  }

  if (error && Platform.OS == 'android') {
    ToastAndroid.show('Network Error', ToastAndroid.SHORT)
  }

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        },
      ]}>
      <ActivityButton
        mode="text"
        onPress={onPress}
        isLoading={isLoading}
        title={error}
        containerStyle={containerStyle}
        buttonStyle={[{ height: 100 }, buttonStyle]}
        textStyle={[{ fontSize: 10 }, textStyle]}
        indicatorSize={indicatorSize}
        indicatorColor={indicatorColor}
        icon={renderIcon()}
        activityIndicatorStyle={activityIndicatorStyle}
      />
    </View>
  )
}

export default LoaderBox
