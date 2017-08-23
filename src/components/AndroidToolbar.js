import React from 'react'
import { connect } from 'react-redux'
import colors from '../colors'
import styles from '../styles'
import Icon, { ToolbarAndroid } from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

export default (AndroidToolbar = withNavigation(
  connect(mapStateToProps)(props =>
    <ToolbarAndroid
      titleColor={colors.get('toolbarTitleColor', props.night_mode)}
      style={[
        styles.toolbar,
        {
          backgroundColor: colors.get('toolbar', props.night_mode),
          elevation: 2
        }
      ]}
      onIconClicked={() => {
        props.navigation.goBack()
      }}
      iconColor={colors.get('toolbarTitleColor', props.night_mode)}
      {...props}
    />
  )
))
