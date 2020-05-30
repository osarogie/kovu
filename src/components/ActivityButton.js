import React from 'react'
import {
  // ViewPropTypes,
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'

export default function ActivityButton({
  icon,
  title,
  isLoading,
  buttonStyle,
  loadingBackground,
  onPress,
  textStyle,
  indicatorColor,
  indicatorSize,
  activityIndicatorStyle,
}) {
  const { colors } = useTheme()
  const renderLoading = () => {
    if (isLoading === false && icon) {
      return icon
    } else if (isLoading === false) {
      return <Text style={[styles.text, textStyle]}>{title}</Text>
    }
    return (
      <View>
        <Text style={[styles.text, textStyle, { opacity: 0 }]}>{title}</Text>
        <ActivityIndicator
          color={indicatorColor || colors.text}
          size={indicatorSize}
          style={[styles.activityIndicator, activityIndicatorStyle]}
        />
      </View>
    )
  }
  const extraStyles =
    isLoading && loadingBackground
      ? {
          backgroundColor: loadingBackground,
        }
      : {}

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading === true}
      accessibilityTraits="button"
      style={[
        styles.wrapper,
        buttonStyle,
        extraStyles,
        { backgroundColor: colors.background },
      ]}>
      {renderLoading()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: Platform.select({ android: 30, default: 40 }),
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -18,
      web: -18,
    }),
  },
})

ActivityButton.defaultProps = {
  onPress: () => {},
  isLoading: false,
  title: 'Button',
  indicatorColor: 'white',
  indicatorSize: 'small',
  containerStyle: {},
  buttonStyle: {},
  textStyle: {},
  activityIndicatorStyle: {},
}

ActivityButton.propTypes = {
  // ...ViewPropTypes,
  // onPress: PropTypes.func,
  // isLoading: PropTypes.bool,
  // title: PropTypes.string,
  // indicatorColor: PropTypes.string,
  // indicatorSize: PropTypes.string,
  // containerStyle: PropTypes.style,
  // buttonStyle: PropTypes.style,
  // textStyle: PropTypes.style,
  // activityIndicatorStyle: PropTypes.style
}
