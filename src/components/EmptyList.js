import React from 'react'
import { ViewPropTypes, Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import colors from '../colors'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

class EmptyList extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            height: 100,
            justifyContent: 'center'
          }
        ]}
      >
        <Text>
          {this.props.message}
        </Text>
      </View>
    )
  }
}

EmptyList.defaultProps = {
  message: 'Empty'
}

EmptyList.propTypes = {
  ...ViewPropTypes,
  message: React.PropTypes.string
}
export default connect(mapStateToProps)(EmptyList)
// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   alignItems: 'center',
//   //   justifyContent: 'center'
//   // }
// })
