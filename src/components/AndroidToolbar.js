import React from 'react'
import { connect } from 'react-redux'
import colors from '../colors'
import styles from '../styles'
import Icon, { ToolbarAndroid } from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
// import { ViewPropTypes } from 'react-native'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

class AndroidToolbar extends React.Component {
  render() {
    const { dark } = this.props
    return (
      <ToolbarAndroid
        titleColor={
          dark ? '#fff' : colors.get('toolbarTitleColor', this.props.night_mode)
        }
        onIconClicked={this.props.navigation.goBack}
        iconColor={
          dark ? '#fff' : colors.get('toolbarTitleColor', this.props.night_mode)
        }
        {...this.props}
        style={[
          styles.toolbar,
          {
            backgroundColor: dark
              ? '#000'
              : colors.get('toolbar', this.props.night_mode),
            elevation: 2
          },
          this.props.style
        ]}
      />
    )
  }
}

AndroidToolbar.defaultProps = {
  style: {}
}

AndroidToolbar.propTypes = {
  // ...ViewPropTypes,
  // style: React.PropTypes.any
}

export default withNavigation(connect(mapStateToProps)(AndroidToolbar))
