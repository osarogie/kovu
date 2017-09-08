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

export default class ActivityButton extends React.Component {
  renderLoading() {
    const { icon } = this.props
    // console.log(this.props)
    if (this.props.isLoading === false && icon) {
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
        onPress={this.props.onPress}
        disabled={this.props.isLoading === true}
        accessibilityTraits="button"
        style={[styles.wrapper, this.props.buttonStyle, extraStyles]}
      >
        {this.renderLoading()}
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 15
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -18
    })
  }
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
  activityIndicatorStyle: {}
}

ActivityButton.propTypes = {
  ...ViewPropTypes,
  onPress: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  title: React.PropTypes.string,
  indicatorColor: React.PropTypes.string,
  indicatorSize: React.PropTypes.string,
  containerStyle: View.propTypes.style,
  buttonStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activityIndicatorStyle: View.propTypes.style
}
