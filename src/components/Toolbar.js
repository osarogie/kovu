import React from 'react'
import { useAppNavigation } from '../navigation/navigationHelper'
import { Appbar } from 'react-native-paper'

export default function Toolbar({ title, showNavIcon = true, onBackPress }) {
  const { goBack } = useAppNavigation()

  function handleBackPress() {
    if (onBackPress) {
      onBackPress()
    } else {
      goBack()
    }
  }

  return (
    <Appbar.Header>
      {showNavIcon && (
        <Appbar.BackAction key="nav-icon" onPress={handleBackPress} />
      )}
      <Appbar.Content key="content" title={title} />
    </Appbar.Header>
  )
}
