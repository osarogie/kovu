import React from 'react'
import {
  ViewPropTypes,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
var keyOf = require('fbjs/lib/keyOf')

export default class TouchableLoader extends React.Component {
  renderLoading() {
    const { icon } = this.props
    // console.log(this.props)
    if (icon) {
      return icon
    } else if (this.props.isLoading === false) {
      return (
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.title}
        </Text>
      )
    }
    return (
      <View>
        <Text style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
          {this.props.title}
        </Text>
        <ActivityIndicator
          color={this.props.indicatorColor}
          size={this.props.indicatorSize}
          style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
        />
      </View>
    )
  }
  render() {
    const extraStyles =
      this.props.isLoading && this.props.loadingBackground
        ? {
            backgroundColor: this.props.loadingBackground
          }
        : {}

    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.onLoadInit) {
            this.props.onLoadInit()
          }
        }}
        disabled={this.props.isLoading === true}
        accessibilityTraits="button"
      >
        <View style={[styles.wrapper, this.props.wrapperStyle, extraStyles]}>
          {this.renderLoading()}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16
    })
  }
})

TouchableLoader.defaultProps = {
  onLoadInit: () => {},
  isLoading: false,
  title: 'Button',
  indicatorColor: 'white',
  indicatorSize: 'small',
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  activityIndicatorStyle: {}
}

TouchableLoader.propTypes = {
  ...ViewPropTypes,
  onLoadInit: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  title: React.PropTypes.string,
  indicatorColor: React.PropTypes.string,
  indicatorSize: React.PropTypes.string,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activityIndicatorStyle: View.propTypes.style
}
