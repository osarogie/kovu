import PropTypes from 'prop-types'
import React, { Component, useCallback } from 'react'

import { Share } from 'react-native'

import { Button } from '@shoutem/ui/components/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BLACK } from '../ui'
import { useTheme } from 'react-native-paper'

const { string } = PropTypes

/**
 * The ShareButton is a virtual component that wraps a button with a share icon.
 * It puts the sharing logic in one place. It's used in the navigation bar in the toolkit,
 * but it can be reused anywhere.
 *
 * It should have the style of its underlying button. That's why it's not connected to style
 * or animation.
 */
export default function ShareButton({ title, message, url, color, style }) {
  const { colors } = useTheme()
  const onShare = useCallback(() => {
    Share.share({
      title,
      // URL property isn't supported on Android, so we are
      // including it as the message for now
      message,
      url,
    })
  }, [title, message, url])

  return (
    <Button styleName="clear tight" onPress={onShare} style={style}>
      <Icon size={20} name="share" color={colors.text} />
    </Button>
  )
}
