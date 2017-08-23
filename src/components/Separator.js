import React from 'react'
import { View, ViewPropTypes } from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

@connect(mapStateToProps)
export default class Separator extends React.PureComponent {
  render() {
    const { night_mode } = this.props
    return (
      <View
        style={[
          styles.separator,
          { backgroundColor: night_mode ? '#444' : '#ddd' },
          this.props.styles
        ]}
      />
    )
  }
}

Separator.defaultProps = {
  styles: {}
}

Separator.propTypes = {
  ...ViewPropTypes,
  styles: React.PropTypes.object
}
