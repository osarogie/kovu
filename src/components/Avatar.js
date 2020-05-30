import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  Text as NativeText,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  PixelRatio,
} from 'react-native'
// import ViewPropTypes from "../config/ViewPropTypes"

import Icon from './Icon'
import Text from './Text'

import { imageUrl } from '../utils'
import { PURPLE } from '../ui'
import { useAppNavigation } from '../navigation/navigationHelper'

const DEFAULT_COLORS = ['#000', '#333', '#555', '#888', '#05f', '#ddd']

function Avatar(props) {
  const {
    component,
    onLongPress,
    containerStyle,
    icon,
    iconStyle,
    source,
    small,
    medium,
    large,
    radius,
    xlarge,
    avatarStyle,
    rounded,
    title,
    titleStyle,
    overlayContainerStyle,
    activeOpacity,
    showEditButton,
    editButton,
    onEditPress,
    ...attributes
  } = props

  const { openProfile } = useAppNavigation()

  function defaultOnPress() {
    if (source?._id) {
      openProfile(source._id, source)
    }
  }

  const { onPress = defaultOnPress } = props

  let { width, height } = props

  if (small) {
    width = 34
    height = 34
  } else if (medium) {
    width = 50
    height = 50
  } else if (large) {
    width = 75
    height = 75
  } else if (xlarge) {
    width = 150
    height = 150
  } else if (!width && !height) {
    width = 34
    height = 34
  } else if (!width) {
    width = height
  } else if (!height) {
    height = width
  }

  let titleSize = width / 2
  let iconSize = width / 2

  let Component = onPress || onLongPress ? TouchableOpacity : View
  if (component) {
    Component = component
  }

  const renderUtils = () => {
    if (showEditButton) {
      const editButtonProps = { ...editButton }

      const defaultEditButtonSize = (width + height) / 2 / 3
      const editButtonSize = editButton.size || defaultEditButtonSize
      const editButtonSizeStyle = {
        width: editButtonSize,
        height: editButtonSize,
        borderRadius: editButtonSize / 2,
      }
      const editButtonIconSize = editButtonSize * 0.6

      return (
        <TouchableHighlight
          style={[
            styles.editButton,
            editButtonSizeStyle,
            editButtonProps.style,
          ]}
          underlayColor={editButtonProps.underlayColor}
          onPress={onEditPress}>
          <View>
            <Icon
              size={editButtonIconSize}
              name={editButtonProps.iconName}
              type={editButtonProps.iconType}
              color={editButtonProps.iconColor}
            />
          </View>
        </TouchableHighlight>
      )
    }
  }

  const getPicture = () => {
    if (typeof source?.profile_picture_name === 'string') {
      return source.profile_picture_name
    }

    if (typeof source?.profile_pic === 'string') {
      return source.profile_pic.split('/').pop()
    }

    return null
  }

  const renderContent = () => {
    if (source?.profile_picture_name || source?.profile_pic) {
      const size = PixelRatio.getPixelSizeForLayoutSize(width)

      const uri = imageUrl(getPicture(), `${size}x${size}`)

      return (
        <Image
          style={[
            styles.avatar,
            rounded && { borderRadius: width / 2 },
            radius && { borderRadius: radius },
            avatarStyle && avatarStyle,
          ]}
          source={{ uri }}
        />
      )
    } else if (title) {
      return (
        <Text style={[styles.title, titleStyle && titleStyle]}>{title}</Text>
      )
    } else if (icon) {
      return (
        <Icon
          style={iconStyle && iconStyle}
          color={icon.color || 'white'}
          name={icon.name || 'user'}
          size={icon.size || iconSize}
          type={icon.type && icon.type}
        />
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: 'transparent',
      width,
      height,
      overflow: 'hidden',
    },
    avatar: {
      width: width,
      height: height,
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: PURPLE || 'rgba(0,0,0,0.1)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    title: {
      color: '#ffffff',
      fontSize: titleSize,
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DEFAULT_COLORS[4],
      ...Platform.select({
        ios: {
          shadowColor: DEFAULT_COLORS[0],
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 2,
          shadowOpacity: 0.5,
        },
        android: {
          elevation: 1,
        },
      }),
    },
  })

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        rounded && { borderRadius: width / 2 },
        containerStyle && containerStyle,
      ]}
      {...attributes}>
      <View
        style={[
          styles.overlayContainer,
          rounded && { borderRadius: width / 2 },
          radius && { borderRadius: radius },
          overlayContainerStyle && overlayContainerStyle,
        ]}>
        {renderContent()}
      </View>
      {renderUtils()}
    </Component>
  )
}

Avatar.defaultProps = {
  showEditButton: false,
  onEditPress: null,
  editButton: {
    size: null,
    iconName: 'camera',
    iconType: 'feather',
    iconColor: '#fff',
    underlayColor: DEFAULT_COLORS[0],
    style: null,
  },
}

Avatar.propTypes = {
  component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.any,
  source: PropTypes.any,
  avatarStyle: PropTypes.any,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: NativeText.propTypes.style,
  overlayContainerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  icon: PropTypes.object,
  iconStyle: NativeText.propTypes.style,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onEditPress: PropTypes.func,
  editButton: PropTypes.shape({
    size: PropTypes.number,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    underlayColor: PropTypes.string,
    // style: ViewPropTypes.style
  }),
}

export default Avatar
